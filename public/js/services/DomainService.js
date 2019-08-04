angular.module("Domain", []).service("Domain", [
  "$http",
  function($http) {
    this.create = function(domain) {
      return $http.post("/api/domains", { domain: domain });
    };

    this.fetch = function(type, queryParams) {
      return $http.post("/api/" + type + "/search", queryParams);
    };

    this.fetchOne = function(type, id) {
      return $http.get("/api/" + type + "/" + id);
    };

    this.search = function(searchString) {
      return $http.get("/api/domains/search?q=" + encodeURIComponent(searchString));
    };

    this.delete = function(id) {
      return $http.delete("/api/domains/" + id);
    };

    this.loadAll = function(type) {
      return $http.get("/api/values/?type=" + type);
    };
  }
]);
