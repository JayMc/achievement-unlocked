var property = require('../lib/index.js').Property
var achieve = require('../lib/index.js').Achieve
var should = require('should')

describe('achievement', function(){
	it('should create a property', function(){
		var p = new property('skiing', 5, 'ACTIVE_IF_GREATER_THAN', '5')
		console.log(p.name)
	})
})