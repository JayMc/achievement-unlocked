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
				activation:'ACTIVE_IF_EQUALS', 
				activationValue:'1'
			}
		])
		a.defineAchievement('Thanks for checking the help guide', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_EQUALS', 
				activationValue:'3'
			}
		])
		a.defineAchievement('You are turning into a real guru now!', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_EQUALS', 
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

	it('should trigger achievement from 2 props', function(){
		a = new Achieve()
		a.defineProperty('readFAQ', 0)
		a.defineProperty('createFAQ', 0)

		a.defineAchievement('You are really starting to use the community FAQ', [
			{
				propName:'readFAQ', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'6'
			},
			{
				propName:'createFAQ', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'3'
			}
		])

		a.checkAchievements().should.be.empty()
		a.addValue('readFAQ', 2)
		a.checkAchievements().should.be.empty()
		a.addValue('readFAQ', 7)
		a.addValue('createFAQ', 2)
		a.checkAchievements().should.be.empty()
		a.addValue('createFAQ', 4)
		a.checkAchievements()[0].name.should.be.equal('You are really starting to use the community FAQ')
	})

	it('should trigger achievement from multiple props', function(){
		a = new Achieve()
		a.defineProperty('selectedWeapon', 0)
		a.defineProperty('killedEnemies', 0)
		a.defineProperty('currentLevel', 0)
		a.defineProperty('secretsFound', 0)
		a.defineProperty('playerHealth', 100)

		a.defineAchievement('You unlocked badass ninja acheivement!!', [
			{
				propName:'selectedWeapon', 
				activation:'ACTIVE_IF_EQUALS', 
				activationValue:'3'
			},
			{
				propName:'killedEnemies', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'23'
			},
			{
				propName:'currentLevel', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'9'
			},
			{
				propName:'secretsFound', 
				activation:'ACTIVE_IF_GREATER_THAN', 
				activationValue:'3'
			},
			{
				propName:'playerHealth', 
				activation:'ACTIVE_IF_LESS_THAN', 
				activationValue:'30'
			}

		])

		a.checkAchievements().should.be.empty()
		a.setValue('selectedWeapon', 2)
		a.setValue('killedEnemies', 15)
		a.setValue('currentLevel', 5)
		a.setValue('secretsFound', 1)
		a.setValue('playerHealth', 80)
		a.checkAchievements()
		a.checkAchievements().should.be.empty()
		a.setValue('selectedWeapon', 3)
		a.setValue('killedEnemies', 24)
		a.setValue('currentLevel', 8)
		a.setValue('secretsFound', 2)
		a.setValue('playerHealth', 50)
		a.checkAchievements()
		a.getAchievements()[0].progress.should.be.equal(40)
		a.checkAchievements().should.be.empty()
		a.setValue('currentLevel', 10)
		a.setValue('secretsFound', 4)
		a.setValue('playerHealth', 20)
		a.checkAchievements()[0].name.should.be.equal('You unlocked badass ninja acheivement!!')
	})

	it('should detect different activation methods', function(){
		a = new Achieve()
		a.defineProperty('playerHealth', 50)
		a.defineAchievement('weird acheivement', [
			{
				propName:'playerHealth', 
				activation:'ACTIVE_IF_DIVISABLE_OF', 
				activationValue:'3'
			},
			{
				propName:'playerHealth', 
				activation:'ACTIVE_IF_EVEN', 
				activationValue:''
			}
		])
		a.checkAchievements().should.be.empty()
		a.addValue('playerHealth', 1)
		a.checkAchievements().should.be.empty()
		a.addValue('playerHealth', 4)
		a.checkAchievements().should.be.empty()
		a.subtractValue('playerHealth', 1)
		a.checkAchievements()[0].name.should.be.equal('weird acheivement')
	})

	it('should show locked and unlocked achievements', function(){
		a = new Achieve()
		a.defineProperty('money', 100)
		a.defineAchievement('Double yo money', [
			{
				propName:'money', 
				activation:'ACTIVE_IF_EQUALS', 
				activationValue:'200'
			}
		])
		a.subtractValue('money', 99)
		a.checkAchievements()
		a.checkAchievements()
		a.getAchievements('locked').should.be.not.empty()
		a.getAchievements('unlocked').should.be.empty()
		a.setValue('money', 200)
		a.checkAchievements()
		a.getAchievements('locked').should.be.empty()
		a.getAchievements('unlocked').should.be.not.empty()
		a.getAchievements().should.be.not.empty()

	})

})
