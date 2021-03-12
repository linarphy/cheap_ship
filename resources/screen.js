GLOBALS['screen'] = {
	to_vector: function (point_1, point_2)
	{
		return [point_2[0] - point_1[0], point_2[1] - point_1[1]];
	},
	to_vectors: function (polygon)
	{
		let vectors = [];
		for (let i = 0; i < polygon.length - 1; i++)
		{
			vectors.push(this.to_vector(polygon[i], polygon[i + 1]));
		}
		vectors.push(this.to_vector(polygon[polygon.length - 1], polygon[0]));
		return vectors;
	},
	to_poly: function (start_position, vectors)
	{
		let polygon = [];
		for (let vector of vectors)
		{
			polygon.push(start_position);
			start_position = [start_position[0] + vector[0], start_position[1] + vector[1]];
		}
		return polygon;
	},
	transform_invert: function (vectors)
	{
		let new_vectors = [];
		for (let vector of vectors)
		{
			new_vectors.push([-vector[0], -vector[1]]);
		}
		return new_vectors;
	},
	collision_get_links_vectors: function (vector_side, theta_min, theta_max, vectors)
	{
		let shift = true,
			reverse_shift = true,
			reverse_vector_side = [-vector_side[0], -vector_side[1]],
			link_vect = [],
			reverse_link_vect = [],
			i = 0;
		while (i < vectors.length)
		{
			let theta_i = Math.atan2(vectors[i][1], vectors[i][0]);
			if (theta_i < 0)
			{
				theta_i += 2 * Math.PI;
			}
			if (shift)
			{
				if (theta_i > theta_max || theta_i < theta_min)
				{
					shift = false;
					link_vect.push(vector_side);
				}
			}
			else
			{
				if (theta_i < theta_max && theta_i > theta_min)
				{
					shift = true;
					link_vect.push(reverse_vector_side);
				}
			}
			if (reverse_shift)
			{
				if (theta_i < theta_max && theta_i > theta_min)
				{
					reverse_shift = false;
					reverse_link_vect.push(reverse_vector_side);
				}
			}
			else
			{
				if (theta_i > theta_max || theta_i < theta_min)
				{
					reverse_shift = true;
					reverse_link_vect.push(vector_side);
				}
			}
			link_vect.push(vectors[i]);
			reverse_link_vect.push(vectors[i]);
			i++;
		}
		if (!shift)
		{
			link_vect.push(reverse_link_vect);
		}
		if (!reverse_shift)
		{
			reverse_link_vect.push(link_vect);
		}
		return [link_vect, reverse_link_vect];
	},
	check_inside: function (point, poly)
	{
		// adapted from https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon (adapted by markkillah from http://alienryderflex.com/polygon/)
		var i, j=poly.length-1;
		var odd = 0;

		for (i=0; i<poly.length; i++) {
			if ((poly[i][1] < point[1] && poly[j][1] >= point[1] || poly[j][1] < point[1] && poly[i][1] >= point[1])
				&& (poly[i][0] <= point[0] || poly[j][0] <= point[0])) {
				odd ^= (poly[i][0] + (point[1]-poly[i][1]) / (poly[j][1]-poly[i][1]) * (poly[j][0] - poly[i][0]) < point[0]);
			}
			j=i;
		}
		return odd == 1;
	},
	check_collision: function (polygon_1, polygon_2)
	{
		if (this.check_inside(polygon_1[0], polygon_2))
		{
			return true;
		}
		let indice = 0;
		while (indice < polygon_2.length)
		{
			let reverse_vector_polygon_1 = this.transform_invert(this.to_vectors(polygon_1)),
				start_point = polygon_2[indice],
				end_point = 0;
			if (indice === polygon_2.length - 1)
			{
				end_point = polygon_2[0];
			}
			else
			{
				end_point = polygon_2[indice + 1];
			}
			let vector_side = this.to_vector(start_point, end_point),
				theta_min = Math.atan2(vector_side[1], vector_side[0]),
				theta_max = theta_min + Math.PI;
			if (theta_min < 0)
			{
				theta_min += 2 * Math.PI;
			}
			let link_vectors = this.collision_get_links_vectors(vector_side, theta_min, theta_max, reverse_vector_polygon_1),
				link_polygons = [this.to_poly(start_point, link_vectors[0]), this.to_poly(end_point, link_vectors[1])];
			if (this.check_inside(polygon_1[0], link_polygons[0]))
			{
				return true;
			}
			if (this.check_inside(polygon_1[0], link_polygons[1]))
			{
				return true;
			}
			indice++;
		}
		return false;
	},
	draw_poly: function(polygon, color=[255, 255, 255], type='stroke')
	{
		let ctx = GLOBALS['canvas'].getContext('2d');
		ctx.beginPath();
		ctx.moveTo(polygon[0][0], CONFIG['game']['border'][1]['max'] - CONFIG['game']['border'][1]['min'] - polygon[0][1]);
		let index = 1;
		while (index < polygon.length)
		{
			ctx.lineTo(polygon[index][0], CONFIG['game']['border'][1]['max'] - CONFIG['game']['border'][1]['min'] - polygon[index][1]);
			index++;
		}
		ctx.lineTo(polygon[0][0], CONFIG['game']['border'][1]['max'] - CONFIG['game']['border'][1]['min'] - polygon[0][1]);
		switch (type)
		{
			case 'stroke':
				ctx.strokeStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
				ctx.stroke();
				break;
			case 'fill':
				ctx.fillStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
				ctx.fill();
				break;
			default:
				throw 'unknown type';
		}
	},
	write: function(text, position='middle', color=[255, 255, 255], font='sans-serif', size='auto', type='normal')
	{
		let ctx = GLOBALS['canvas'].getContext('2d');
		ctx.fillStyle = "rgb("+color[0]+", "+color[1]+", "+color[2]+")";
		if (size === 'auto')
		{
			size = (CONFIG['game']['border'][0]['max'] - CONFIG['game']['border'][0]['min'])/text.length;
			if (size > CONFIG['game']['string']['size_max'])
			{
				size = CONFIG['game']['string']['size_max'];
			}
		}
		ctx.font = type+' '+size+'px '+font;
		if (position === 'middle')
		{
			position = [GLOBALS['canvas'].width / 2 - (text.length / 2) * size / 2, GLOBALS['canvas'].height / 2 + size / 2]
		}
		else
		{
			position = [position[0], GLOBALS['height']-position[1]];
		}
		ctx.fillText(text, position[0], position[1]);
	},
	clear: function ()
	{
		let ctx = GLOBALS['canvas'].getContext('2d');
		ctx.clearRect(0, 0, CONFIG['game']['border'][0]['max'] - CONFIG['game']['border'][0]['min'], CONFIG['game']['border'][1]['max'] - CONFIG['game']['border'][1]['min']);
	},
}
