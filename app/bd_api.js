var models  = require('../models');
var Sequelize = require("sequelize");
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/sources', function(req, res) {
	request({
		url: 'https://bitdiscovery.com/api/1.0/sources?offset=0&limit=1000',
    	json:true,
		headers: {
			'Authorization': process.env.BD_API_KEY
		}
	}, (err, res2, body) => {
		if (err) {
			return res.status(500);
		}
		res.status(200).json(body);
	})
});

router.post('/sources/import', function(req, res) {
	request({
		url: 'https://bitdiscovery.com/api/1.0/source/' + req.body.id + '?offset=0&limit=10000&sortorder=true',
		method: 'POST',
    	json: [],
		headers: {
			'Authorization': process.env.BD_API_KEY
		}
	}, async (err, res2, body) => {
		if (err) {
			return res.status(500);
		}
		console.log(body)
		var numCreated = 0;
		var numUpdated = 0;
		for (asset of body.assets) {
			var domain = {
				name: asset['bd.original_hostname'] || asset['bd.hostname'],
				ip: asset['bd.ip_address'],
				screenshot: asset['screenshot.screenshot'] == 'no' ? null : asset['screenshot.screenshot'],
				ports: asset['ports.ports'] ? asset['ports.ports'].join(',') : null,
				services: asset['ports.services'] ?  asset['ports.services'].join(',') : null,
				response_data: asset['ports.banners'] ? asset['ports.banners'].join(',') : null
			}
	        await models.Domain.findOne({ where: {name: domain.name} })
	        .then(function(obj) {
	            if(obj) {
	            	numUpdated++;
	                return obj.update(domain);
	            }
	            else { // insert
	            	numCreated++;
	                return models.Domain.create(domain);
	            }
	        })
		}
		console.log(`BD import success. ${numCreated} created and ${numUpdated} updated.`)
		res.status(200).json({'status': `Success. ${numCreated} created and ${numUpdated} updated.`});
	})
});

module.exports = router;