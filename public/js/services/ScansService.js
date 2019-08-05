angular.module("Scans", []).service("Scans", [
  "$http",
  function($http) {
    this.fetchLogs = function() {
      return $http.get("/api/scans/logs");
    };

    this.fetchAlerts = function() {
      return $http.get("/api/alerts");
    };

    this.getConfig = function() {
      return $http.get("/api/scans/configure");
    };

    this.getTasksWithStatus = function(status) {
      return $http.get("/api/tasks/" + status);
    };

    this.enqueueJob = function(command, args) {
      return $http.post("/api/scans/enqueue", { command: command, args: args });
    };

    this.scheduleCron = function(args) {
      return $http.post("/api/scans/configure", args);
    };

    this.removeCron = function(index) {
      return $http.post("/api/scans/remove", { index: index });
    };

    this.launchScan = function(body) {
      return $http.post("/api/scans/launch", body);
    };

    this.previewCount = function(body) {
      return $http.post("/api/scans/launch/preview", body);
    };
  }
]);
