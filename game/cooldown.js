class Cooldown
{
	constructor (game)
	{
		this.game = game;
		if (!check_type(CONFIG['game']['ship']['cooldown']['invincible_time'], 'number', [], true))
		{
			throw LANG['error']['game']['cooldown']['invincible_time_type'];
		}
		if (!check_type(CONFIG['game']['ship']['cooldown']['shoot_time'], 'number', [], true))
		{
			throw LANG['error']['game']['cooldown']['shoot_time_type'];
		}
		this.invincible = {
			game: game,
			active: false,
			time: 0,
			reset: function reset()
			{
				this.time = CONFIG['game']['ship']['cooldown']['invincible_time'];
				this.active = true;
				this.game.ship.color=CONFIG['game']['ship']['color_take_damage'];
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
				this.game.ship.color=CONFIG['game']['ship']['color'];
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
