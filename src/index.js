export  class Property {
	constructor(name, value, activation, activationValue) {
		this.name = name
		this.value = value
		this.activation = activation
		this.activationValue = activationValue
	}

	isActive() {
		var result = false

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

export  class Achieve {
	constructor() {
		this.ACTIVE_IF_GREATER_THAN = '';
		this.ACTIVE_IF_LESS_THAN = '';
		this.ACTIVE_IF_EQUALS_TO = '';
		this.props = {};
		this.achievements = {};
	}

	defineProperty(name, value, activation, activationValue) {
		this.props[name] = new Property()
		this.props[name].createNew(name, value, activation, activationValue)
	}

	defineAchievement(name, props ) {
		this.achievements[name] = new Achievement()
		this.achievements[name].createNew(name, props)
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

	checkAchievements() {
		var results = Array();
		var self = this
		
		// for each achievement
		for (var a in self.achievements) {
			if (self.achievements.hasOwnProperty(a)) {
				var achievement = self.achievements[a]

				// if not unlocked yet continue
				if (!achievement.unlocked)
					var activeProps = 0

					// for each prop in this achievment
					// remember achievement.props are only strings, use the strings to find the props obj on Achieve
					for (var p in achievement.props) {
						if (achievement.props.hasOwnProperty(p)) {
							var property = self.props[achievement.props[p]]

							if (property.isActive()) activeProps++
						}
					}

					// if all props in this achievement are active
					if (activeProps == Object.keys(achievement.props).length) {
						achievement.unlocked = true
						results.push(achievement)
					}
			}
		};
		return achievement
	}
}