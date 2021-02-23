class Game
{
	constructor ()
	{
		this.shoots = [];
		this.enemies = [];
		this.is_running = false;
		this.ship = new Ship();
		this.level = new Level('level_1');
	}

	run ()
	/* Run the game */
	{
		this.is_running=true;
		this.ship.init();
		this.loop();
	}

	loop ()
	/* Main loop of the game */
	{
		if (GLOBALS['keys_pressed']['p']) // Pause the game when p is pressed
		{
			this.is_running = false;
			return 0;
		}

		/* Movement Logic */
		movement = [0, 0]
		if (GLOBALS['keys_pressed']['ArrowLeft'])
		{
			movement[0] -= this.ship.speed[0];
		}
		else if (GLOBALS['keys_pressed']['ArrowRigt'])
		{
			movement[0] += this.ship.speed[0];
		}
		if (GLOBALS['keys_pressed']['ArrowDown'])
		{
			movement[1] -= this.ship.speed[1];
		}
		else if (GLOBALS['keys_pressed']['ArrowUp'])
		{
			movement[1] += this.ship.speed[1];
		}
		if (movement[0] !== 0 || movement[1] !== 0)
		{
			this.ship.move(movement);
		}

		/* User shoot logic */
		if (GLOBALS['keys_pressed'][' ']) // Shoot when pressing spacebar
		{
			if (this.ship.can_shoot)
			{
				this.ship.shoot();
			}
		}

		/* User cooldown logic */
		this.ship.cooldown.manage();

		/* Shoots logic */
		for (let shoot of this.shoots)
		{
			shoot.move();
			shoot.chek_collision();
		}

		/* Enemies logic */
		for (let enemy of this.enemies)
		{
			enemy.move();
			enemy.check_collision();
		}
		window.requestAnimationFrame(() => {
			this.loop();
		});
	}

	createShoot (position, speed, element)
	{
		shoot = new Shoot(position, speed, element);
		document.getElementById('game').appendChild(shoot.element);
		this.shoots.push(shoot);
	}
}
