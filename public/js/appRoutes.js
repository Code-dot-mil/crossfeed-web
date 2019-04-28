angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$stateProvider', function($routeProvider, $locationProvider, $stateProvider) {

	$stateProvider

		// home page
		.state('home', {
	      url: '/',
	      templateUrl: 'views/home.html',
	      controller: 'Controller',
	      controllerAs: 'ctrl'
	    })
		.state('settings', {
	      url: '/settings',
	      templateUrl: 'views/settings.html',
	      controller: 'SettingsController',
	      controllerAs: 'ctrl'
	    })
		.state('vulns', {
	      url: '/vulns',
	      templateUrl: 'views/vulns.html',
	      controller: 'Controller',
	      controllerAs: 'ctrl'
	    })
	    .state('view-domain', {
	      url: '/domain/:id',
	      templateUrl: 'views/domain.html',
	      controller: 'DomainController',
	      controllerAs: 'ctrl'
	    })
	    .state('view-vuln', {
	      url: '/vuln/:id',
	      templateUrl: 'views/vuln.html',
	      controller: 'VulnController',
	      controllerAs: 'ctrl'
	    })

	$locationProvider.html5Mode(true);

}]);