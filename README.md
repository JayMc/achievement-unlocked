<p align="center">
	<img height="200" width="200" src="https://cloud.githubusercontent.com/assets/1852458/14706511/64650a58-0802-11e6-861d-f98a87f619c0.png">
</p>

# achievement-unlocked
Achievement detection - not just for games..

## get going
```
var achieve = require('../lib/index.js').Achieve
achieve.defineProperty('user_logins', 0)
achieve.defineAchievement('Created 10 docs!', [
	{
		propName:'documentsCreated', 
		activation:'ACTIVE_IF_EQUALS_OR_GREATER_THAN', 
		activationValue:'10'
	}
])
achieve.setValue('user_logins', 10)
achieve.checkAchievements()

```

## advanced uses
You can combine multiple properties to define an achievement, only when all properties are active will the achievement be active.
```
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
```
More examples in tests

## reuse existing properties
```
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
a.addValue('readFAQ', 1)
a.addValue('readFAQ', 2)
a.addValue('readFAQ', 3)
```

## testing
```
npm run test
```

## compile source
```
npm run compile
```

## Attribution
* Inspired by [Fernando Bevilacqua](http://gamedevelopment.tutsplus.com/tutorials/how-to-code-unlockable-achievements-for-your-game-a-simple-approach--gamedev-6012)
* Logo by [Holvonix LLC](https://thenounproject.com/holvonix/collection/achievement-levels/?oq=achievement&cidx=0&i=362126)