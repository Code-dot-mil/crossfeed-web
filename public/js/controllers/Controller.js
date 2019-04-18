angular.module('Controller', []).controller('Controller', function($scope, $state, $stateParams, $window, Domain, NgTableParams) {

	this.domains = [];
	this.domain = '';

	this.searchString = '';


	this.fetchAll = () => {
		this.tableParams = new NgTableParams({
		 	page: 1, // show first page
		    count: 25 // count per page
		}, {
			getData: this.getData
		});
	}

	this.getData = function(params) {
		return Domain.fetch(params.url(), params.sorting(), params.filter())
			.then(response => {
				params.total(response.data.count);
				var domains = response.data.rows;
				return domains;
			})
			.catch((error) => {
				console.log(error)
			});
	}

	this.add = function() {
		Domain.create(this.url)
		  .then(response => {
		  	for (url of response.data) {
		  		this.urls.unshift(url)
		  	}
		  })
		  .catch((error) => {
		  	$scope.formError = error.data.message;
		    console.log(error)
		  });
	}

	this.search = function() {
		this.loading = true;
		Domain.search(this.searchString)
		  .then(response => {
		  	this.urls = response.data;
		  	this.loading = false;
		  	console.log(this.urls)
		  })
		  .catch((error) => {
		  	this.loading = false;
		    console.log(error)
		  });
	}

	this.delete = function(id) {
		Url.delete(id)
			.then(response => {
				this.urls = this.urls.filter((url) => url.id !== id);
		  })
		  .catch((error) => {
		    console.log(error)
		  });
	}

})

.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);