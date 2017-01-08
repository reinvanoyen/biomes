"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	math = require('../../engine/util/math'),
	Vector2 = require('tnt-vec2')
;

class Berry extends ECS.Entity {

	constructor() {

		super( 'berry', [
			Sprite,
			Position,
			Body,
			Collision
		] );

		this.updateComponent('body', {
			mass: math.randBetween( 1, 1000 ),
			bounciness: math.randFloatBetween( 0, 1 )
		});

		this.updateComponent('sprite', {
			src: 'assets/textures/01.jpg',
			width: 20,
			height: 20
		});

		this.updateComponent('position', {value: new Vector2(math.randFloatBetween(-50000, 50000), math.randBetween(0, -1000) )});
	}
}

module.exports = Berry;