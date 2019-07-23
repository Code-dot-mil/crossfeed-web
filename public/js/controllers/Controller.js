angular
	.module("Controller", [])
	.controller("Controller", [
		"$scope",
		"$state",
		"$stateParams",
		"$window",
		"Domain",
		"NgTableParams",
		function($scope, $state, $stateParams, $window, Domain, NgTableParams) {
			this.domains = [];
			this.domain = "";

			this.searchString = "";

			this.type = "domains"; // Default to domains search

			// prettier-ignore
			this.services = ["PHP", "Node.js", "Ruby", "Oracle HTTP Server", "Java", "jQuery UI", "jQuery", "Microsoft ASP.NET", "IIS 8.5", "Windows Server", "Microsoft HTTPAPI 2.0", "Apache", "Microsoft SharePoint", "Microsoft ASP.NET Viper", "Modernizr", "Twitter", "IIS 7.5", "ZURB Foundation", "Google Tag Manager", "Adobe Experience Manager", "Plone", "Python", "F5 BigIP", "animate.css", "Bootstrap", "prettyPhoto", "OWL Carousel", "Red Hat", "Apache 2.2.15", "Azure", "Google Analytics", "jQuery Migrate", "DNN", "Font Awesome", "Hammer.js", "Google Font API", "Instabot", "Amazon S3", "Amazon Web Services"];

			this.fetchAll = () => {
				var tableParams = {
					page: 1, // show first page
					count: 25 // count per page
				};
				var savedState = localStorage.getItem("tableParams-" + this.type);
				if (savedState) {
					tableParams = JSON.parse(savedState);
				}

				this.tableParams = new NgTableParams(tableParams, {
					filterDelay: 1000,
					getData: this.search
				});
			};

			this.search = params => {
				var queryParams = {
					page: params.url().page,
					count: params.url().count,
					sorting: params.sorting(),
					filter: params.filter()
				};
				localStorage.setItem("tableParams-" + this.type, JSON.stringify({ count: params.url().count }));
				return Domain.fetch(this.type, queryParams)
					.then(response => {
						params.total(response.data.count);
						var domains = response.data.rows;
						$scope.count = response.data.count;
						return domains;
					})
					.catch(error => {
						console.log(error);
					});
			};

			this.add = function() {
				Domain.create(this.url)
					.then(response => {
						for (url of response.data) {
							this.urls.unshift(url);
						}
					})
					.catch(error => {
						$scope.formError = error.data.message;
						console.log(error);
					});
			};

			this.clear = function() {
				this.tableParams.filter({});
				this.tableParams.sorting({});
				this.tableParams.url({});
			};

			this.delete = function(id) {
				Url.delete(id)
					.then(response => {
						this.urls = this.urls.filter(url => url.id !== id);
					})
					.catch(error => {
						console.log(error);
					});
			};
		}
	])

	.filter("formatDate", () => {
		return function(value) {
			return value.split(" ")[0];
		};
	});
