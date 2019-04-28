angular.module('VulnController', []).controller('VulnController', function($scope, $state, $stateParams, $window, Domain, NgTableParams) {

	this.vuln = {};


	this.fetch = () => {
		Domain.fetchOne('vulns', $stateParams.id)
		  .then(response => {
		  	this.vuln = response.data;
		  })
		  .catch((error) => {
		    console.log(error)
		  });
	}

})