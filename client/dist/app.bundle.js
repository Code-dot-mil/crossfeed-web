/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/js/app.js":
/*!**************************!*\
  !*** ./client/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./controllers/Controller */ \"./client/js/controllers/Controller.js\");\n__webpack_require__(/*! ./controllers/DashboardController */ \"./client/js/controllers/DashboardController.js\");\n__webpack_require__(/*! ./controllers/SettingsController */ \"./client/js/controllers/SettingsController.js\");\n__webpack_require__(/*! ./controllers/DomainController */ \"./client/js/controllers/DomainController.js\");\n__webpack_require__(/*! ./controllers/ScansController */ \"./client/js/controllers/ScansController.js\");\n__webpack_require__(/*! ./controllers/VulnController */ \"./client/js/controllers/VulnController.js\");\n\n__webpack_require__(/*! ./services/DomainService */ \"./client/js/services/DomainService.js\");\n__webpack_require__(/*! ./services/IntegrationService */ \"./client/js/services/IntegrationService.js\");\n__webpack_require__(/*! ./services/ScansService */ \"./client/js/services/ScansService.js\");\n\n__webpack_require__(/*! ./appDirectives */ \"./client/js/appDirectives.js\");\n__webpack_require__(/*! ./appRoutes */ \"./client/js/appRoutes.js\");\n\nangular.module(\"app\", [\n\t\"ngRoute\",\n\t\"ui.router\",\n\t\"appRoutes\",\n\t\"Controller\",\n\t\"DomainController\",\n\t\"VulnController\",\n\t\"SettingsController\",\n\t\"DashboardController\",\n\t\"ScansController\",\n\t\"Domain\",\n\t\"Integration\",\n\t\"ngTable\",\n\t\"toaster\",\n\t\"Scans\",\n\t\"chart.js\",\n\t\"ui.bootstrap\",\n\t\"ngAnimate\"\n]);\n\n\n//# sourceURL=webpack:///./client/js/app.js?");

/***/ }),

/***/ "./client/js/appDirectives.js":
/*!************************************!*\
  !*** ./client/js/appDirectives.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./client/js/appDirectives.js?");

/***/ }),

/***/ "./client/js/appRoutes.js":
/*!********************************!*\
  !*** ./client/js/appRoutes.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"appRoutes\", []).config([\n\t\"$routeProvider\",\n\t\"$locationProvider\",\n\t\"$stateProvider\",\n\tfunction($routeProvider, $locationProvider, $stateProvider) {\n\t\t$stateProvider\n\n\t\t\t// home page\n\t\t\t.state(\"home\", {\n\t\t\t\turl: \"/\",\n\t\t\t\ttemplateUrl: \"views/home.html\",\n\t\t\t\tcontroller: \"Controller\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"settings\", {\n\t\t\t\turl: \"/settings\",\n\t\t\t\ttemplateUrl: \"views/settings.html\",\n\t\t\t\tcontroller: \"SettingsController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"scans\", {\n\t\t\t\turl: \"/scans\",\n\t\t\t\ttemplateUrl: \"views/scans.html\",\n\t\t\t\tcontroller: \"ScansController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"logs\", {\n\t\t\t\turl: \"/logs\",\n\t\t\t\ttemplateUrl: \"views/logs.html\",\n\t\t\t\tcontroller: \"ScansController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"vulns\", {\n\t\t\t\turl: \"/vulns\",\n\t\t\t\ttemplateUrl: \"views/vulns.html\",\n\t\t\t\tcontroller: \"Controller\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"view-domain\", {\n\t\t\t\turl: \"/domain/:id\",\n\t\t\t\ttemplateUrl: \"views/domain.html\",\n\t\t\t\tcontroller: \"DomainController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"view-vuln\", {\n\t\t\t\turl: \"/vuln/:id\",\n\t\t\t\ttemplateUrl: \"views/vuln.html\",\n\t\t\t\tcontroller: \"VulnController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"dashboard\", {\n\t\t\t\turl: \"/dashboard\",\n\t\t\t\ttemplateUrl: \"views/dashboard.html\",\n\t\t\t\tcontroller: \"DashboardController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"alerts\", {\n\t\t\t\turl: \"/alerts\",\n\t\t\t\ttemplateUrl: \"views/alerts.html\",\n\t\t\t\tcontroller: \"ScansController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t})\n\t\t\t.state(\"launch-scan\", {\n\t\t\t\turl: \"/scans/launch?vulnId\",\n\t\t\t\ttemplateUrl: \"views/launchScan.html\",\n\t\t\t\tcontroller: \"ScansController\",\n\t\t\t\tcontrollerAs: \"ctrl\"\n\t\t\t});\n\n\t\t$locationProvider.html5Mode(true);\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/appRoutes.js?");

/***/ }),

/***/ "./client/js/controllers/Controller.js":
/*!*********************************************!*\
  !*** ./client/js/controllers/Controller.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular\n\t.module(\"Controller\", [])\n\t.controller(\"Controller\", [\n\t\t\"$scope\",\n\t\t\"$state\",\n\t\t\"$stateParams\",\n\t\t\"$window\",\n\t\t\"Domain\",\n\t\t\"NgTableParams\",\n\t\tfunction($scope, $state, $stateParams, $window, Domain, NgTableParams) {\n\t\t\tthis.domains = [];\n\t\t\tthis.domain = \"\";\n\n\t\t\tthis.searchString = \"\";\n\n\t\t\tthis.type = \"domains\"; // Default to domains search\n\n\t\t\tthis.all = {\n\t\t\t\tports: [],\n\t\t\t\tservices: []\n\t\t\t};\n\n\t\t\tthis.fetchAll = () => {\n\t\t\t\tvar tableParams = {\n\t\t\t\t\tpage: 1, // show first page\n\t\t\t\t\tcount: 25 // count per page\n\t\t\t\t};\n\t\t\t\tvar savedState = localStorage.getItem(\"tableParams-\" + this.type);\n\t\t\t\tif (savedState) {\n\t\t\t\t\ttableParams = JSON.parse(savedState);\n\t\t\t\t}\n\n\t\t\t\tthis.tableParams = new NgTableParams(tableParams, {\n\t\t\t\t\tfilterDelay: 1000,\n\t\t\t\t\tgetData: this.search\n\t\t\t\t});\n\n\t\t\t\tthis.loadAll(\"services\");\n\t\t\t};\n\n\t\t\tthis.search = params => {\n\t\t\t\tvar queryParams = {\n\t\t\t\t\tpage: params.url().page,\n\t\t\t\t\tcount: params.url().count,\n\t\t\t\t\tsorting: params.sorting(),\n\t\t\t\t\tfilter: params.filter()\n\t\t\t\t};\n\t\t\t\tlocalStorage.setItem(\"tableParams-\" + this.type, JSON.stringify({ count: params.url().count }));\n\t\t\t\treturn Domain.fetch(this.type, queryParams)\n\t\t\t\t\t.then(response => {\n\t\t\t\t\t\tparams.total(response.data.count);\n\t\t\t\t\t\tvar domains = response.data.rows;\n\t\t\t\t\t\t$scope.count = response.data.count;\n\t\t\t\t\t\treturn domains;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\n\t\t\tthis.add = function() {\n\t\t\t\tDomain.create(this.url)\n\t\t\t\t\t.then(response => {\n\t\t\t\t\t\tfor (url of response.data) {\n\t\t\t\t\t\t\tthis.urls.unshift(url);\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\t$scope.formError = error.data.message;\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\n\t\t\tthis.clear = function() {\n\t\t\t\tthis.tableParams.filter({});\n\t\t\t\tthis.tableParams.sorting({});\n\t\t\t\tthis.tableParams.url({});\n\t\t\t};\n\n\t\t\tthis.delete = function(id) {\n\t\t\t\tUrl.delete(id)\n\t\t\t\t\t.then(response => {\n\t\t\t\t\t\tthis.urls = this.urls.filter(url => url.id !== id);\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\n\t\t\tthis.loadAll = type => {\n\t\t\t\treturn Domain.loadAll(type)\n\t\t\t\t\t.then(vals => {\n\t\t\t\t\t\tthis.all[type] = vals;\n\t\t\t\t\t\treturn vals;\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t}\n\t])\n\n\t.filter(\"formatDate\", () => {\n\t\treturn function(value) {\n\t\t\treturn value.split(\" \")[0];\n\t\t};\n\t});\n\n\n//# sourceURL=webpack:///./client/js/controllers/Controller.js?");

/***/ }),

/***/ "./client/js/controllers/DashboardController.js":
/*!******************************************************!*\
  !*** ./client/js/controllers/DashboardController.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular\n\t.module(\"DashboardController\", [])\n\t.controller(\"DashboardController\", [\n\t\t\"$scope\",\n\t\t\"$state\",\n\t\t\"$stateParams\",\n\t\t\"$window\",\n\t\t\"Domain\",\n\t\t\"NgTableParams\",\n\t\tfunction($scope, $state, $stateParams, $window, Domain, NgTableParams) {\n\t\t\tthis.vulns = [];\n\t\t\tthis.stats = {};\n\n\t\t\tthis.type = \"vulns\";\n\t\t\tthis.charts = {\n\t\t\t\tseverities: {\n\t\t\t\t\tdata: [],\n\t\t\t\t\tlabels: [\"Critical\", \"High\", \"Medium\", \"Low\", \"None\"],\n\t\t\t\t\tcolors: [\"#BB281A\", \"#CE4A23\", \"#EDA33B\", \"#F7CB48\", \"#6AA746\"]\n\t\t\t\t},\n\t\t\t\tmonthly: {\n\t\t\t\t\tdata: [],\n\t\t\t\t\tlabels: [\n\t\t\t\t\t\t\"Aug 2018\",\n\t\t\t\t\t\t\"Sept 2018\",\n\t\t\t\t\t\t\"Oct 2018\",\n\t\t\t\t\t\t\"Nov 2018\",\n\t\t\t\t\t\t\"Dec 2018\",\n\t\t\t\t\t\t\"Jan 2019\",\n\t\t\t\t\t\t\"Feb 2019\",\n\t\t\t\t\t\t\"Mar 2019\",\n\t\t\t\t\t\t\"Apr 2019\",\n\t\t\t\t\t\t\"May 2019\",\n\t\t\t\t\t\t\"June 2019\",\n\t\t\t\t\t\t\"July 2019\"\n\t\t\t\t\t],\n\t\t\t\t\toptions: {\n\t\t\t\t\t\tresponsive: true,\n\t\t\t\t\t\tmaintainAspectRatio: false,\n\t\t\t\t\t\telements: { line: { fill: false } },\n\t\t\t\t\t\tscaleGridLineColor: \"#CE4A23\"\n\t\t\t\t\t},\n\t\t\t\t\tseries: [\"Series 1\"]\n\t\t\t\t},\n\t\t\t\tweaknesses: {\n\t\t\t\t\tdata: [],\n\t\t\t\t\tlabels: [],\n\t\t\t\t\toptions: {\n\t\t\t\t\t\tresponsive: true,\n\t\t\t\t\t\tmaintainAspectRatio: false\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\ttopDomains: {\n\t\t\t\t\tdata: [],\n\t\t\t\t\tlabels: [],\n\t\t\t\t\toptions: {\n\t\t\t\t\t\tresponsive: true,\n\t\t\t\t\t\tmaintainAspectRatio: false\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\ttopDomainsHigh: {\n\t\t\t\t\tdata: [],\n\t\t\t\t\tlabels: [],\n\t\t\t\t\toptions: {\n\t\t\t\t\t\tresponsive: true,\n\t\t\t\t\t\tmaintainAspectRatio: false\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tthis.globalChartOptionsLegend = {\n\t\t\t\tresponsive: true,\n\t\t\t\tmaintainAspectRatio: false,\n\t\t\t\tlegend: {\n\t\t\t\t\tdisplay: true\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tthis.fetchAll = () => {\n\t\t\t\tvar savedState = localStorage.getItem(\"vulns\");\n\t\t\t\tif (savedState) {\n\t\t\t\t\tthis.vulns = JSON.parse(savedState);\n\t\t\t\t\tthis.computeStats();\n\t\t\t\t} else {\n\t\t\t\t\tDomain.fetch(this.type, {})\n\t\t\t\t\t\t.then(response => {\n\t\t\t\t\t\t\tthis.vulns = response.data;\n\t\t\t\t\t\t\tlocalStorage.setItem(\"vulns\", JSON.stringify(this.vulns));\n\t\t\t\t\t\t\tthis.computeStats();\n\t\t\t\t\t\t})\n\t\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tthis.computeStats = () => {\n\t\t\t\tvar stats = {\n\t\t\t\t\ttotal: this.vulns.length,\n\t\t\t\t\tnumOpen: 0,\n\t\t\t\t\tseverities: {\n\t\t\t\t\t\tcritical: 0,\n\t\t\t\t\t\thigh: 0,\n\t\t\t\t\t\tmedium: 0,\n\t\t\t\t\t\tlow: 0,\n\t\t\t\t\t\tnone: 0\n\t\t\t\t\t},\n\t\t\t\t\ttopWeaknesses: {},\n\t\t\t\t\tcommonDomains: {},\n\t\t\t\t\trootDomains: {},\n\t\t\t\t\trootDomainsHigh: {}\n\t\t\t\t};\n\t\t\t\tfor (var vuln of this.vulns) {\n\t\t\t\t\tif (vuln.state == \"open\") {\n\t\t\t\t\t\tstats.numOpen++;\n\t\t\t\t\t}\n\t\t\t\t\tstats.severities[vuln.severity] += 1;\n\n\t\t\t\t\tif (vuln.weakness in stats.topWeaknesses) {\n\t\t\t\t\t\tstats.topWeaknesses[vuln.weakness] += 1;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tstats.topWeaknesses[vuln.weakness] = 1;\n\t\t\t\t\t}\n\n\t\t\t\t\tif (!vuln.domains) continue;\n\t\t\t\t\tfor (var domain of vuln.domains.split(\",\")) {\n\t\t\t\t\t\tif (domain in stats.commonDomains) {\n\t\t\t\t\t\t\tstats.commonDomains[domain] += 1;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tstats.commonDomains[domain] = 1;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tvar split = domain.split(\".\");\n\n\t\t\t\t\t\tvar rootDomain = split[split.length - 2] + \".\" + split[split.length - 1];\n\t\t\t\t\t\tif (rootDomain in stats.rootDomains) {\n\t\t\t\t\t\t\tstats.rootDomains[rootDomain] += 1;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tstats.rootDomains[rootDomain] = 1;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tif (vuln.state == \"open\" && (vuln.severity == \"high\" || vuln.severity == \"critical\")) {\n\t\t\t\t\t\t\tif (rootDomain in stats.rootDomainsHigh) {\n\t\t\t\t\t\t\t\tstats.rootDomainsHigh[rootDomain] += 1;\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tstats.rootDomainsHigh[rootDomain] = 1;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tstats.commonDomains = this.toSortedArray(stats.commonDomains);\n\t\t\t\tstats.rootDomains = this.toSortedArray(stats.rootDomains);\n\t\t\t\tstats.rootDomainsHigh = this.toSortedArray(stats.rootDomainsHigh);\n\t\t\t\tstats.topWeaknesses = this.toSortedArray(stats.topWeaknesses);\n\n\t\t\t\tconsole.log(stats);\n\n\t\t\t\tthis.stats = stats;\n\t\t\t\tthis.charts.severities.data = [\n\t\t\t\t\tthis.stats.severities.critical,\n\t\t\t\t\tthis.stats.severities.high,\n\t\t\t\t\tthis.stats.severities.medium,\n\t\t\t\t\tthis.stats.severities.low,\n\t\t\t\t\tthis.stats.severities.none\n\t\t\t\t];\n\t\t\t\tvar months = [\n\t\t\t\t\t\"2018-08\",\n\t\t\t\t\t\"2018-09\",\n\t\t\t\t\t\"2018-10\",\n\t\t\t\t\t\"2018-11\",\n\t\t\t\t\t\"2018-12\",\n\t\t\t\t\t\"2019-01\",\n\t\t\t\t\t\"2019-02\",\n\t\t\t\t\t\"2019-03\",\n\t\t\t\t\t\"2019-04\",\n\t\t\t\t\t\"2019-05\",\n\t\t\t\t\t\"2019-06\",\n\t\t\t\t\t\"2019-07\"\n\t\t\t\t];\n\t\t\t\tvar data = new Array(12).fill(0);\n\t\t\t\tfor (var vuln of this.vulns) {\n\t\t\t\t\tfor (var i in months) {\n\t\t\t\t\t\tif (vuln.reported_at.startsWith(months[i])) {\n\t\t\t\t\t\t\tdata[i]++;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tthis.charts.monthly.data = data;\n\n\t\t\t\tthis.charts.topDomains.labels = this.stats.rootDomains.slice(0, 10).map(a => a[0]);\n\t\t\t\tthis.charts.topDomains.data = this.stats.rootDomains.slice(0, 10).map(a => a[1]);\n\n\t\t\t\tthis.charts.topDomainsHigh.labels = this.stats.rootDomainsHigh.slice(0, 10).map(a => a[0]);\n\t\t\t\tthis.charts.topDomainsHigh.data = this.stats.rootDomainsHigh.slice(0, 10).map(a => a[1]);\n\n\t\t\t\tthis.charts.weaknesses.labels = this.stats.topWeaknesses.slice(0, 10).map(a => a[0]);\n\t\t\t\tconsole.log(this.charts.weaknesses.labels);\n\t\t\t\tthis.charts.weaknesses.data = this.stats.topWeaknesses.slice(0, 10).map(a => a[1]);\n\t\t\t\tconsole.log(this.charts.weaknesses.data);\n\t\t\t};\n\n\t\t\tthis.toSortedArray = function(obj) {\n\t\t\t\tvar sorted = Object.keys(obj).map(key => [key, obj[key]]);\n\t\t\t\treturn sorted.sort((first, second) => second[1] - first[1]);\n\t\t\t};\n\n\t\t\tthis.add = function() {\n\t\t\t\tDomain.create(this.url)\n\t\t\t\t\t.then(response => {\n\t\t\t\t\t\tfor (url of response.data) {\n\t\t\t\t\t\t\tthis.urls.unshift(url);\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\t$scope.formError = error.data.message;\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\n\t\t\tthis.clear = function() {\n\t\t\t\tthis.tableParams.filter({});\n\t\t\t\tthis.tableParams.sorting({});\n\t\t\t\tthis.tableParams.url({});\n\t\t\t};\n\n\t\t\tthis.delete = function(id) {\n\t\t\t\tUrl.delete(id)\n\t\t\t\t\t.then(response => {\n\t\t\t\t\t\tthis.urls = this.urls.filter(url => url.id !== id);\n\t\t\t\t\t})\n\t\t\t\t\t.catch(error => {\n\t\t\t\t\t\tconsole.log(error);\n\t\t\t\t\t});\n\t\t\t};\n\t\t}\n\t])\n\n\t.filter(\"formatDate\", () => {\n\t\treturn function(value) {\n\t\t\treturn value.split(\" \")[0];\n\t\t};\n\t});\n\n\n//# sourceURL=webpack:///./client/js/controllers/DashboardController.js?");

/***/ }),

/***/ "./client/js/controllers/DomainController.js":
/*!***************************************************!*\
  !*** ./client/js/controllers/DomainController.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"DomainController\", []).controller(\"DomainController\", [\n\t\"$scope\",\n\t\"$state\",\n\t\"$stateParams\",\n\t\"$window\",\n\t\"Domain\",\n\t\"NgTableParams\",\n\tfunction($scope, $state, $stateParams, $window, Domain, NgTableParams) {\n\t\tthis.domain = {};\n\n\t\tthis.fetch = () => {\n\t\t\tDomain.fetchOne(\"domains\", $stateParams.id)\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.domain = response.data;\n\t\t\t\t\tthis.domain.link = this.domain.ports.includes(\"443\")\n\t\t\t\t\t\t? \"https://\" + this.domain.name\n\t\t\t\t\t\t: \"http://\" + this.domain.name;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/controllers/DomainController.js?");

/***/ }),

/***/ "./client/js/controllers/ScansController.js":
/*!**************************************************!*\
  !*** ./client/js/controllers/ScansController.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"ScansController\", []).controller(\"ScansController\", [\n\t\"$scope\",\n\t\"$state\",\n\t\"$stateParams\",\n\t\"$window\",\n\t\"Scans\",\n\t\"NgTableParams\",\n\t\"toaster\",\n\t\"Domain\",\n\tfunction($scope, $state, $stateParams, $window, Scans, NgTableParams, toaster, Domain) {\n\t\tthis.frequnit = \"minutes\";\n\t\tthis.commandArgs = \"\";\n\t\tthis.freq = \"\";\n\t\tthis.commandType = \"\";\n\t\tthis.newScan = {\n\t\t\tresponseMatches: [{}],\n\t\t\tports: [{}],\n\t\t\tservices: [{}],\n\t\t\trequest: `GET / HTTP/1.1\nHost: {host}\nUser-Agent: crossfeed-scanner\nConnection: close`\n\t\t};\n\n\t\tthis.alerts = [];\n\n\t\t$scope.tasks = {};\n\n\t\tthis.allValues = {\n\t\t\tports: [],\n\t\t\tservices: []\n\t\t};\n\n\t\tthis.fetchLogs = function() {\n\t\t\tScans.fetchLogs()\n\t\t\t\t.then(response => {\n\t\t\t\t\tlogs = response.data.logs.split(\"\\n\").reverse();\n\t\t\t\t\tif (logs[0] == \"\") {\n\t\t\t\t\t\tlogs.shift();\n\t\t\t\t\t}\n\t\t\t\t\tthis.logs = logs.join(\"\\n\");\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.fetchAlerts = function() {\n\t\t\tScans.fetchAlerts()\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.alerts = response.data;\n\t\t\t\t\tfor (var alert of this.alerts) {\n\t\t\t\t\t\talert.isOpen = true;\n\t\t\t\t\t}\n\t\t\t\t\tconsole.log(this.alerts);\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.initPortScan = function() {\n\t\t\tScans.enqueueJob(\"scan-ports\", [this.port])\n\t\t\t\t.then(response => {\n\t\t\t\t\ttoaster.pop(\"success\", \"Success\", response.data.status);\n\t\t\t\t})\n\t\t\t\t.catch(response => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", response.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.initHostScan = function() {\n\t\t\tScans.enqueueJob(\"scan-hosts\", [this.path])\n\t\t\t\t.then(response => {\n\t\t\t\t\ttoaster.pop(\"success\", \"Success\", response.data.status);\n\t\t\t\t})\n\t\t\t\t.catch(response => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", response.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.getConfig = function() {\n\t\t\tScans.getConfig()\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.jobs = response.data.jobs;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.scheduleCron = function() {\n\t\t\tScans.scheduleCron({\n\t\t\t\tfreq: this.freq,\n\t\t\t\tfrequnit: this.frequnit,\n\t\t\t\tcommandType: this.commandType,\n\t\t\t\tcommandArgs: this.commandArgs\n\t\t\t})\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.jobs = response.data.jobs;\n\t\t\t\t\ttoaster.pop(\"success\", \"Success\", \"Successfully added job\");\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.removeCron = function(index) {\n\t\t\tScans.removeCron(index)\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.jobs = response.data.jobs;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.pollRunningTasks = function() {\n\t\t\tthis.getTasks(\"running\");\n\t\t\tthis.getTasks(\"all\");\n\t\t\tsetInterval(this.getRunningTasks, 5000);\n\t\t};\n\n\t\tthis.getTasks = function(type) {\n\t\t\tScans.getTasksWithStatus(type)\n\t\t\t\t.then(response => {\n\t\t\t\t\tfor (task of response.data) {\n\t\t\t\t\t\tif (task.status == \"running\") {\n\t\t\t\t\t\t\ttask.type = \"warning\";\n\t\t\t\t\t\t} else if (task.status == \"failed\") {\n\t\t\t\t\t\t\ttask.type = \"danger\";\n\t\t\t\t\t\t} else if (task.status == \"finished\") {\n\t\t\t\t\t\t\ttask.type = \"success\";\n\t\t\t\t\t\t}\n\t\t\t\t\t\ttask.status = task.status[0].toUpperCase() + task.status.substring(1);\n\t\t\t\t\t}\n\t\t\t\t\t$scope.tasks[type] = response.data;\n\t\t\t\t\tconsole.log($scope.tasks[type]);\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.getAllTasks = function() {\n\t\t\tScans.getTasksWithStatus(\"all\")\n\t\t\t\t.then(response => {\n\t\t\t\t\t$scope.allTasks = response.data;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.fetchVulnerability = () => {\n\t\t\tDomain.fetchOne(\"vulns\", $stateParams.vulnId)\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.vuln = response.data;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.loadAll = type => {\n\t\t\tDomain.loadAll(type)\n\t\t\t\t.then(vals => {\n\t\t\t\t\tthis.allValues[type] = vals;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.beginScan = () => {\n\t\t\tScans.launchScan({\n\t\t\t\tgreps: this.filterVals(this.newScan.responseMatches),\n\t\t\t\trequest: this.newScan.request,\n\t\t\t\tfilters: {\n\t\t\t\t\tports: this.filterVals(this.newScan.ports),\n\t\t\t\t\tservices: this.filterVals(this.newScan.services)\n\t\t\t\t}\n\t\t\t})\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.jobs = response.data.jobs;\n\t\t\t\t\ttoaster.pop(\"success\", \"Success\", \"Successfully added scan to queue!\");\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t\ttoaster.pop(\"error\", \"Error\", error.data.error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.previewCount = () => {\n\t\t\tScans.previewCount({\n\t\t\t\tfilters: {\n\t\t\t\t\tports: this.filterVals(this.newScan.ports),\n\t\t\t\t\tservices: this.filterVals(this.newScan.services)\n\t\t\t\t}\n\t\t\t})\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.countPreview = response.data.count;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.filterVals = vals => {\n\t\t\treturn vals.map(val => val.value).filter(val => val);\n\t\t};\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/controllers/ScansController.js?");

/***/ }),

/***/ "./client/js/controllers/SettingsController.js":
/*!*****************************************************!*\
  !*** ./client/js/controllers/SettingsController.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"SettingsController\", []).controller([\n\t\"SettingsController\",\n\tfunction($scope, $state, $stateParams, $window, Integration, NgTableParams, toaster) {\n\t\tthis.loadBDSources = function() {\n\t\t\tIntegration.fetchBDSources()\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.bdsources = response.data.searches;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.importBD = function(id) {\n\t\t\tIntegration.importBDSource(id)\n\t\t\t\t.then(response => {\n\t\t\t\t\ttoaster.pop(\"success\", \"Success\", response.data.status);\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\n\t\tthis.importH1Contents = function() {\n\t\t\tIntegration.importH1Contents(this.h1cookie)\n\t\t\t\t.then(response => {\n\t\t\t\t\tconsole.log(response);\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/controllers/SettingsController.js?");

/***/ }),

/***/ "./client/js/controllers/VulnController.js":
/*!*************************************************!*\
  !*** ./client/js/controllers/VulnController.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"VulnController\", []).controller(\"VulnController\", [\n\t\"$scope\",\n\t\"$state\",\n\t\"$stateParams\",\n\t\"$window\",\n\t\"Domain\",\n\t\"NgTableParams\",\n\tfunction($scope, $state, $stateParams, $window, Domain, NgTableParams) {\n\t\tthis.vuln = {};\n\n\t\tthis.fetch = () => {\n\t\t\tDomain.fetchOne(\"vulns\", $stateParams.id)\n\t\t\t\t.then(response => {\n\t\t\t\t\tthis.vuln = response.data;\n\t\t\t\t})\n\t\t\t\t.catch(error => {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t};\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/controllers/VulnController.js?");

/***/ }),

/***/ "./client/js/services/DomainService.js":
/*!*********************************************!*\
  !*** ./client/js/services/DomainService.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"Domain\", []).service(\"Domain\", [\n  \"$http\",\n  function($http) {\n    this.create = function(domain) {\n      return $http.post(\"/api/domains\", { domain: domain });\n    };\n\n    this.fetch = function(type, queryParams) {\n      return $http.post(\"/api/\" + type + \"/search\", queryParams);\n    };\n\n    this.fetchOne = function(type, id) {\n      return $http.get(\"/api/\" + type + \"/\" + id);\n    };\n\n    this.search = function(searchString) {\n      return $http.get(\"/api/domains/search?q=\" + encodeURIComponent(searchString));\n    };\n\n    this.delete = function(id) {\n      return $http.delete(\"/api/domains/\" + id);\n    };\n\n    // Caches and loads all unique values for a given column\n    this.loadAll = function(type) {\n      var savedState = localStorage.getItem(type);\n      if (savedState) {\n        var vals = JSON.parse(savedState);\n        return new Promise(resolve => resolve(vals));\n      } else {\n        return $http.get(\"/api/values/?type=\" + type).then(response => {\n          if (type == \"ports\") {\n            processed = response.data.sort((a, b) => parseInt(a) - parseInt(b)).map(p => ({ title: p, id: p }));\n          } else {\n            processed = response.data;\n          }\n          localStorage.setItem(type, JSON.stringify(processed));\n          return processed;\n        });\n      }\n    };\n  }\n]);\n\n\n//# sourceURL=webpack:///./client/js/services/DomainService.js?");

/***/ }),

/***/ "./client/js/services/IntegrationService.js":
/*!**************************************************!*\
  !*** ./client/js/services/IntegrationService.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"Integration\", []).service(\"Integration\", [\n\t\"$http\",\n\tfunction($http) {\n\t\tthis.fetchBDSources = function() {\n\t\t\treturn $http.get(\"/api/bd/sources\");\n\t\t};\n\n\t\tthis.importBDSource = function(id) {\n\t\t\treturn $http.post(\"/api/bd/sources/import\", { id: id });\n\t\t};\n\n\t\tthis.importH1Contents = function(cookie) {\n\t\t\treturn $http.post(\"/api/h1/importContents\", { cookie: cookie });\n\t\t};\n\t}\n]);\n\n\n//# sourceURL=webpack:///./client/js/services/IntegrationService.js?");

/***/ }),

/***/ "./client/js/services/ScansService.js":
/*!********************************************!*\
  !*** ./client/js/services/ScansService.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("angular.module(\"Scans\", []).service(\"Scans\", [\n  \"$http\",\n  function($http) {\n    this.fetchLogs = function() {\n      return $http.get(\"/api/scans/logs\");\n    };\n\n    this.fetchAlerts = function() {\n      return $http.get(\"/api/alerts\");\n    };\n\n    this.getConfig = function() {\n      return $http.get(\"/api/scans/configure\");\n    };\n\n    this.getTasksWithStatus = function(status) {\n      return $http.get(\"/api/tasks/\" + status);\n    };\n\n    this.enqueueJob = function(command, args) {\n      return $http.post(\"/api/scans/enqueue\", { command: command, args: args });\n    };\n\n    this.scheduleCron = function(args) {\n      return $http.post(\"/api/scans/configure\", args);\n    };\n\n    this.removeCron = function(index) {\n      return $http.post(\"/api/scans/remove\", { index: index });\n    };\n\n    this.launchScan = function(body) {\n      return $http.post(\"/api/scans/launch\", body);\n    };\n\n    this.previewCount = function(body) {\n      return $http.post(\"/api/scans/launch/preview\", body);\n    };\n  }\n]);\n\n\n//# sourceURL=webpack:///./client/js/services/ScansService.js?");

/***/ })

/******/ });