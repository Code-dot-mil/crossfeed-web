angular.module("DomainController", []).controller("DomainController", [
	"$scope",
	"$state",
	"$stateParams",
	"$window",
	"Domain",
	"NgTableParams",
	function($scope, $state, $stateParams, $window, Domain, NgTableParams) {
		this.domain = {};

		this.fetch = () => {
			Domain.fetchOne("domains", $stateParams.id)
				.then(response => {
					this.domain = response.data;
					this.domain.link = this.domain.ports.includes("443")
						? "https://" + this.domain.name
						: "http://" + this.domain.name;
				})
				.catch(error => {
					console.log(error);
				});
		};
	}
]);
