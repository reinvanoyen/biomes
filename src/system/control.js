"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2'),
	keys = require('../input')
;

class Control extends ECS.System {

	test(entity) {
		return entity.components.input && entity.components.position && entity.components.body;
	}

	update(entity) {

		let {input, body} = entity.components;

		input.keyJump = keys.isDown(keys.UP_ARROW);
		input.keyForward = keys.isDown(keys.RIGHT_ARROW);
		input.keyBackward = keys.isDown(keys.LEFT_ARROW);
		input.keyDown = keys.isDown(keys.DOWN_ARROW);

		if( input.keyForward ) {
			body.velocity = body.velocity.add(new Vector2( 1, 0 ));
		}

		if( input.keyBackward ) {
			body.velocity = body.velocity.add(new Vector2( -1, 0 ));
		}

		if(
			input.keyJump &&
			entity.components.collision &&
			entity.components.collision.bottom
		) {
			body.velocity = body.velocity.add(new Vector2( 0, -7 ));
		}
	}

	exit(entity) {}
}

module.exports = Control;