angular.module("VulnController", []).controller("VulnController", [
	"$scope",
	"$state",
	"$stateParams",
	"$window",
	"Domain",
	"NgTableParams",
	function($scope, $state, $stateParams, $window, Domain, NgTableParams) {
		this.vuln = {};

		this.fetch = () => {
			Domain.fetchOne("vulns", $stateParams.id)
				.then(response => {
					this.vuln = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		};
	}
]);
