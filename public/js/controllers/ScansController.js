angular.module('ScansController', []).controller('ScansController', function($scope, $state, $stateParams, $window, Scans, NgTableParams, toaster) {

	this.frequnit = "minutes"
	this.commandArgs = ""
	this.freq = ""
	this.commandType = ""

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
		    toaster.pop('error', "Error", error.data.error);
		  });
	}

	this.initPortScan = function() {
		Scans.enqueueJob('scanPorts')
		  .then(response => {
		  	toaster.pop('success', "Success", response.data.status);
		  })
		  .catch((response) => {
		  	toaster.pop('error', "Error", response.data.error);
		  });
	}

	this.getConfig = function() {
		Scans.getConfig()
		  .then(response => {
		  	this.jobs = response.data.jobs
		  })
		  .catch((error) => {
		    toaster.pop('error', "Error", error.data.error);
		  });
	}

	this.scheduleCron = function() {
		Scans.scheduleCron({
			freq: this.freq,
			frequnit: this.frequnit,
			commandType: this.commandType,
			commandArgs: this.commandArgs
		})
		  .then(response => {
		  	this.jobs = response.data.jobs
		  	toaster.pop('success', "Success", "Successfully added job");
		  })
		  .catch((error) => {
		  	console.log(error)
		    toaster.pop('error', "Error", error.data.error);
		  });
	}

	this.removeCron = function(index) {
		Scans.removeCron(index)
		  .then(response => {
		  	this.jobs = response.data.jobs
		  })
		  .catch((error) => {
		    toaster.pop('error', "Error", error.data.error);
		  });
	}

})
