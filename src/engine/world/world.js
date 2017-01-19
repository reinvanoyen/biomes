"use strict";

const PIXI = require('pixi.js'),
	noise = require('../util/noise')
;

class World {

	constructor(seed, stage) {

		noise.setSeed( seed );

		this.stage = stage;

		this.tileSize = 80;
		this.generateTileCount = 20;

		this.currentTile = 0;
		this.points = [];

		this.setup();
	}

	setup() {

		this.terrain = new PIXI.Graphics();
		this.generate();
		this.stage.addChild( this.terrain );
	}

	getWorldElevation(x) {
		x = x / this.tileSize;
		return this.getElevationAt(x);
	}

	getElevationAt(x) {
		return -noise.getElevation( x, 1 ) * 3000;
	}

	render(position) {

		this.terrain.clear();

		let currentTile = Math.floor(position[0] / this.tileSize);

		if( this.currentTile != currentTile ) {
			this.generate();
			this.currentTile = currentTile;
		}

		this.terrain
			.beginFill( 0x238242 )
			.drawPolygon( this.points )
			.endFill()
		;
	}

	generate() {

		let startTile = this.currentTile - this.generateTileCount / 2,
			endTile = this.currentTile + this.generateTileCount / 2
		;

		this.points = [];
		this.points.push(startTile * this.tileSize);
		this.points.push(this.getElevationAt(startTile));

		for (let i = startTile; i < endTile; i++) {
			this.points.push(i * this.tileSize);
			this.points.push(this.getElevationAt(i));
		}

		this.points.push(endTile * this.tileSize);
		this.points.push(this.getElevationAt(endTile));

		this.points.push(endTile * this.tileSize);
		this.points.push(0);

		this.points.push(startTile * this.tileSize);
		this.points.push(0);
	}
}

module.exports = World;