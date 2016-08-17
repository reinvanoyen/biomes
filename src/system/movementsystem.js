"use strict";

var ECS = require('yagl-ecs'),
	input = require('../input')
;

class MovementSystem extends ECS.System {

	test(entity) {

		return ( entity.components.playerctrl && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		if( input.isDown( input.RIGHT ) ) {

			pos.x += 3;
		}

		if( input.isDown( input.LEFT ) ) {

			pos.x -= 3;
		}

		if( input.isDown( input.UP ) ) {

			pos.y -= 3;
		}

		if( input.isDown( input.DOWN ) ) {

			pos.y += 3;
		}
	}

	exit(entity) {}
}

module.exports = MovementSystem;