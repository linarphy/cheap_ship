class Shoot
{
	constructor (game, position, speed, poly)
	{
		this.game = game;
		this.position = position;
		this.speed = speed;
		this.poly = poly;
		this.is_destroyed = false;
	}

	draw ()
	/* Draw the shoot */
	{
		GLOBALS['screen'].draw_poly(this.poly);
	}

	check_coordinate (coordinate)
	/* Checks if the shoot is drawable, destroy it if not */
	{
		let directions=[0, 1];
		for (let direction of directions)
		{
			if (coordinate[direction] < CONFIG['game']['border'][direction]['min'])
			{
				this.is_destroyed = true;
			}
			else if (coordinate[direction] > CONFIG['game']['border'][direction]['max']+this.size[direction])
			{
				this.is_destroyed = true;
			}
		}
	}

	move ()
	/* Moves the shoot to its new position */
	{
		coordinate=[this.speed[0]+this.position[0], this.speed[1]+this.position[1]];
		this.check_coordinate(coordinate);
		if (this.is_destroyed)
		{
			this.game.shoots.splice(this.game.shoots.indexOf(this), 1);
		}
		else
		{
			this.position = coordinate;
			this.poly = GLOBALS['screen'].to_poly(this.coordinate, GLOBALS['screen'].to_vectors(this.poly));
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
