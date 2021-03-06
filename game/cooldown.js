class Cooldown
{
	constructor (game)
	{
		this.game = game;
		if (!check_type(CONFIG['game']['ship']['cooldown']['invincible_time'], 'number', [], true))
		{
			throw 'default invincible cooldown time has an unexpected value or type';
		}
		if (!check_type(CONFIG['game']['ship']['cooldown']['shoot_time'], 'number', [], true))
		{
			throw 'default shoot cooldown time has an unexpected value or type';
		}
		this.invincible = {
			game: game,
			active: false,
			time: 0,
			reset: function reset()
			{
				this.time = CONFIG['game']['ship']['cooldown']['invincible_time'];
				this.active = true;
				this.game.ship.color=GLOBALS['color']['ship']['invincible'];
			},
		};
		this.shoot = {
			active: false,
			time: 0,
			reset: function reset()
			{
				this.time = CONFIG['game']['ship']['cooldown']['shoot_time'];
				this.active = true;
			},
		};
	}

	manage ()
	/* Manage each cooldown time */
	{
		if (this.invincible.active)
		{
			if (this.invincible.time < 0)
			{
				this.invincible.active = false;
				this.game.ship.color=GLOBALS['color']['ship']['main'];
			}
			else
			{
				this.invincible.time--;
			}
		}
		if (this.shoot.active)
		{
			if (this.shoot.time < 0)
			{
				this.shoot.active = false;
			}
			else
			{
				this.shoot.time--;
			}
		}
	}
}
