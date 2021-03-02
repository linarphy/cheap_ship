class Ship
{
	constructor (game)
	{
		this.hp = CONFIG['game']['ship']['hp'];
		this.speed = CONFIG['game']['ship']['speed'];
		this.poly = CONFIG['game']['ship']['poly'];
		this.position = [0, 0];
		this.cooldown = new Cooldown();
		this.color = [0, 0, 0];
		this.game = game;
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
		let directions=[0, 1];
		for (let direction of directions)
		{
			if (coordinate[direction] < CONFIG['game']['screen']['border'][direction]['min'])
			{
				coordinate[direction] = CONFIG['game']['screen']['border'][direction]['min'];
			}
			else if (coordinate[direction] > CONFIG['game']['screen']['border'][direction]['max']+CONFIG['game']['ship'][direction])
			{
				coordinate[direction] = CONFIG['game']['screen']['border'][direction]['max']+CONFIG['game']['ship'][direction];
			}
		}
		return coordinate;
	}

	move (movement)
	/* Moves the ship as the given movement */
	{
		let coordinate = [movement[0]+this.position[0], movement[1]+this.position[1]];
		coordinate = this.check_coordinate(coordinate);
		this.position = coordinate;
		this.poly = GLOBALS['screen'].to_poly(this.coordinate, GLOBALS['screen'].to_vectors(this.poly));
	}

	shoot ()
	/* Makes the ship shoot */
	{
		this.cooldown.shoot.reset();
		this.game.create_shoot(this.position, [0, CONFIG['game']['shoot']['speed']], CONFIG['game']['shoot']['poly']);
	}

	take_damage (damage)
	/* Makes the ship take damage */
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

	destroy ()
	/* Destroys the ship */
	{
		console.log('boum');
		this.game.is_running = false;
	}
}
