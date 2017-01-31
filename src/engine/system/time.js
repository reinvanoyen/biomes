"use strict";

const ECS = require('yagl-ecs'),
	Ambient = require('../rendering/filter/ambient'),
	WorldTime = require('../world/world-time')
;

class Time extends ECS.System {

	constructor(stage, frequency=15) {

		super(frequency);

		this.stage = stage;

		this.worldTime = new WorldTime(10, 250);

		this.timeAmbientColorFilter = new Ambient();
		this.dayAmbientColorFilter = new Ambient();

		this.stage.filters = [ this.timeAmbientColorFilter, this.dayAmbientColorFilter ];
	}

	test(entity) {
		return false;
	}

	postUpdate() {

		this.worldTime.tick();

		this.timeAmbientColorFilter.ambientColor = this.worldTime.getTimeAmbientColor();
		this.dayAmbientColorFilter.ambientColor = this.worldTime.getDayAmbientColor();
	}

	exit(entity) {}
}

module.exports = Time;