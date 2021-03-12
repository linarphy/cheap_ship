class Shoot
{
	constructor (game, position, speed, poly)
	{
		if (!check_type(game, 'object'))
		{
			throw LANG['error']['game']['shoot']['game_type'];
		}
		if (!check_type(position, 'array', [2], true))
		{
			throw LANG['error']['game']['shoot']['position_type'];
		}
		if (!check_type(speed, 'array', [2], true))
		{
			throw LANG['error']['game']['shoot']['speed_type'];
		}
		if (!check_type(poly, 'array', ['.', 2], true))
		{
			throw LANG['error']['game']['shoot']['poly_type'];
		}
		if (!check_type(GLOBALS['color']['shoot']['main'], 'array', [3], true))
		{
			throw 'color has an unexpected type or value';
		}
		this.game = game;
		this.position = position;
		this.speed = speed;
		this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(poly));
		this.color = GLOBALS['color']['shoot']['main'];
		this.is_destroyed = false;
		this.draw();
	}

	draw ()
	/* Draw the shoot */
	{
		GLOBALS['screen'].draw_poly(this.poly, this.color);
	}

	check_coordinate (coordinate)
	/* Checks if the shoot is drawable, destroy it if not */
	{
		if (!check_type(coordinate, 'array', [2], true))
		{
			throw LANG['error']['game']['shoot']['check_coordinate']['coordinate_type'];
		}
		let directions=[0, 1];
		for (let direction of directions)
		{
			if (coordinate[direction] < CONFIG['game']['border'][direction]['min'])
			{
				this.is_destroyed = true;
			}
			else if (coordinate[direction] > CONFIG['game']['border'][direction]['max'])
			{
				this.is_destroyed = true;
			}
		}
		return coordinate;
	}'coordinate has an unexpected type or value';

	move ()
	/* Moves the shoot to its new position */
	{
		let coordinate=[this.speed[0]+this.position[0], this.speed[1]+this.position[1]];
		this.check_coordinate(coordinate);
		if (this.is_destroyed)
		{
			this.game.shoots.splice(this.game.shoots.indexOf(this), 1);
		}
		else
		{
			this.position = coordinate;
			this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(this.poly));
		}
	}

	check_collision()
	/* Checks if the ship collide with this shoot */
	{
		if (GLOBALS['screen'].check_collision(this.game.ship.poly, this.poly))
		{
			this.game.ship.take_damage(CONFIG['game']['shoot']['damage']);
			this.is_destroyed = true;
			return true;
		}
		return false;
	}
}
