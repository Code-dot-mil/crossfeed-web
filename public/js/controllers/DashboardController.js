angular
	.module("DashboardController", [])
	.controller("DashboardController", [
		"$scope",
		"$state",
		"$stateParams",
		"$window",
		"Domain",
		"NgTableParams",
		function($scope, $state, $stateParams, $window, Domain, NgTableParams) {
			this.vulns = [];
			this.stats = {};

			this.type = "vulns";
			this.charts = {
				severities: {
					data: [],
					labels: ["Critical", "High", "Medium", "Low", "None"],
					colors: ["#BB281A", "#CE4A23", "#EDA33B", "#F7CB48", "#6AA746"]
				},
				monthly: {
					data: [],
					labels: [
						"Aug 2018",
						"Sept 2018",
						"Oct 2018",
						"Nov 2018",
						"Dec 2018",
						"Jan 2019",
						"Feb 2019",
						"Mar 2019",
						"Apr 2019",
						"May 2019",
						"June 2019",
						"July 2019"
					],
					options: {
						responsive: true,
						maintainAspectRatio: false,
						elements: { line: { fill: false } },
						scaleGridLineColor: "#CE4A23"
					},
					series: ["Series 1"]
				},
				weaknesses: {
					data: [],
					labels: [],
					options: {
						responsive: true,
						maintainAspectRatio: false
					}
				},
				topDomains: {
					data: [],
					labels: [],
					options: {
						responsive: true,
						maintainAspectRatio: false
					}
				},
				topDomainsHigh: {
					data: [],
					labels: [],
					options: {
						responsive: true,
						maintainAspectRatio: false
					}
				}
			};

			this.globalChartOptionsLegend = {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: true
				}
			};

			this.fetchAll = () => {
				var savedState = localStorage.getItem("vulns");
				if (savedState) {
					this.vulns = JSON.parse(savedState);
					this.computeStats();
				} else {
					Domain.fetch(this.type, {})
						.then(response => {
							this.vulns = response.data;
							localStorage.setItem("vulns", JSON.stringify(this.vulns));
							this.computeStats();
						})
						.catch(error => {
							console.log(error);
						});
				}
			};

			this.computeStats = () => {
				var stats = {
					total: this.vulns.length,
					numOpen: 0,
					severities: {
						critical: 0,
						high: 0,
						medium: 0,
						low: 0,
						none: 0
					},
					topWeaknesses: {},
					commonDomains: {},
					rootDomains: {},
					rootDomainsHigh: {}
				};
				for (var vuln of this.vulns) {
					if (vuln.state == "open") {
						stats.numOpen++;
					}
					stats.severities[vuln.severity] += 1;

					if (vuln.weakness in stats.topWeaknesses) {
						stats.topWeaknesses[vuln.weakness] += 1;
					} else {
						stats.topWeaknesses[vuln.weakness] = 1;
					}

					if (!vuln.domains) continue;
					for (var domain of vuln.domains.split(",")) {
						if (domain in stats.commonDomains) {
							stats.commonDomains[domain] += 1;
						} else {
							stats.commonDomains[domain] = 1;
						}
						var split = domain.split(".");

						var rootDomain = split[split.length - 2] + "." + split[split.length - 1];
						if (rootDomain in stats.rootDomains) {
							stats.rootDomains[rootDomain] += 1;
						} else {
							stats.rootDomains[rootDomain] = 1;
						}

						if (vuln.state == "open" && (vuln.severity == "high" || vuln.severity == "critical")) {
							if (rootDomain in stats.rootDomainsHigh) {
								stats.rootDomainsHigh[rootDomain] += 1;
							} else {
								stats.rootDomainsHigh[rootDomain] = 1;
							}
						}
					}
				}

				stats.commonDomains = this.toSortedArray(stats.commonDomains);
				stats.rootDomains = this.toSortedArray(stats.rootDomains);
				stats.rootDomainsHigh = this.toSortedArray(stats.rootDomainsHigh);
				stats.topWeaknesses = this.toSortedArray(stats.topWeaknesses);

				console.log(stats);

				this.stats = stats;
				this.charts.severities.data = [
					this.stats.severities.critical,
					this.stats.severities.high,
					this.stats.severities.medium,
					this.stats.severities.low,
					this.stats.severities.none
				];
				var months = [
					"2018-08",
					"2018-09",
					"2018-10",
					"2018-11",
					"2018-12",
					"2019-01",
					"2019-02",
					"2019-03",
					"2019-04",
					"2019-05",
					"2019-06",
					"2019-07"
				];
				var data = new Array(12).fill(0);
				for (var vuln of this.vulns) {
					for (var i in months) {
						if (vuln.reported_at.startsWith(months[i])) {
							data[i]++;
						}
					}
				}
				this.charts.monthly.data = data;

				this.charts.topDomains.labels = this.stats.rootDomains.slice(0, 10).map(a => a[0]);
				this.charts.topDomains.data = this.stats.rootDomains.slice(0, 10).map(a => a[1]);

				this.charts.topDomainsHigh.labels = this.stats.rootDomainsHigh.slice(0, 10).map(a => a[0]);
				this.charts.topDomainsHigh.data = this.stats.rootDomainsHigh.slice(0, 10).map(a => a[1]);

				this.charts.weaknesses.labels = this.stats.topWeaknesses.slice(0, 10).map(a => a[0]);
				console.log(this.charts.weaknesses.labels);
				this.charts.weaknesses.data = this.stats.topWeaknesses.slice(0, 10).map(a => a[1]);
				console.log(this.charts.weaknesses.data);
			};

			this.toSortedArray = function(obj) {
				var sorted = Object.keys(obj).map(key => [key, obj[key]]);
				return sorted.sort((first, second) => second[1] - first[1]);
			};

			this.add = function() {
				Domain.create(this.url)
					.then(response => {
						for (url of response.data) {
							this.urls.unshift(url);
						}
					})
					.catch(error => {
						$scope.formError = error.data.message;
						console.log(error);
					});
			};

			this.clear = function() {
				this.tableParams.filter({});
				this.tableParams.sorting({});
				this.tableParams.url({});
			};

			this.delete = function(id) {
				Url.delete(id)
					.then(response => {
						this.urls = this.urls.filter(url => url.id !== id);
					})
					.catch(error => {
						console.log(error);
					});
			};
		}
	])

	.filter("formatDate", () => {
		return function(value) {
			return value.split(" ")[0];
		};
	});
