"use strict";

const tractor = require('tree-tractor');

class WalkBackward extends tractor.BaseNode {

	tick(tick) {
		if(tick.entity.components.walkingbehavior) {
			tick.entity.components.walkingbehavior.state = 'walkingbackward';
			return 1;
		}

		return 2;
	}
}

module.exports = WalkBackward;
