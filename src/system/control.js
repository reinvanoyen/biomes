"use strict";

const ECS = require('yagl-ecs'),
	keys = require('../input')
;

class Control extends ECS.System {

	enter(entity) {
		entity.acceleration = .1;
		entity.maxVelocity = 4;
	}

	test(entity) {
		return entity.components.input && entity.components.position && entity.components.velocity;
	}

	update(entity) {

		let {velocity, input} = entity.components;

		if( keys.isDown( keys.RIGHT ) ) {

			input.keyRight = true;
			velocity.x = Math.max( velocity.x + entity.acceleration, entity.maxVelocity );
			console.log( 'right' );

		} else {

			input.keyRight = false;
		}

		if( keys.isDown( keys.LEFT ) ) {

			input.keyLeft = true;
			velocity.x = Math.max( velocity.x - entity.acceleration, -entity.maxVelocity );

		} else {

			input.keyLeft = false;
		}

		if( entity.components.collision ) {

			if( entity.components.collision.bottom && keys.isDown( keys.UP ) ) {

				if( ! entity.components.input.keyJump ) {

					velocity.y = velocity.y - 10;
					input.keyJump = true;
				}

			} else {

				input.keyJump = false;
			}
		}

		input.keyDown = keys.isDown( keys.DOWN );
	}

	exit(entity) {}
}

module.exports = Control;