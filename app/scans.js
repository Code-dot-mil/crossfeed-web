var models  = require('../models');
var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var readLastLines = require('read-last-lines');
var moment = require('moment');

router.get('/logs', function(req, res) {
	path = process.env.LOG_FILE + moment(new Date()).format('YYYY-MM') + '.txt';
	readLastLines.read(path, 1000)
	.catch(function(error) {
  		res.status(200).json({logs: "Could not find log file."});
	})
    .then((lines) => {
    	res.status(200).json({logs: lines});
    });
});

module.exports = router;
