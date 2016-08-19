"use strict";

var noise = require('../util/noise'),
	biomes = require('../data/biomes.json'),
	PIXI = require('pixi.js')
;

class Chunk {

	constructor( world, index ) {

		this.world = world;
		this.index = index;
	}

	refresh() {
		// load the chunk
	}

	render() {

		// render the chunk

		this.world.graphics
			.beginFill( 0xf09222 )
			.drawCircle( this.index * this.world.chunkWidth, 50, 10 )
			.endFill()
		;
	}
}

module.exports = Chunk;