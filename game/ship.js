class Ship
{
	constructor (game)
	{
		if (!check_type(game, 'object'))
		{
			throw 'unexpected type for game';
		}
		if (!check_type(CONFIG['game']['ship']['hp'], 'number',  [], true))
		{
			throw 'unexpected type of default ship hp';
		}
		if (!check_type(CONFIG['game']['ship']['speed'], 'array', [2], true))
		{
			throw 'unexpected type of default ship speed';
		}
		if (!check_type(CONFIG['game']['ship']['poly'], 'array', ['.', 2], true))
		{
			throw 'unexpected type of default poly ship';
		}
		this.hp = CONFIG['game']['ship']['hp'];
		this.speed = CONFIG['game']['ship']['speed'];
		this.position = [0, 0];
		this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(CONFIG['game']['ship']['poly']));
		this.cooldown = new Cooldown();
		this.color = [0, 0, 0];
		this.game = game;
		this.draw();
	}

	draw ()
	/* Draw the ship in the present position */
	{
		if (this.cooldown.invincible.active)
		{
			if (this.cooldown.invincible.time%2 === 0) // The ship is invicible: it is blinking
			{
				return 0;
			}
		}
		GLOBALS['screen'].draw_poly(this.poly);
	}

	check_coordinate (coordinate)
	/* Check if the given coordinate is drawable and make it drawable if not */
	{
		if (check_type(coordinate, 'array', [2], true))
		{
			let directions=[0, 1];
			for (let direction of directions)
			{
				if (coordinate[direction] < CONFIG['game']['border'][direction]['min'])
				{
					coordinate[direction] = CONFIG['game']['border'][direction]['min'];
				}
				else if (coordinate[direction] > CONFIG['game']['border'][direction]['max'])
				{
					coordinate[direction] = CONFIG['game']['border'][direction]['max'];
				}
			}
			return coordinate;
		}
		else
		{
			throw 'coordinate has an unexpected type or value';
		}
	}

	move (movement)
	/* Moves the ship as the given movement */
	{
		if (check_type(movement, 'array', [2], true))
		{
			let coordinate = [movement[0]+this.position[0], movement[1]+this.position[1]];
			coordinate = this.check_coordinate(coordinate);
			this.position = coordinate;
			this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(this.poly));
		}
		else
		{
			throw 'movement has an unexpected type or value';
		}
	}

	shoot ()
	/* Makes the ship shoot */
	{
		this.cooldown.shoot.reset();
		this.game.create_shoot([this.position[0]-25, this.position[1]+25], [0, CONFIG['game']['shoot']['speed'][0]], CONFIG['game']['shoot']['poly']);
	}

	take_damage (damage)
	/* Makes the ship take damage */
	{
		if (check_type(damage, 'number'), [], true)
		{
			if (!this.cooldown.invincible.active)
			{
				this.hp -= damage;
				if (this.hp < 1)
				{
					this.destroy();
				}
				this.cooldown.invincible.reset();
			}
		}
		else
		{
			throw 'damage has an unexpected type or value';
		}
	}

	destroy ()
	/* Destroys the ship */
	{
		console.log('boum');
		this.game.is_running = false;
	}
}
