angular.module('Integration', []).service('Integration', ['$http', function($http) {

  this.fetchBDSources = function() {
    return $http.get('/api/bd/sources');
  }

  this.importBDSource = function(id) {
    return $http.post('/api/bd/sources/import', {id: id});
  }

  this.importH1Contents = function(cookie) {
    return $http.post('/api/h1/importContents', {cookie: cookie});
  }

}]);