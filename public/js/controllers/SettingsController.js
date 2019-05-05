angular.module('SettingsController', []).controller('SettingsController', function($scope, $state, $stateParams, $window, Integration, NgTableParams) {

	this.loadBDSources = function() {
		Integration.fetchBDSources()
		  .then(response => {
		  	this.bdsources = response.data.searches;
		  })
		  .catch((error) => {
		    console.log(error)
		  });
	}

	this.importBD = function(id) {
		Integration.importBDSource(id)
		.then(response => {
		  	console.log(response)
		})
		.catch((error) => {
		  console.log(error)
		});
	}

	this.importH1Contents = function() {
		Integration.importH1Contents(this.h1cookie)
		.then(response => {
		  	console.log(response)
		})
		.catch((error) => {
		  console.log(error)
		});
	}

})