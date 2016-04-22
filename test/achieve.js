var Achieve = require('../lib/index.js').Achieve
var should = require('should')

describe('achievement', function(){
	it('should create and detect an Achievement', function(){
		// initialise
		a = new Achieve()
		// set a property
		a.defineProperty('documentsCreated', 0)
		// set an achievment utilising the property
		a.defineAchievement('Created 10 docs!', [
			{
				propName:'documentsCreated', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'10'
			}
		])
		// check if an acheivement has been triggered
		a.checkAchievements().should.be.empty()
		// modify the property
		a.setValue('documentsCreated', 11)
		// check again if an acheivement has been triggered
		a.checkAchievements().should.be.not.empty()

	})

	it('should trigger more achievements by modifying the same property', function(){
		a = new Achieve()
		a.defineProperty('readFAQ', 0)
		a.defineAchievement('You discovered our help resouce', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_EQUALS_TO', 
				activationValue:'1'
			}
		])
		a.defineAchievement('Thanks for checking the help guide', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_EQUALS_TO', 
				activationValue:'3'
			}
		])
		a.defineAchievement('You are turning into a real guru now!', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_EQUALS_TO', 
				activationValue:'6'
			}
		])

		// we keep incrementing the same prop which triggers different achievements
		a.checkAchievements().should.be.empty()
		a.addValue('readFAQ', 1)
		a.checkAchievements()[0].name.should.be.equal('You discovered our help resouce')
		a.addValue('readFAQ', 2)
		a.checkAchievements()[0].name.should.be.equal('Thanks for checking the help guide')
		a.addValue('readFAQ', 3)
		a.checkAchievements()[0].name.should.be.equal('You are turning into a real guru now!')

	})

})
