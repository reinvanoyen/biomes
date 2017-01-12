"use strict";

const tractor = require('tree-tractor');

class IsRested extends tractor.BaseNode {

	tick(tick) {
		if(tick.entity.components.ai && tick.entity.components.ai.fatigue < 100) {
			return 1;
		}

		return 2;
	}
}

module.exports = IsRested;
