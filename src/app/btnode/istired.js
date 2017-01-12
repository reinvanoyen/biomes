"use strict";

const tractor = require('tree-tractor');

class IsTired extends tractor.BaseNode {

	tick(tick) {
		if(tick.entity.components.ai && tick.entity.components.ai.fatigue > 1000) {
			return 1;
		}

		return 2;
	}
}

module.exports = IsTired;
