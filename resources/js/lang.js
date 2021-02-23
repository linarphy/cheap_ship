async function get_json(path, callback) {
	return callback(await fetch(path).then(response => response.json()));
}

if (CONFIG['lang_available'].indexOf(CONFIG['user']['lang']) !== -1) // The langage is available
{
	get_json('../locale/'+CONFIG['user']['lang']+'.json', lang => LANG=lang);
}
else
{
	get_json('../locale/en.json', lang => LANG=lang);
}
