"use strict";

const PIXI = require('pixi.js'),
	noise = require('../util/noise')
;

class World {

	constructor( seed, stage, chunkCount, altitude ) {

		noise.setSeed( seed );

		this.stage = stage;
		this.chunkCount = chunkCount;
		this.altitude = altitude;

		this.stageWidth = 800;
		this.stageHeight = 600;

		this.chunkWidth = this.stageWidth / ( this.chunkCount - 1 );

		this.setup();
	}

	setup() {

		this.terrain = new PIXI.Graphics();
		this.points = [];

		this.stage.addChild( this.terrain );
	}

	getWorldElevation( x ) {
		x = x / 80;
		return this.getElevationAt(x);
	}

	getElevationAt( x ) {
		return -noise.getElevation( x, 1 ) * this.altitude;
	}

	render( x, y ) {

		this.terrain.clear();

		this.generate(x, y);

		this.terrain
			.beginFill( 0x2c2f31 )
			.drawPolygon( this.points )
			.endFill()
		;
	}

	generate( x, y ) {

		this.points = [];
		this.points.push( 0 );
		this.points.push( this.getElevationAt( 0 ) );

		for( let i = 0; i < 1000; i++ ) {
			this.points.push( i * 80 );
			this.points.push( this.getElevationAt( i ) );
		}

		this.points.push( 80000 );
		this.points.push( this.getElevationAt( 1000 ) );

		this.points.push( 80000 );
		this.points.push( 0 );

		this.points.push( 0 );
		this.points.push( 0 );
	}
}

module.exports = World;