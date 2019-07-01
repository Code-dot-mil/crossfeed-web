angular.module('Controller', []).controller('Controller', function($scope, $state, $stateParams, $window, Domain, NgTableParams) {

	this.domains = [];
	this.domain = '';

	this.searchString = '';

	this.type = 'domains'; // Default to domains search


	this.fetchAll = () => {
		var tableParams = {
		 	page: 1, // show first page
		    count: 25 // count per page
		};
        var savedState = localStorage.getItem('tableParams-' + this.type);
        if (savedState) {
            tableParams = JSON.parse(savedState);
        }

		this.tableParams = new NgTableParams(tableParams, {
			filterDelay: 1000,
			getData: this.search
		});

	}

	this.search = (params) => {
		var queryParams = {
	      page: params.url().page,
	      count: params.url().count,
	      sorting: params.sorting(),
	      filter: params.filter()
	    }
        localStorage.setItem('tableParams-' + this.type, JSON.stringify({count: params.url().count}));
		return Domain.fetch(this.type, queryParams)
			.then(response => {
				params.total(response.data.count);
				var domains = response.data.rows;
				$scope.count = response.data.count;
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

	this.clear = function() {
		this.tableParams.filter({});
		this.tableParams.sorting({});
		this.tableParams.url({});
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

.filter('formatDate', () => {
        return function(value) {
        	return value.split(' ')[0];
        };
    });
