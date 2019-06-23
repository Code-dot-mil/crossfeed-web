angular.module('ScansController', []).controller('ScansController', function($scope, $state, $stateParams, $window, Scans, NgTableParams, toaster) {

	this.fetchLogs = function() {
		Scans.fetchLogs()
		  .then(response => {
		  	logs = response.data.logs.split('\n').reverse()
		  	if (logs[0] == '') {
		  		logs.shift()
		  	}
		  	this.logs = logs.join('\n');
		  })
		  .catch((error) => {
		    console.log(error)
		  });
	}

})
