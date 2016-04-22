export class Property {
	constructor(name, value) {
		this.name = name
		this.value = value
	}

	isActive(activation, target) {
		var result = false

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
				if (this.value % target == 0 ) result = true;
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
		return result
	}
}

export class Achievement {
	constructor(name, props) {
		this.name = name
		this.props = props
		this.unlocked = false
	}
}

export class Achieve {
	constructor() {
		this.ACTIVE_IF_GREATER_THAN = '';
		this.ACTIVE_IF_LESS_THAN = '';
		this.ACTIVE_IF_EQUALS_TO = '';
		this.props = {};
		this.achievements = [];
	}

	defineProperty(name, value) {
		this.props[name] = new Property(name, value)
	}

	// props is an object
	defineAchievement(name, props) {
		// props contains: name, activation, activationValue
		this.achievements[name] = new Achievement(name, props)
	}

	getValue(propName) {
		return this.props[propName].value
	}

	setValue(propName, value) {
		this.props[propName].value = value
	}

	addValue(propName, value) {
		this.setValue(propName, this.props[propName].value + value)
	}

	getUnlockedAchievements() {
		var results = []
		var self = this

		for (var a in self.achievements) {
			if (self.achievements.hasOwnProperty(a)) {
				var achievement = self.achievements[a]
				if (achievement.unlocked) results.push(achievement)
			}
		}
		return results
	}

	checkAchievements() {
		var results = Array();
		var self = this		

		for (var a in self.achievements) {
			if (self.achievements.hasOwnProperty(a)) {
				var achievement = self.achievements[a]
				if (achievement.props.length > 0) {
					var activeProps = 0
					for (var i = 0; i < achievement.props.length; i++) {
						var p = achievement.props[i]
						if (self.props[achievement.props[i].propName].isActive(p.activation, p.activationValue)) activeProps++
					};

					if (activeProps == achievement.props.length) self.achievements[a].unlocked = true
					else self.achievements[a].unlocked = false
				}
			}
		}
		return self.getUnlockedAchievements()
	}
}