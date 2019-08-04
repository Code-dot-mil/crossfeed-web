var models = require("../models");
var request = require("request");
var CronJob = require("cron").CronJob;
var Sequelize = require("sequelize");

var bd_api = require("./bd_api.js");
var h1_api = require("./h1_api.js");

var scans = require("./scans.js");

var utils = require("./utils.js");

// Helper function to format query parameters, i.e. limit, page, order
function formatQueryParams(body) {
	var limit = body.count || 25;
	var page = body.page || 1;
	var order = [];

	var sortingKeys = Object.keys(body.sorting);
	if (sortingKeys.length > 0) {
		order.push([sortingKeys[0], body.sorting[sortingKeys[0]]]);
	} else {
		order.push(["id", "ASC"]);
	}

	var where = {};
	for (filter in body.filter) {
		if (filter == "ports" && body.filter[filter] == "80,443") {
			where["$or"] = [
				{
					ports: { $like: "%80%" }
				},
				{
					ports: { $like: "%443%" }
				}
			];
			continue;
		}
		if (filter == "ports" && body.filter[filter] == "not_null") {
			where["$and"] = [
				{
					ports: { [Sequelize.Op.ne]: null }
				},
				{
					ports: { [Sequelize.Op.ne]: "" }
				}
			];
			continue;
		}
		where[filter] = { $like: "%" + body.filter[filter] + "%" };
	}

	return {
		limit: limit,
		page: page,
		offset: limit * (page - 1),
		order: order,
		where: where
	};
}

module.exports = function(app) {
	app.use("/api/bd", bd_api);
	app.use("/api/h1", h1_api);

	app.use("/api/scans", scans);

	app.get("/api/vulns/categorize", function(req, res) {
		models.Vulnerability.findAll().then(function(vulns) {
			for (vuln of vulns) {
				var domains = utils.findDomains(vuln.contents);
				vuln.updateAttributes({ domains: domains.join(",") });
			}
			res.status(200).json({});
		});
	});

	app.get("/api/vulns/associate", function(req, res) {
		models.Vulnerability.findAll().then(function(vulns) {
			/*for (vuln of vulns) {
				console.log(vuln.domains)
				var domainsArr = vuln.domains.split(',')
				for (domain of domainsArr) {
					console.log(domain)
					models.Domain.findOne({ where: { name: domain } }).then((result) => {
						if (result) {
							console.log(result.id)

						}
					})
				}
			}
			res.status(200).json({});*/
		});
	});

	// Search domains
	app.post("/api/domains/search", function(req, res) {
		var params = formatQueryParams(req.body);

		models.Domain.findAndCountAll({
			order: params.order,
			limit: params.limit,
			offset: params.offset,
			where: params.where,
			attributes: ["name", "ip", "ports", "id", "services"]
		}).then(function(domains) {
			res.status(200).json(domains);
		});
	});

	// Search vulnerabilities
	app.post("/api/vulns/search", function(req, res) {
		if (Object.entries(req.body).length === 0) {
			return models.Vulnerability.findAll({
				attributes: { exclude: ["contents"] }
			}).then(function(vulns) {
				res.status(200).json(vulns);
			});
		}
		var params = formatQueryParams(req.body);

		models.Vulnerability.findAndCountAll({
			order: params.order,
			limit: params.limit,
			offset: params.offset,
			where: params.where,
			attributes: { exclude: ["contents"] }
		}).then(function(vulns) {
			res.status(200).json(vulns);
		});
	});

	// Fetch a single domain
	app.get("/api/domains/:id", function(req, res) {
		models.Domain.findOne({
			where: { id: req.params.id }
		}).then(function(domain) {
			res.status(200).json(domain);
		});
	});

	// Fetch a single vuln
	app.get("/api/vulns/:id", function(req, res) {
		models.Vulnerability.findOne({
			where: { id: req.params.id }
		}).then(function(vuln) {
			res.status(200).json(vuln);
		});
	});

	// Get the status of all tasks
	app.get("/api/tasks/:type", function(req, res) {
		let filter = {};
		let order = [["id", "desc"]];
		if (req.params.type === "running") {
			filter.status = "running";
		}
		models.TaskStatus.findAll({
			where: filter,
			order: order
		}).then(function(tasks) {
			res.status(200).json(tasks);
		});
	});

	// Get all alerts
	app.get("/api/alerts", function(req, res) {
		let filter = {};
		let order = [["id", "desc"]];
		models.Alert.findAll({
			where: filter,
			order: order
		}).then(function(alerts) {
			res.status(200).json(alerts);
		});
	});

	// [deprecated] Add a single domain
	app.post("/api/domains", function(req, res) {
		var domain = req.body.domain;
		console.log(domain);
		models.Domain.create({
			name: domain
		}).then(domain => {
			res.status(200).json();
		});
	});

	// TODO: search full text of all HTTP responses
	app.get("/api/domains/search", function(req, res) {
		// Utilize Postgres full-text query
		models.sequelize
			.query(
				`
			SELECT domain, title, ts_headline(contents, :query) as contents
			FROM ${models.Domain.tableName}
			WHERE _search @@ plainto_tsquery('english', :query);
		`,
				{
					model: models.Domain,
					replacements: { query: req.query.q }
				}
			)
			.then(searchResults => {
				console.log(searchResults);
				res.status(200).json(searchResults);
			});
	});

	app.delete("/api/domains/:id", function(req, res) {
		models.Domain.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.status(200).json({});
		});
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get("*", function(req, res) {
		res.sendfile("./public/index.html");
	});
};
