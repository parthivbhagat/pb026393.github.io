'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _observations = require('./observations');

var _observations2 = _interopRequireDefault(_observations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*jshint esversion: 6 */


var Patient = function Patient() {
  _classCallCheck(this, Patient);

  this.fname = '';
  this.lname = '';
  this.gender = '';
  this.birthday = '';
  this.age = '';
  this.obv = new _observations2.default();
};

exports.default = Patient;