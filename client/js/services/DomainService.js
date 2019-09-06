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

    // Caches and loads all unique values for a given column
    this.loadAll = function(type) {
      var savedState = localStorage.getItem(type);
      if (savedState) {
        var vals = JSON.parse(savedState);
        return new Promise(resolve => resolve(vals));
      } else {
        return $http.get("/api/values/?type=" + type).then(response => {
          if (type == "ports") {
            processed = response.data.sort((a, b) => parseInt(a) - parseInt(b)).map(p => ({ title: p, id: p }));
          } else {
            processed = response.data;
          }
          localStorage.setItem(type, JSON.stringify(processed));
          return processed;
        });
      }
    };
  }
]);
