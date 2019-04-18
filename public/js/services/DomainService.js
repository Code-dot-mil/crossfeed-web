angular.module('Domain', []).service('Domain', ['$http', function($http) {

  this.create = function(domain) {
    return $http.post('/api/domains', {'domain': domain});
  }

  this.fetch = function(url, sorting, filter) {
    var queryParams = '?page=' + url.page + '&count=' + url.count;
    var sortingKeys = Object.keys(sorting);
    if (sortingKeys.length > 0) {
      queryParams += '&orderBy=' + sortingKeys[0] + "&sort=" + sorting[sortingKeys[0]];
    }

    console.log(filter)
    var filterKeys = Object.keys(filter);
    if (filterKeys.length > 0) {
      queryParams += '&filterBy=' + filterKeys[0] + "&filter=" + filter[filterKeys[0]];
    }
    return $http.get('/api/domains' + queryParams);
  }

  this.search = function(searchString) {
    return $http.get('/api/domains/search?q=' + encodeURIComponent(searchString));
  }

  this.delete = function(id) {
    return $http.delete('/api/domains/' + id);
  }

}]);