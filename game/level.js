class Level
{
	constructor (game, file=CONFIG['game']['level'][0], id=0)
	{
		this.game = game;
		this.file = file;
		this.id = id;
		this.launch();
	}

	launch ()
	{
		let level_data = get_json(this.file, () => {});
		this.game.enemies = level_data['enemies'];
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
