class Cooldown
{
	constructor (game)
	{
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
				this.active = 0;
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
