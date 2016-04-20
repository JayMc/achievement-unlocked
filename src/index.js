export  class Property {
	constructor(name, value, activation, activationValue) {
		this.name = name
		this.value = value
		this.activation = activation
		this.activationValue = activationValue
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
}