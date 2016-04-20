'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Property = function Property(name, value, activation, activationValue) {
	_classCallCheck(this, Property);

	this.name = name;
	this.value = value;
	this.activation = activation;
	this.activationValue = activationValue;
};

exports.Property = Property;

var Achieve = function Achieve() {
	_classCallCheck(this, Achieve);

	this.ACTIVE_IF_GREATER_THAN = '';
	this.ACTIVE_IF_LESS_THAN = '';
	this.ACTIVE_IF_EQUALS_TO = '';
	this.props = {};
	this.achievements = {};
};

exports.Achieve = Achieve;