var webpack = require("webpack");
module.exports = {
	entry: {
		app: __dirname + "/client/js/app.js"
	},
	output: {
		path: __dirname + "/client/dist/",
		filename: "app.bundle.js"
	}
};
