class Enemy
{
	constructor (game, position, speed, hp, pattern, poly)
	{
		if (!check_type(game, 'object'))
		{
			throw 'game has an unexpected type or value';
		}
		if (!check_type(position, 'array', [2], true))
		{
			throw 'position has an unexpected type or value';
		}
		if (!check_type(speed, 'array', [2], true))
		{
			throw 'speed has an unexpected type or value';
		}
		if (!check_type(hp, 'number', [], true))
		{
			throw 'hp has an unexpected type or value';
		}
		if (!check_type(pattern, 'array', ['.', 2], true))
		{
			throw 'pattern has an unexpected type or value';
		}
		if (!check_type(poly, 'array', ['.', 2], true))
		{
			throw 'poly has an unexpected type or value';
		}
		this.step = 0;
		this.game = game;
		this.position = position;
		this.speed = speed;
		this.hp = hp;
		this.pattern = pattern;
		this.poly = poly;
	}

	draw ()
	/* Draw the enemy in the present position */
	{
		GLOBALS['screen'].draw_poly(this.poly);
	}

	check_coordinate (coordinate)
	/* Checks if the enemy is drawable, destroy it if not*/
	{
		if (!check_type(coordinate, 'array', [2], true))
		{
			throw 'coordinate has an unexpected type or value';
		}
		let directions = [0, 1];
		for (let direction of directions)
		{
			if (coordinate[direction] < CONFIG['game']['border'][direction]['min'])
			{
				this.destroy();
				return false;
			}
			else if (coordinate[direction] > CONFIG['game']['border'][direction]['min'])
			{
				this.destroy();
				return false;
			}
		}
		return true;
	}

	move ()
	/* Moves the enemy */
	{
		if (this.step > this.pattern.length)
		{
			this.step = 0;
		}
		let coordinate = [this.speed[0]*this.pattern[this.step][0]+this.position[0], this.speed[1]*this.pattern[this.step][1]+this.position[1]]
		if (this.check_coordinate(coordinate))
		{
			this.position = coordinate;
			this.poly = GLOBALS['screen'].to_poly(this.position, GLOBALS['screen'].to_vectors(this.poly));
		}
	}

	take_damage (damage)
	{
		this.hp -= damage;
		if (this.hp < 1)
		{
			this.destroy();
		}
	}

	destroy ()
	/* Destroy the enemy */
	{
		this.game.enemies.splice(this.game.enemies.indexOf(this), 1);
	}

	check_collision ()
	/* Checks if this enemy collide with a shoot or the ship */
	{
		for (let shoot of this.game.shoots)
		{
			if (GLOBALS['screen'].check_collision(shoot.poly, this.poly))
			{
				shoot.is_destroyed = true;
				this.take_damage(CONFIG['game']['shoot']['damage']);
				return true;
			}
		}
		if (GLOBALS['screen'].check_collision(this.game.ship.poly, this.poly))
		{
			this.take_damage(CONFIG['game']['collision_damage']);
			this.game.ship.take_damage(CONFIG['game']['collision_damage']);
			return true;
		}
		return false;
	}
}
