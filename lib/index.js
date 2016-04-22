'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Property = (function () {
	function Property(name, value) {
		_classCallCheck(this, Property);

		this.name = name;
		this.value = value;
	}

	_createClass(Property, [{
		key: 'isActive',
		value: function isActive(activation, target) {
			var result = false;

			switch (activation) {
				case 'ACTIVE_IF_GREATER_THAN':
					if (this.value > target) result = true;
					break;
				case 'ACTIVE_IF_EQUALS_TO_OR_GREATER_THAN':
					if (this.value >= target) result = true;
					break;
				case 'ACTIVE_IF_LESS_THAN':
					if (this.value < target) result = true;
					break;
				case 'ACTIVE_IF_EQUALS_TO_OR_LESS_THAN':
					if (this.value <= target) result = true;
					break;
				case 'ACTIVE_IF_EQUALS_TO':
					if (this.value == target) result = true;
					break;
				case 'ACTIVE_IF_DIVISABLE_OF':
					if (this.value % target == 0) result = true;
					break;
				case 'ACTIVE_IF_ODD':
					if (this.value % 2 != 0) result = true;
					break;
				case 'ACTIVE_IF_EVEN':
					if (this.value % 2 == 0) result = true;
					break;
				default:
					result = false;
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
		this.achievements = [];
	}

	_createClass(Achieve, [{
		key: 'defineProperty',
		value: function defineProperty(name, value) {
			this.props[name] = new Property(name, value);
		}

		// props is an object
	}, {
		key: 'defineAchievement',
		value: function defineAchievement(name, props) {
			// props contains: name, activation, activationValue
			this.achievements[name] = new Achievement(name, props);
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
		key: 'getUnlockedAchievements',
		value: function getUnlockedAchievements() {
			var results = [];
			var self = this;

			for (var a in self.achievements) {
				if (self.achievements.hasOwnProperty(a)) {
					var achievement = self.achievements[a];
					if (achievement.unlocked) results.push(achievement);
				}
			}
			return results;
		}
	}, {
		key: 'checkAchievements',
		value: function checkAchievements() {
			var results = Array();
			var self = this;

			for (var a in self.achievements) {
				if (self.achievements.hasOwnProperty(a)) {
					var achievement = self.achievements[a];
					if (achievement.props.length > 0) {
						var activeProps = 0;
						for (var i = 0; i < achievement.props.length; i++) {
							var p = achievement.props[i];
							if (self.props[achievement.props[i].propName].isActive(p.activation, p.activationValue)) activeProps++;
						};

						if (activeProps == achievement.props.length) self.achievements[a].unlocked = true;else self.achievements[a].unlocked = false;
					}
				}
			}
			return self.getUnlockedAchievements();
		}
	}]);

	return Achieve;
})();

exports.Achieve = Achieve;