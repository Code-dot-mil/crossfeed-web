angular.module("ScansController", []).controller("ScansController", [
	"$scope",
	"$state",
	"$stateParams",
	"$window",
	"Scans",
	"NgTableParams",
	"toaster",
	"Domain",
	function($scope, $state, $stateParams, $window, Scans, NgTableParams, toaster, Domain) {
		this.frequnit = "minutes";
		this.commandArgs = "";
		this.freq = "";
		this.commandType = "";
		this.newScan = {
			responseMatches: [{}],
			ports: [{}],
			services: [{}],
			request: `GET / HTTP/1.1
Host: {host}
User-Agent: crossfeed-scanner
Connection: close`
		};

		this.alerts = [];

		$scope.tasks = {};

		this.allValues = {
			ports: [],
			services: []
		};

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

		this.fetchAlerts = function() {
			Scans.fetchAlerts()
				.then(response => {
					this.alerts = response.data;
					for (var alert of this.alerts) {
						alert.isOpen = true;
					}
					console.log(this.alerts);
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
			this.getTasks("running");
			this.getTasks("all");
			setInterval(this.getRunningTasks, 5000);
		};

		this.getTasks = function(type) {
			Scans.getTasksWithStatus(type)
				.then(response => {
					for (task of response.data) {
						if (task.status == "running") {
							task.type = "warning";
						} else if (task.status == "failed") {
							task.type = "danger";
						} else if (task.status == "finished") {
							task.type = "success";
						}
						task.status = task.status[0].toUpperCase() + task.status.substring(1);
					}
					$scope.tasks[type] = response.data;
					console.log($scope.tasks[type]);
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.getAllTasks = function() {
			Scans.getTasksWithStatus("all")
				.then(response => {
					$scope.allTasks = response.data;
				})
				.catch(error => {
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.fetchVulnerability = () => {
			Domain.fetchOne("vulns", $stateParams.vulnId)
				.then(response => {
					this.vuln = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		};

		this.loadAll = type => {
			Domain.loadAll(type)
				.then(vals => {
					this.allValues[type] = vals;
				})
				.catch(error => {
					console.log(error);
				});
		};

		this.beginScan = () => {
			Scans.launchScan({
				greps: this.filterVals(this.newScan.responseMatches),
				request: this.newScan.request,
				filters: {
					ports: this.filterVals(this.newScan.ports),
					services: this.filterVals(this.newScan.services)
				}
			})
				.then(response => {
					this.jobs = response.data.jobs;
					toaster.pop("success", "Success", "Successfully added scan to queue!");
				})
				.catch(error => {
					console.log(error);
					toaster.pop("error", "Error", error.data.error);
				});
		};

		this.previewCount = () => {
			Scans.previewCount({
				filters: {
					ports: this.filterVals(this.newScan.ports),
					services: this.filterVals(this.newScan.services)
				}
			})
				.then(response => {
					this.countPreview = response.data.count;
				})
				.catch(error => {
					console.log(error);
				});
		};

		this.filterVals = vals => {
			return vals.map(val => val.value).filter(val => val);
		};
	}
]);
