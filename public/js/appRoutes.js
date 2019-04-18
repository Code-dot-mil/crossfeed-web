angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$stateProvider', function($routeProvider, $locationProvider, $stateProvider) {

	$stateProvider

		// home page
		.state('home', {
	      url: '/',
	      templateUrl: 'views/home.html',
	      controller: 'Controller',
	      controllerAs: 'ctrl'
	    })
		.state('urls', {
	      url: '/urls',
	      templateUrl: 'views/urls.html',
	      controller: 'Controller',
	      controllerAs: 'ctrl'
	    })

	$locationProvider.html5Mode(true);

}]);