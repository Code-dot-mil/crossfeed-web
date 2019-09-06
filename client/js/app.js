require("./controllers/Controller");
require("./controllers/DashboardController");
require("./controllers/SettingsController");
require("./controllers/DomainController");
require("./controllers/ScansController");
require("./controllers/VulnController");

require("./services/DomainService");
require("./services/IntegrationService");
require("./services/ScansService");

require("./appDirectives");
require("./appRoutes");

angular.module("app", [
	"ngRoute",
	"ui.router",
	"appRoutes",
	"Controller",
	"DomainController",
	"VulnController",
	"SettingsController",
	"DashboardController",
	"ScansController",
	"Domain",
	"Integration",
	"ngTable",
	"toaster",
	"Scans",
	"chart.js",
	"ui.bootstrap",
	"ngAnimate"
]);
