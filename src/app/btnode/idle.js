"use strict";

const tractor = require('tree-tractor');

class Idle extends tractor.BaseNode {

	tick(tick) {
		if(tick.entity.components.walkingbehavior) {
			tick.entity.components.walkingbehavior.state = 'idle';
			return 1;
		}

		return 2;
	}
}

module.exports = Idle;
