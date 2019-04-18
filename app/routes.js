var models  = require('../models');
var request = require("request");
var CronJob = require('cron').CronJob;
var Sequelize = require("sequelize");
const op = Sequelize.Op;

// new CronJob('0 * * * *', function() {
// }, null, true, 'America/Chicago');

// Helper method to fetch a list of urls, calls callback as each response is returned
function fetchUrls(urls, callback) {
	for (url of urls) {
		request.get(url, (err, res1, body) => {
			if (!res1 || err) {
				return;
			}
			var url = res1.request.uri.href;
		    var titleArr = body.match("<title>(.*?)</title>");
		    var title = titleArr && titleArr.length > 1 ? titleArr[1] : url;
		    callback({ title: title, url: url, contents: body })
		});
	}
}

module.exports = function(app) {

	app.get('/api/domains', function(req, res) {
		var limit = req.query.count || 50;
		var page = req.query.page || 1;
		var order = [];

		if (req.query.orderBy && req.query.sort) {
			order.push([req.query.orderBy, 'asc']);
		}
		else {
			order.push(['id', 'ASC']);
		}

		var where = {};
		if (req.query.filterBy && req.query.filter) {
			where[req.query.filterBy] = {$like: '%' + req.query.filter + '%'};
			console.log(where)
		}

		models.Domain.findAndCountAll({
			order: order,
	        limit: limit,
	        offset: limit * (page - 1),
	        where: where
		}).then(function(domains) {
			res.status(200).json(domains);
		});
	});

	app.post('/api/domains', function(req, res) {
		var domain = req.body.domain;
		console.log(domain)
		models.Domain.create({
			'name': domain
		}).then(domain => {
			res.status(200).json();
		});
	});

	app.get('/api/domains/search', function(req, res) {
		// Utilize Postgres full-text query
		models.sequelize.query(`
			SELECT domain, title, ts_headline(contents, :query) as contents
			FROM ${models.Domain.tableName}
			WHERE _search @@ plainto_tsquery('english', :query);
		`, {
			model: models.Domain,
			replacements: { query: req.query.q },
		}).then(searchResults => {
			console.log(searchResults)
			res.status(200).json(searchResults);
		});
	});

	app.delete('/api/domains/:id', function(req, res) {
		models.Domain.destroy({
		    where: {
		        'id': req.params.id
		    }
		}).then(() => {
			res.status(200).json({});
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};