"use strict";

class WorldTime {

	constructor() {

		this.time = 0;
		this.day = 0;
	}

	tick() {

		this.time += 0.01;

		if( this.time > 24 ) {
			console.log('dayended');
			this.time = 0;
			this.day += 1;
			if( this.day > 365 ) {
				this.day = 0;
			}
		}
	}

	getSeasonAmbientColor() {
		return [ 1, 1, 1, 1 ];
	}

	getDayAmbientColor() {

		return [1, 1, 1, 1];
		let average = this.time / 24;
		return [ average, average, average, 1 ];
	}
}

module.exports = WorldTime;