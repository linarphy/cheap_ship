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

CONFIG.__get('game').__get('screen')['height']=500;
CONFIG.__get('game').__get('screen')['width']=300;

