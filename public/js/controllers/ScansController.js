angular.module("ScansController", []).controller("ScansController", [
	"$scope",
	"$state",
	"$stateParams",
	"$window",
	"Scans",
	"NgTableParams",
	"toaster",
	function($scope, $state, $stateParams, $window, Scans, NgTableParams, toaster) {
		this.frequnit = "minutes";
		this.commandArgs = "";
		this.freq = "";
		this.commandType = "";

		$scope.isFirstOpen = true;

		this.fetchLogs = function() {
			Scans.fetchLogs()
				.then(response => {
					logs = response.data.logs.split("\n").reverse();
					if (logs[0] == "") {
						logs.shift();
					}
					this.logs = logs.join("\n");
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.initPortScan = function() {
			Scans.enqueueJob("scan-ports", [this.port])
				.then(response => {
					toaster.pop("success", "Success", response.data.status);
				})
				.catch(response => {
					toaster.pop("error", "Error", response.data.error);
				});
		};

		this.initHostScan = function() {
			Scans.enqueueJob("scan-hosts", [this.path])
				.then(response => {
					toaster.pop("success", "Success", response.data.status);
				})
				.catch(response => {
					toaster.pop("error", "Error", response.data.error);
				});
		};

		this.getConfig = function() {
			Scans.getConfig()
				.then(response => {
					this.jobs = response.data.jobs;
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.scheduleCron = function() {
			Scans.scheduleCron({
				freq: this.freq,
				frequnit: this.frequnit,
				commandType: this.commandType,
				commandArgs: this.commandArgs
			})
				.then(response => {
					this.jobs = response.data.jobs;
					toaster.pop("success", "Success", "Successfully added job");
				})
				.catch(error => {
					console.log(error);
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.removeCron = function(index) {
			Scans.removeCron(index)
				.then(response => {
					this.jobs = response.data.jobs;
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.pollRunningTasks = function() {
			this.getRunningTasks();
			setInterval(this.getRunningTasks, 5000);
		};

		this.getRunningTasks = function() {
			Scans.getTasksWithStatus("running")
				.then(response => {
					$scope.tasks = response.data;
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};
	}
]);
