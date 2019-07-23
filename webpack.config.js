var webpack = require("webpack");
module.exports = {
	entry: {
		app: __dirname + "/public/js/app.js"
	},
	output: {
		path: __dirname + "/public/dist/",
		filename: "app.bundle.js"
	}
};
