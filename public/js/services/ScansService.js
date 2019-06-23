angular.module('Scans', []).service('Scans', ['$http', function($http) {

  this.fetchLogs = function() {
    return $http.get('/api/scans/logs');
  }

}]);
