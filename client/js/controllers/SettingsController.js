angular.module("SettingsController", []).controller("SettingsController", [
	"$scope",
	"$state",
	"$stateParams",
	"$window",
	"Integration",
	"NgTableParams",
	"toaster",
	function($scope, $state, $stateParams, $window, Integration, NgTableParams, toaster) {
		this.loadBDSources = function() {
			Integration.fetchBDSources()
				.then(response => {
					this.bdsources = response.data.searches;
				})
				.catch(error => {
					console.log(error);
				});
		};

		this.importBD = function(id) {
			Integration.importBDSource(id)
				.then(response => {
					toaster.pop("success", "Success", response.data.status);
				})
				.catch(error => {
					console.log(error);
				});
		};

		this.importH1Contents = function() {
			Integration.importH1Contents(this.h1cookie)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
		};
	}
]);
