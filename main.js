var GLOBALS = {
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

GLOBALS.__get('core')['scripts']=['main.js'];

async function include(src, strict=true)
{
	try
	{
		if (GLOBALS['core']['scripts'].indexOf(src)===-1) // The file is not already loaded
		{
			// Construction of the script element
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', src);

			GLOBALS['core']['scripts'].push(src); // The script is now considered as loaded

			document.getElementsByTagName('head')[0].appendChild(script); // The script is now added to the HTML

			let script_loaded = new Promise(function(resolve, reject)
				{
					if (script !== undefined) // no issue
					{
						script.addEventListener('load', () => { // Wait the file is loaded
							resolve(0);
						});
					}
					else // error
					{
						reject('Cannot load this script');
					}
				});
			return script_loaded.then(function(value)
				{
					return value;
				}, function(error)
				{
					throw error;
				});
		}
		else
		{
			if (strict)
			{
				throw 'the file seems to be already loaded';
			}
		}
	}
	catch (error)
	{
		console.log(error);
		return -1;
	}
};

async function init()
{
	await include('./resources/js/config.js');
	await include('./resources/js/style.js');
};

init();
