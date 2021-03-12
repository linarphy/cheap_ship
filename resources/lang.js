async function load_lang ()
{
	if (CONFIG['lang_available'].indexOf(CONFIG['user']['lang']) !== -1) // The langage is available
	{
		return await get_json('./locale/'+CONFIG['user']['lang']+'.json', lang => lang['lang']);
	}
	else
	{
		return await get_json('./locale/en.json', lang => lang['lang']);
	}
}
