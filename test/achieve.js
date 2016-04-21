var Achieve = require('../lib/index.js').Achieve
var should = require('should')

describe('achievement', function(){
	it('should create a property', function(){
		a = new Achieve()
		Object.keys(a.props).length.should.be.equal(0)
		a.defineProperty('documentsCreated10', 0, 'ACTIVE_IF_GREATER_THAN', 10)
		Object.keys(a.props).length.should.be.equal(1)
	})

	it('should create more properties', function(){
		a.defineProperty('documentsCreated5', 0, 'ACTIVE_IF_GREATER_THAN', 5)
	})
	
	it('should create Achievement', function(){
		Object.keys(a.achievements).length.should.be.equal(0)
		a.defineAchievement('Created 10 docs!', ['documentsCreated10'])
		Object.keys(a.achievements).length.should.be.equal(1)
	})

	it('should create more Achievements', function(){
		a.defineAchievement('Created 5 docs!', ['documentsCreated5'])
	})

	it('should trigger achievement', function(){
		a.setValue('documentsCreated10', 11)
		a.setValue('documentsCreated5', 6)
	})
})
