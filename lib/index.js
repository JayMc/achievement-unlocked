'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Property = (function () {
	function Property(name, value, activation, activationValue) {
		_classCallCheck(this, Property);

		this.name = name;
		this.value = value;
		this.activation = activation;
		this.activationValue = activationValue;
	}

	_createClass(Property, [{
		key: 'isActive',
		value: function isActive() {
			var result = false;

			switch (this.activation) {
				case 'ACTIVE_IF_GREATER_THAN':
					if (this.value > this.activationValue) result = true;
					break;
				case 'ACTIVE_IF_LESS_THAN':
					if (this.value < this.activationValue) result = true;
					break;
				case 'ACTIVE_IF_EQUALS_TO':
					if (this.value == this.activationValue) result = true;
					break;
			}
			return result;
		}
	}]);

	return Property;
})();

exports.Property = Property;

var Achievement = function Achievement(name, props) {
	_classCallCheck(this, Achievement);

	this.name = name;
	this.props = props;
	this.unlocked = false;
};

exports.Achievement = Achievement;

var Achieve = (function () {
	function Achieve() {
		_classCallCheck(this, Achieve);

		this.ACTIVE_IF_GREATER_THAN = '';
		this.ACTIVE_IF_LESS_THAN = '';
		this.ACTIVE_IF_EQUALS_TO = '';
		this.props = {};
		this.achievements = {};
	}

	_createClass(Achieve, [{
		key: 'defineProperty',
		value: function defineProperty(name, value, activation, activationValue) {
			this.props[name] = new Property();
			this.props[name].createNew(name, value, activation, activationValue);
			// var newProp = new Property()
			// newProp.createNew(name, value, activation, activationValue)
			// this.props.push(newProp)
		}
	}, {
		key: 'defineAchievement',
		value: function defineAchievement(name, props) {
			this.achievements[name] = new Achievement();
			this.achievements[name].createNew(name, props);
			// var newAchievement = new Achievement()
			// newAchievement.createNew(name, props)
			// this.achievements.push(newAchievement)
		}
	}, {
		key: 'getValue',
		value: function getValue(propName) {
			return this.props[propName].value;
		}
	}, {
		key: 'setValue',
		value: function setValue(propName, value) {
			this.props[propName].value = value;
		}
	}, {
		key: 'addValue',
		value: function addValue(propName, value) {
			this.setValue(propName, this.props[propName].value + value);
		}
	}, {
		key: 'checkAchievements',
		value: function checkAchievements() {
			var results = Array();
			var self = this;

			// for each achievement
			for (var a in self.achievements) {
				if (self.achievements.hasOwnProperty(a)) {
					var achievement = self.achievements[a];

					// if not unlocked yet continue
					if (!achievement.unlocked) var activeProps = 0;

					// for each prop in this achievment
					// remember achievement.props are only strings, use the strings to find the props obj on Achieve
					for (var p in achievement.props) {
						if (achievement.props.hasOwnProperty(p)) {
							var property = self.props[achievement.props[p]];

							if (property.isActive()) activeProps++;
						}
					}

					// if all props in this achievement are active
					if (activeProps == Object.keys(achievement.props).length) {
						achievement.unlocked = true;
						results.push(achievement);
					}
				}
			};
			return achievement;
		}
	}]);

	return Achieve;
})();

exports.Achieve = Achieve;