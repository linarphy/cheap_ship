class Cooldown
{
	constructor (game)
	{
		if (!check_type(CONFIG['game']['ship']['cooldown']['invincible_time'], 'number', [], true))
		{
			throw 'default invincible cooldown time has an unexpected value or type';
		}
		if (!check_type(CONFIG['game']['ship']['cooldown']['shoot_time'], 'number', [], true))
		{
			throw 'default shoot cooldown time has an unexpected value or type';
		}
		this.invincible = {
			active: false,
			time: 0,
			reset: function reset()
			{
				this.time = CONFIG['game']['ship']['cooldown']['invincible_time'];
				this.active = true;
			},
		};
		this.shoot = {
			active: false,
			time: 0,
			reset: function reset()
			{
				this.time = CONFIG['game']['ship']['cooldown']['shoot_time'];
				this.active = true;
				GLOBALS['game'].ship.color=[0, 0, 0];
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
