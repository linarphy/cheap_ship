class Ship
{
	constructor (game)
	{
		if (!check_type(game, 'object'))
		{
			throw LANG['error']['game']['ship']['game_type'];
		}
		if (!check_type(CONFIG['game']['ship']['hp'], 'number',  [], true))
		{
			throw LANG['error']['game']['ship']['hp_type'];
		}
		if (!check_type(CONFIG['game']['ship']['speed'], 'array', [2], true))
		{
			throw LANG['error']['game']['ship']['speed_type'];
		}
		if (!check_type(CONFIG['game']['ship']['poly'], 'array', ['.', 2], true))
		{
			throw LANG['error']['game']['ship']['poly_type'];
		}
		if (!check_type(GLOBALS['color']['ship']['main'], 'array', [3], true))
		{
			throw LANG['error']['game']['ship']['color_type'];
		}
		this.hp = CONFIG['game']['ship']['hp'];
		this.speed = CONFIG['game']['ship']['speed'];
		this.position = [0, 0];
		this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(CONFIG['game']['ship']['poly']));
		this.cooldown = new Cooldown(game);
		this.color = GLOBALS['color']['ship']['main'];
		this.game = game;
		this.draw();
	}

	draw ()
	/* Draw the ship in the present position */
	{
		if (this.cooldown.invincible.active)
		{
			if (this.cooldown.invincible.time%3 === 0) // The ship is invincible: it is blinking
			{
				console.log(this.cooldown.invincible.time);
				return 0;
			}
		}
		GLOBALS['screen'].draw_poly(this.poly, 'rgb('+this.color[0]+','+this.color[1]+','+this.color[2]+')');
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
			throw LANG['error']['game']['ship']['check_coordinate']['coordinate_type'];
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
			throw LANG['error']['game']['ship']['move']['movement_type'];
		}
	}

	shoot ()
	/* Makes the ship shoot */
	{
		this.cooldown.shoot.reset();
		this.game.create_shoot(this.position, [0, CONFIG['game']['shoot']['speed'][0]], CONFIG['game']['shoot']['poly']);
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
			throw LANG['error']['game']['ship']['take_damage']['damage_type'];
		}
	}

	destroy ()
	/* Destroys the ship */
	{
		GLOBALS['screen'].write(LANG['game']['loose'], 'middle', GLOBALS['color']['string']['loose']);
		this.game.is_running = false;
		this.game.is_ended = true;
	}
}
