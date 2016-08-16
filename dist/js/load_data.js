/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// This is the entry point for webpack to distribute assets
	
	// Require all JS and output as a single js bundle.
	// Note, we are requiring the es5 js.
	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _load_data = __webpack_require__(3);
	
	var _load_data2 = _interopRequireDefault(_load_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.LoadData = _load_data2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion: 6 */
	
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _patient = __webpack_require__(5);
	
	var _patient2 = _interopRequireDefault(_patient);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LoadData = function () {
	  function LoadData() {
	    _classCallCheck(this, LoadData);
	  }
	
	  _createClass(LoadData, null, [{
	    key: 'extractData',
	    value: function extractData() {
	
	      var ret = $.Deferred();
	
	      function onError() {
	        console.log('Loading error', arguments);
	        ret.reject();
	      }
	
	      function onReady(smart) {
	        if (smart.hasOwnProperty('patient')) {
	          var patient = smart.patient;
	          var pt = patient.read();
	          var obv = smart.patient.api.fetchAll({ type: 'Observation', query: { code: { $or: ['8302-2'] } } });
	
	          $.when(pt, obv).fail(onError);
	
	          $.when(pt, obv).done(function (patient, obv) {
	            var byCodes = smart.byCodes(obv, 'code');
	            var gender = patient.gender;
	            var dob = new Date(patient.birthDate);
	            var day = dob.getDate();
	            var monthIndex = dob.getMonth() + 1;
	            var year = dob.getFullYear();
	
	            var dobStr = monthIndex + '/' + day + '/' + year;
	
	            var fname = patient.name[0].given.join(' ');
	            var lname = patient.name[0].family.join(' ');
	
	            var height = byCodes('8302-2');
	
	            var p = new _patient2.default();
	            p.birthday = dobStr;
	            p.gender = gender;
	            p.fname = fname;
	            p.lname = lname;
	            p.age = parseInt(_util2.default.calculateAge(dob));
	
	            if (typeof height[0] !== 'undefined') {
	              p.height = height[0].valueQuantity.value;
	            }
	
	            ret.resolve(p);
	          });
	        } else {
	          onError();
	        }
	      }
	
	      FHIR.oauth2.ready(onReady, onError);
	
	      return ret.promise();
	    }
	  }]);
	
	  return LoadData;
	}();
	
	exports.default = LoadData;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*jshint esversion: 6 */
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }
	
	  _createClass(Util, null, [{
	    key: "isLeapYear",
	    value: function isLeapYear(year) {
	      return new Date(year, 1, 29).getMonth() === 1;
	    }
	  }, {
	    key: "calculateAge",
	    value: function calculateAge(date) {
	      var d = new Date(date),
	          now = new Date();
	      var years = now.getFullYear() - d.getFullYear();
	      d.setFullYear(d.getFullYear() + years);
	      if (d > now) {
	        years--;
	        d.setFullYear(d.getFullYear() - 1);
	      }
	      var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
	      return years + days / (this.isLeapYear(now.getFullYear()) ? 366 : 365);
	    }
	  }]);
	
	  return Util;
	}();
	
	exports.default = Util;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/*jshint esversion: 6 */
	var Patient = function Patient() {
	  _classCallCheck(this, Patient);
	
	  this.fname = '';
	  this.lname = '';
	  this.gender = '';
	  this.birthday = '';
	  this.age = '';
	  this.height = '';
	};
	
	exports.default = Patient;

/***/ }
/******/ ]);
//# sourceMappingURL=load_data.js.map