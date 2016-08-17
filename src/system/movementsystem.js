"use strict";

var ECS = require('yagl-ecs'),
	input = require('../input')
;

class MovementSystem extends ECS.System {

	test(entity) {

		return ( entity.components.playerctrl && entity.components.pos );
	}

	update(entity) {

		let speed = 10;
		let {pos} = entity.components;

		if( input.isDown( input.RIGHT ) ) {

			pos.x += speed;
		}

		if( input.isDown( input.LEFT ) ) {

			pos.x -= speed;
		}

		if( input.isDown( input.UP ) ) {

			pos.y -= speed;
		}

		if( input.isDown( input.DOWN ) ) {

			pos.y += speed;
		}
	}

	exit(entity) {}
}

module.exports = MovementSystem;
