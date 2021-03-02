class Level
{
	constructor (game, file=CONFIG['game']['level'][0], id=0)
	{
		this.game = game;
		this.file = file;
		this.id = id;
		this.launch();
	}

	async launch ()
	{
		let level_data = await get_json(this.file, data => data);
		for (let enemy of level_data['enemies'])
		{
			this.game.enemies.push(new Enemy(this.game, enemy['position'], enemy['speed'], enemy['hp'], ennemy['pattern'], enemy['poly']));
		}
	}

	manage ()
	{
		if (this.game.enemies.length < 1)
		{
			this.change_level()
			{
				this.game.level = new Level(this.game, CONFIG['game']['level'][this.is + 1], this.id);
			}
		}
	}
}
