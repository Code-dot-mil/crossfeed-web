var models  = require('../models');
var Sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var readLastLines = require('read-last-lines');
var moment = require('moment');
var BeanstalkdWorker = require('beanstalkd-worker');
var crontab = require('crontab');
var shellescape = require('shell-escape');

const worker = new BeanstalkdWorker(
  process.env.BEANSTALK_HOST,
  process.env.BEANSTALK_PORT,
);

const validCommands = ['scanPorts', 'fetchHosts', 'subjack']

function renderJobs(jobs) {
	var arr = []
	for (i in jobs) {
		arr.push(renderJob(jobs[i]))
	}
	return arr
}

function renderJob(job) {
	var str = job.render()
	var json = {
		freq: str.split(' cd')[0],
  		command: str.split('./crossfeed-agent enqueue ')[1],
		index: i
	}
	return json
}

function loadCrontab(callback) {
	if (process.env.CRONTAB_USER) {
		crontab.load(process.env.CRONTAB_USER, callback)
	} else {
		crontab.load(callback)
	}
}

router.get('/logs', function(req, res) {
	path = process.env.LOG_FILE + moment(new Date()).format('YYYY-MM') + '.txt';
	readLastLines.read(path, 1000)
	.catch(function(error) {
  		res.status(500).json({logs: 'Could not find log file.'});
	})
    .then((lines) => {
    	res.status(200).json({logs: lines});
    });
});

router.post('/enqueue', function(req, res) {
	var command = req.body.command
	if (!validCommands.includes(command)) {
		return res.status(422).json({error: 'Invalid command'});
	}
	worker.spawn('default', command, {
	  delay: 0,
	  priority: 1,
	  timeout: 60 * 60 * 1000 // ms
	})
	.catch(function(error) {
  		res.status(500).json({error: 'Could not create job.'});
	})
	.then(function (job) {
		return res.status(200).json({status: 'Successfully created job with id ' + job.id});
	});

})

router.get('/configure', function(req, res) {
	loadCrontab(function(err, crontab) {
		var jobs = crontab.jobs();
		res.status(200).json({jobs: renderJobs(jobs)})
	})
})

router.post('/configure', function(req, res) {
	loadCrontab(function(err, crontab) {
		if (!req.body.commandType || !validCommands.includes(req.body.commandType) || !req.body.commandArgs == null || !req.body.freq || !req.body.frequnit) {
			console.log(req.body)
			return res.status(422).json({error: 'Invalid command'})
		}
		var command = `cd ${process.env.AGENT_DIR}; ./crossfeed-agent enqueue `
		var args = [req.body.commandType].concat(req.body.commandArgs.split(' '))
		var escaped = shellescape(args)
		var job = crontab.create(command + escaped)
		switch (req.body.frequnit) {
			case 'minutes':
				if (req.body.freq < 1 || req.body.freq >= 60)
					return res.status(422).json({error: 'Minutes must be between 1 and 59'})
				job.minute().every(req.body.freq);
				break;
			case 'hours':
				job.minute().at(0)
				if (req.body.freq < 1 || req.body.freq >= 24)
					return res.status(422).json({error: 'Hours must be between 1 and 24'})
				if (req.body.freq > 1)
					job.hour().every(req.body.freq);
				break;
			case 'days':
				job.minute().at(0)
				job.hour().at(0)
				if (req.body.freq < 1 || req.body.freq >= 30)
					return res.status(422).json({error: 'Days must be between 1 and 29'})
				if (req.body.freq > 1)
					job.dom().every(req.body.freq);
				break;
			case 'months':
				job.minute().at(0)
				job.hour().at(0)
				job.dom().at(1)
				if (req.body.freq < 1 || req.body.freq >= 12)
					return res.status(422).json({error: 'Months must be between 1 and 11'})
				if (req.body.freq > 1)
					job.month().every(req.body.freq);
				break;
			case 'default':
				return res.status(422).json({error: 'Invalid frequency unit'})
		}
		crontab.save(function(err, crontab) {
  			if (err)
  				return res.status(500).json({error: 'Error creating cron job'})
  			var jobs = crontab.jobs();
			res.status(200).json({jobs: renderJobs(jobs)})
  		});
	})
})

router.post('/remove', function(req, res) {
	loadCrontab(function(err, crontab) {
		var jobs = crontab.jobs();
		if (req.body.index < 0 || req.body.index > jobs.length) {
			return res.status(422).json({error: 'Invalid index.'})
		}
		crontab.remove(jobs[req.body.index])
		crontab.save(function(err, crontab) {
			var jobs = crontab.jobs();
			res.status(200).json({jobs: renderJobs(jobs)})
  		});
	})
})

module.exports = router;
