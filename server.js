// modules =================================================
var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var basicAuth = require("express-basic-auth");
require("dotenv").config();

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(
	basicAuth({
		users: { admin: process.env.APP_PASSWORD },
		challenge: true
	})
);

app.use(express.static(__dirname + "/client"));
app.all("*", (req, res, next) => {
	console.log(req.method + " " + req.originalUrl);
	next();
});

require("./server/routes")(app); // pass application into routes

if (process.env.ENVIRONMENT == "production") {
	https
		.createServer(
			{
				key: fs.readFileSync("/etc/ssl/private/server.key"),
				cert: fs.readFileSync("/etc/ssl/certs/server.crt")
			},
			app
		)
		.listen(443, () => {
			console.log("Express server listening on port %d.", 443);
		});
} else {
	app.listen(3000, () => {
		console.log("Express server listening on port %d.", 3000);
	});
}

module.exports = app;
