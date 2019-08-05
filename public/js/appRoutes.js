angular.module("appRoutes", []).config([
	"$routeProvider",
	"$locationProvider",
	"$stateProvider",
	function($routeProvider, $locationProvider, $stateProvider) {
		$stateProvider

			// home page
			.state("home", {
				url: "/",
				templateUrl: "views/home.html",
				controller: "Controller",
				controllerAs: "ctrl"
			})
			.state("settings", {
				url: "/settings",
				templateUrl: "views/settings.html",
				controller: "SettingsController",
				controllerAs: "ctrl"
			})
			.state("scans", {
				url: "/scans",
				templateUrl: "views/scans.html",
				controller: "ScansController",
				controllerAs: "ctrl"
			})
			.state("logs", {
				url: "/logs",
				templateUrl: "views/logs.html",
				controller: "ScansController",
				controllerAs: "ctrl"
			})
			.state("vulns", {
				url: "/vulns",
				templateUrl: "views/vulns.html",
				controller: "Controller",
				controllerAs: "ctrl"
			})
			.state("view-domain", {
				url: "/domain/:id",
				templateUrl: "views/domain.html",
				controller: "DomainController",
				controllerAs: "ctrl"
			})
			.state("view-vuln", {
				url: "/vuln/:id",
				templateUrl: "views/vuln.html",
				controller: "VulnController",
				controllerAs: "ctrl"
			})
			.state("dashboard", {
				url: "/dashboard",
				templateUrl: "views/dashboard.html",
				controller: "DashboardController",
				controllerAs: "ctrl"
			})
			.state("alerts", {
				url: "/alerts",
				templateUrl: "views/alerts.html",
				controller: "ScansController",
				controllerAs: "ctrl"
			})
			.state("launch-scan", {
				url: "/scans/launch?vulnId",
				templateUrl: "views/launchScan.html",
				controller: "ScansController",
				controllerAs: "ctrl"
			});

		$locationProvider.html5Mode(true);
	}
]);
