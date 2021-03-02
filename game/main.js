async function load()
{
	await include('./game/cooldown.js');
	await include('./game/ship.js');
	await include('./game/shoot.js');
	await include('./game/enemy.js');
	await include('./game/level.js');
};

class Game
{
	constructor ()
	{
		this.shoots = [];
		this.enemies = [];
		this.is_running = false;
		this.ship = new Ship(this);
		this.level = new Level(this);
	}

	run ()
	/* Run the game */
	{
		this.is_running=true;
		this.loop();
	}

	async loop ()
	/* Main loop of the game */
	{
		GLOBALS['screen'].clear();
		for (let key in CONFIG['game']['shortcut'])
		{
			if (!check_type(key, 'string', ['.']))
			{
				throw 'error: some keys are not string as they must be';
			}
		}
		if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['pause']]) // Pause the game when p is pressed
		{
			console.log('a');
			this.is_running = false;
		}

		if (!this.is_running)
		{
			return 0;
		}

		/* Level logic */
		await this.level.manage();

		/* Movement Logic */
		let movement = [0, 0]
		if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['left']])
		{
			movement[0] -= this.ship.speed[0];
		}
		else if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['right']])
		{
			movement[0] += this.ship.speed[0];
		}
		if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['down']])
		{
			movement[1] -= this.ship.speed[1];
		}
		else if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['up']])
		{
			movement[1] += this.ship.speed[1];
		}
		if (movement[0] !== 0 || movement[1] !== 0)
		{
			this.ship.move(movement);
		}

		/* User shoot logic */
		if (GLOBALS['keys_pressed'][CONFIG['game']['shortcut']['shoot']]) // Shoot when pressing spacebar
		{
			if (!this.ship.cooldown.shoot.active)
			{
				this.ship.shoot();
			}
		}

		/* User cooldown logic */
		this.ship.cooldown.manage();

		/* Shoots logic */
		for (let shoot of this.shoots)
		{
			shoot.move();
			shoot.check_collision();
		}

		/* Enemies logic */
		for (let enemy of this.enemies)
		{
			enemy.move();
			enemy.check_collision();
		}

		/* Draws */
		for (let enemy of this.enemies)
		{
			enemy.draw();
		}
		for (let shoot of this.shoots)
		{
			shoot.draw();
		}
		this.ship.draw();

		window.requestAnimationFrame(() => {
			this.loop();
		});
	}

	create_shoot (position, speed, poly)
	{
		let shoot = new Shoot(this, position, speed, poly);
		this.shoots.push(shoot);
	}
}
