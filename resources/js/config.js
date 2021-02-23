var CONFIG={
	__get: function(key)
	{
		if (this[key] === undefined)
		{
			this[key] = {
				__get: arguments.callee,
			};
		}
		return this[key];
	}
};

CONFIG['lang_available']=['en'];
/* [USER] */
/* User langage */
CONFIG.__get('user')['lang']='en';
/* [/USER] */
/* [GAME] */
/* [SCREEN] */
/* Height of the screen of the game in pixel */
CONFIG.__get('game').__get('screen')['height']=500;
/* Width of the screen of the game in pixel */
CONFIG.__get('game').__get('screen')['width']=300;
/* [/SCREEN] */
/* [/GAME] */

