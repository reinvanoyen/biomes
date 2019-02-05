"use strict";

const ECS = require('yagl-ecs');
const keys = require('../input');

class Control extends ECS.System {

	test(entity) {
		return entity.components.input;
	}

	update(entity) {

		let {input, walkingbehavior = false} = entity.components;

		input.keyJump = keys.isDown(keys.UP_ARROW);
		input.keyForward = keys.isDown(keys.RIGHT_ARROW);
		input.keyBackward = keys.isDown(keys.LEFT_ARROW);
		input.keyDown = keys.isDown(keys.DOWN_ARROW);
		input.keySpace = keys.isDown(keys.SPACE);

		if (walkingbehavior) {

			walkingbehavior.state = 'idle';

			if (input.keyForward) {
				walkingbehavior.state = 'walkingforward';
			}

			if (input.keyBackward) {
				walkingbehavior.state = 'walkingbackward';
			}

			if (input.keyJump) {
				walkingbehavior.state = 'jumping';
			}
		}
	}

	exit(entity) {}
}

module.exports = Control;