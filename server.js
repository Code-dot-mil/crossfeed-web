var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var basicAuth = require("express-basic-auth");
const session = require("express-session");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var morgan = require("morgan");

require("dotenv").config();

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

if (process.env.ENVIRONMENT == "production") {
	app.use(morgan("combined"));
} else {
	app.use(morgan("tiny"));
}

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { secure: process.env.ENVIRONMENT == "production" }
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null, user.profile.id);
});

passport.deserializeUser(function(id, done) {
	done(null, { profile: { id: id } });
});
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_REDIRECT_URL
		},
		function(token, refreshToken, profile, done) {
			return done(null, {
				profile: profile,
				token: token
			});
		}
	)
);

app.get("/auth/google", passport.authenticate("google", { scope: ["https://www.googleapis.com/auth/plus.login"] }));

// Support Google OAuth logon
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), function(req, res) {
	console.log("New login: " + req.user.profile.displayName + " " + req.user.profile.id);

	req.session.authorized = true;
	res.redirect("/");
});

// Support password-based logon if APP_PASSWORD is set
app.get("/login", (req, res, next) => {
	const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
	const [login, password] = new Buffer(b64auth, "base64").toString().split(":");
	if (process.env.APP_PASSWORD && password === process.env.APP_PASSWORD) {
		req.session.authorized = true;
		res.redirect("/");
		return;
	}
	res.set("WWW-Authenticate", 'Basic realm="example"');
	res.status(401).send();
});

app.all("*", passport.session(), (req, res, next) => {
	if (!req.session.authorized) {
		res.redirect("/auth/google");
		return;
	}
	next();
});

app.use(express.static(__dirname + "/client"));

require("./server/routes")(app); // pass application into routes

if (process.env.ENVIRONMENT == "production") {
	const privateKey = fs.readFileSync("privkey.pem", "utf8");
	const certificate = fs.readFileSync("cert.pem", "utf8");
	const ca = fs.readFileSync("chain.pem", "utf8");

	const credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca
	};

	https.createServer(credentials, app).listen(443, () => {
		console.log("Express server listening on port %d.", 443);
	});
} else {
	app.listen(3000, () => {
		console.log("Express server listening on port %d.", 3000);
	});
}

module.exports = app;
