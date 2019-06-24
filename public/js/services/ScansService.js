angular.module('Scans', []).service('Scans', ['$http', function($http) {

  this.fetchLogs = function() {
    return $http.get('/api/scans/logs');
  }

  this.getConfig = function() {
    return $http.get('/api/scans/configure');
  }

  this.enqueueJob = function(command) {
    return $http.post('/api/scans/enqueue', {command: command});
  }

  this.scheduleCron = function(args) {
    return $http.post('/api/scans/configure', args);
  }

  this.removeCron = function(index) {
    return $http.post('/api/scans/remove', {index: index});
  }

}]);
