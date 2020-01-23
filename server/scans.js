var models = require("../models");
var Sequelize = require("sequelize");
var express = require("express");
var router = express.Router();
var fs = require("fs");
var readLastLines = require("read-last-lines");
var moment = require("moment");
var AWS = require("aws-sdk");
var crontab = require("crontab");
var shellescape = require("shell-escape");
var parser = require("http-string-parser");

AWS.config.update({ region: process.env.AWS_REGION });
var sqs = new AWS.SQS();

const validCommands = ["scan-ports", "scan-hosts", "subjack"];

function renderJobs(jobs) {
	var arr = [];
	for (i in jobs) {
		arr.push(renderJob(jobs[i]));
	}
	return arr;
}

function renderJob(job) {
	var str = job.render();
	var json = {
		freq: str.split(" cd")[0],
		command: str.split("./crossfeed-agent enqueue ")[1],
		index: i
	};
	return json;
}

function loadCrontab(callback) {
	if (process.env.CRONTAB_USER) {
		crontab.load(process.env.CRONTAB_USER, callback);
	} else {
		crontab.load(callback);
	}
}

function formatDomainQuery(body) {
	var andConditions = [];
	for (var filter in body.filters) {
		if (body.filters[filter].length == 0) continue;
		andConditions.push({
			$or: body.filters[filter].map(val => {
				var condition = {};
				condition[filter] = {
					$like: `%${val}%`
				};
				return condition;
			})
		});
	}
	return {
		where: Sequelize.and(andConditions)
	};
}

router.get("/logs", function(req, res) {
	path = process.env.LOG_FILE + moment(new Date()).format("YYYY-MM") + ".txt";
	readLastLines
		.read(path, 100)
		.catch(function(error) {
			res.status(500).json({ logs: "Could not find log file." });
		})
		.then(lines => {
			res.status(200).json({ logs: lines });
		});
});

router.post("/launch/preview", function(req, res) {
	var params = formatDomainQuery(req.body);

	models.Domain.count({
		where: params.where
	}).then(function(count) {
		res.status(200).json({ count: count });
	});
});

router.post("/launch", function(req, res) {
	var scan = {
		filters: req.body.filters,
		greps: req.body.greps,
		request: parser.parseRequest(req.body.request)
	};

	sqs.sendMessage({
		QueueUrl: process.env.SQS_URL,
		MessageBody: JSON.stringify({ command: "scan-hosts jsonInput", payload: JSON.stringify(scan) })
	})
		.promise()
		.catch(function(error) {
			res.status(500).json({ error: "Could not create job." });
		})
		.then(function(job) {
			return res.status(200).json({ status: "Successfully created job with id " + job.MessageId });
		});
});

router.post("/enqueue", function(req, res) {
	var command = req.body.command;
	if (!validCommands.includes(command)) {
		return res.status(422).json({ error: "Invalid command" });
	}
	if (req.body.args && req.body.args.length > 0) {
		command += " " + req.body.args.join(" ");
	}

	sqs.sendMessage({
		QueueUrl: process.env.SQS_URL,
		MessageBody: JSON.stringify({ command: command })
	})
		.promise()
		.catch(function(error) {
			res.status(500).json({ error: "Could not create job." });
		})
		.then(function(job) {
			return res.status(200).json({ status: "Successfully created job with id " + job.MessageId });
		});
});

router.get("/configure", function(req, res) {
	loadCrontab(function(err, crontab) {
		var jobs = crontab.jobs();
		res.status(200).json({ jobs: renderJobs(jobs) });
	});
});

router.post("/configure", function(req, res) {
	loadCrontab(function(err, crontab) {
		if (
			!req.body.commandType ||
			!validCommands.includes(req.body.commandType) ||
			!req.body.commandArgs == null ||
			!req.body.freq ||
			!req.body.frequnit
		) {
			console.log(req.body);
			return res.status(422).json({ error: "Invalid command" });
		}

		var commandStr = req.body.commandType;
		if (req.body.commandArgs !== "") commandStr += " " + req.body.commandArgs;

		var body = { command: commandStr };
		var command = `aws sqs send-message --queue-url ${process.env.SQS_URL} --message-body '${JSON.stringify(
			body
		)}'`;
		var job = crontab.create(command);
		switch (req.body.frequnit) {
			case "minutes":
				if (req.body.freq < 1 || req.body.freq >= 60)
					return res.status(422).json({ error: "Minutes must be between 1 and 59" });
				job.minute().every(req.body.freq);
				break;
			case "hours":
				job.minute().at(0);
				if (req.body.freq < 1 || req.body.freq >= 24)
					return res.status(422).json({ error: "Hours must be between 1 and 24" });
				if (req.body.freq > 1) job.hour().every(req.body.freq);
				break;
			case "days":
				job.minute().at(0);
				job.hour().at(0);
				if (req.body.freq < 1 || req.body.freq >= 30)
					return res.status(422).json({ error: "Days must be between 1 and 29" });
				if (req.body.freq > 1) job.dom().every(req.body.freq);
				break;
			case "months":
				job.minute().at(0);
				job.hour().at(0);
				job.dom().at(1);
				if (req.body.freq < 1 || req.body.freq >= 12)
					return res.status(422).json({ error: "Months must be between 1 and 11" });
				if (req.body.freq > 1) job.month().every(req.body.freq);
				break;
			case "default":
				return res.status(422).json({ error: "Invalid frequency unit" });
		}
		crontab.save(function(err, crontab) {
			if (err) return res.status(500).json({ error: "Error creating cron job" });
			var jobs = crontab.jobs();
			res.status(200).json({ jobs: renderJobs(jobs) });
		});
	});
});

router.post("/remove", function(req, res) {
	loadCrontab(function(err, crontab) {
		var jobs = crontab.jobs();
		if (req.body.index < 0 || req.body.index > jobs.length) {
			return res.status(422).json({ error: "Invalid index." });
		}
		crontab.remove(jobs[req.body.index]);
		crontab.save(function(err, crontab) {
			var jobs = crontab.jobs();
			res.status(200).json({ jobs: renderJobs(jobs) });
		});
	});
});

module.exports = router;
