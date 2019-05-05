var models  = require('../models');
var Sequelize = require("sequelize");
var express = require('express');
var request = require('request');
var router = express.Router();
var multer = require('multer');
var csv = require('fast-csv');
var fs = require('fs');
var async = require('async');

var upload = multer({dest: 'tmp/csv/'});

// Import vulnerability CSV
router.post('/importCsv', upload.single('csv'), function(req, res) {
	var fileRows = [], fileHeader;

	// open uploaded file
	csv.fromPath(req.file.path)
	.on("data", function (data) {
	  fileRows.push(data); // push each row
	})
	.on("end", async () => {
	  fs.unlinkSync(req.file.path);   // remove temp file

	  fileRows.shift(); //skip header row
	  var items = fileRows.map((row) => {
	  	return {
			hackerone_id: row[1],
			title: row[2],
			severity: row[3],
			state: row[5],
			substate: row[6],
			weakness: row[7],
			reported_at: row[8],
			closed_at: row[11]
		}
	  })

	  console.log(items)

	  var blacklistedSubstates = ['informative', 'duplicate', 'not-applicable', 'spam']
	  items = items.filter(item => !blacklistedSubstates.includes(item.substate))


	  var numCreated = 0;
	  var numUpdated = 0;
	  for (item of items) {
        await models.Vulnerability.findOne({ where: {hackerone_id: item.hackerone_id} })
        .then(function(obj) {
            if(obj) {
            	numUpdated++;
                return obj.update(item);
            }
            else { // insert
            	numCreated++;
                return models.Vulnerability.create(item);
            }
        })
	  }

	  console.log(`H1 import success. ${numCreated} created and ${numUpdated} updated.`)
	  res.redirect('/vulns');
	});
});

router.post('/importContents', function(req, res) {
	models.Vulnerability.findAll({ where: { contents: null}})
	.then(function(vulns) {
		var q = async.queue(function (vuln, callback) {
		    console.log('Starting report ' + vuln.hackerone_id);
			request({
				url: 'https://hackerone.com/reports/' + vuln.hackerone_id + '.json',
		    	json: true,
				headers: {
					'Cookie': '__Host-session=' + req.body.cookie
				}
			}, (err, res2, body) => {
				if (err || !body || !body.vulnerability_information) {
					console.log('Could not retrieve report ' + vuln.hackerone_id);
					callback();
					return;
				}
				console.log(body)
				vuln.update({
					contents: body.vulnerability_information
				}).then(() => {
					console.log('updated')
					callback();
				})
			})
		}, 1);

		q.drain = function() {
			res.status(200).json('success.');
		}

		q.push(vulns);
	})
});

module.exports = router;