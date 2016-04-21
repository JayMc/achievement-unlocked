var Achieve = require('../lib/index.js').Achieve
var should = require('should')

describe('achievement', function(){
	it('should create Achievement', function(){
		a = new Achieve()
		a.defineProperty('documentsCreated', 0)
		a.defineAchievement('Created 10 docs!', [
			{
				propName:'documentsCreated', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'10'
			}
			,{
				propName:'documentsCreated', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'5'
			}
		])

		a.checkAchievements().should.be.empty()
		a.checkAchievements().should.be.empty()
		a.setValue('documentsCreated', 6)
		a.checkAchievements().should.be.empty()
		a.setValue('documentsCreated', 11)
		a.checkAchievements().should.be.not.empty()

	})
})
