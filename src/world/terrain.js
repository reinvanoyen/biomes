"use strict";

var Entity = require('./entity')
var FastSimplexNoise = require('fast-simplex-noise');

class Terrain extends Entity {

	constructor() {

		super();

		this.noisegen = new FastSimplexNoise({
			frequency: 0.01,
			max: 255,
			min: 0,
			octaves: 8
		} )

		this.display = new PIXI.Graphics()
			.beginFill( 0xFF0000 )
			.moveTo( -200, -300 )
			.lineTo( 200, -300 )
			.lineTo( 220, 100 )
			.lineTo( 200, 300 )
			.lineTo( -200, 300 )
			.endFill()
		;
	}

	update() {
	}
}

module.exports = Terrain;