// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var basicAuth = require('express-basic-auth')
require('dotenv').config();

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(basicAuth({
    users: { 'admin': process.env.APP_PASSWORD },
    challenge: true
}));

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.all("*", (req, res, next) => {
	console.log(req.method + ' ' + req.originalUrl);
	next();
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(3000, () => {
  console.log('Express server listening on port %d.', 3000);
});
exports = module.exports = app; 						// expose app