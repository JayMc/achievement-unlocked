var Property = require('../lib/index.js').Property
var Achieve = require('../lib/index.js').Achieve
var should = require('should')

describe('achievement', function(){
	it('should create a property', function(){
		var p = new Property('skiing', 5, 'ACTIVE_IF_GREATER_THAN', '5')
		console.log(p.name)
	})
})

it('should create Achieve', function(){
		a = new Achieve()

		// shouldn't have any props or achievements
		Object.keys(a.props).length.should.be.equal(0)
		Object.keys(a.achievements).length.should.be.equal(0)

		a.props.should.be.an.Object()
		a.achievements.should.be.an.Object()
	})