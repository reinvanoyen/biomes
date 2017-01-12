"use strict";

const tractor = require('tree-tractor');

class WalkForward extends tractor.BaseNode {

	tick(tick) {
		if(tick.entity.components.walkingbehavior) {
			tick.entity.components.walkingbehavior.state = 'walkingforward';
			return 1;
		}

		return 2;
	}
}

module.exports = WalkForward;
