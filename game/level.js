class Level
{
	constructor (game, file=CONFIG['game']['level'][0], id=0)
	{
		if (!check_type(game, 'object'))
		{
			throw 'game has an unexpected type or value';
		}
		if (!check_type(file, 'string', ['.']))
		{
			throw 'level file has an unexpected type or value';
		}
		if (!check_type(id, 'number', [], true))
		{
			throw 'level id has an unexpected type or value';
		}
		document.getElementById('level').textContent = 'LEVEL: '+this.id;
		this.game = game;
		this.file = file;
		this.id = id;
		this.ready = false;
		this.launch();
	}

	async launch ()
	{
		let level_data = await get_json(this.file, data => data);
		if (!check_type(level_data, 'object'))
		{
			throw 'level_data has an unexpected type or value';
		}
		for (let enemy of level_data['enemies'])
		{
			this.game.enemies.push(new Enemy(this.game, enemy['position'], enemy['speed'], enemy['hp'], enemy['pattern'], enemy['poly']));
		}
		this.ready = true;
	}

	async manage ()
	{
		if (this.game.enemies.length < 1 && this.ready)
		{
			if (this.id < CONFIG['game']['level'].length - 1)
			{
				this.game.level = new Level(this.game, CONFIG['game']['level'][this.id + 1], this.id + 1);
			}
			else
			{
				console.log('win');
				this.game.is_running = false;
			}
		}
	}
}
