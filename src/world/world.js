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
		//this.offset = null;

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

		/*
		this.points = [
			x,
			this.stageHeight // bottom left
		];

		for( let i = 0; i <= this.chunkCount; i++ ) {

			let pointX = screenX + i * this.chunkWidth;

			this.points.push( pointX );
			this.points.push( this.getElevationAt( pointX ) );
		}
		*/
		/*
		for( let i = 0; i <= this.chunkCount; i++ )
		{
			let x = i * this.chunkWidth + xRest,
				y = this.getElevationAt( i + this.offset )
			;

			this.points.push( x );
			this.points.push( y );
		}
		*/

		/*
		this.points.push( x + this.stageWidth ); // bottom right
		this.points.push( this.stageHeight );
		*/

		//this.graphics.clear();
		//this.water.clear();
		//this.devLayer.clear();

		// draw moisture (dev)

		/*
		for( let i = 0; i <= this.chunkCount * 2; i++ )
		{
			let x = i * this.chunkWidth;
			let y = this.stageHeight - noise.getMoisture( i + offset, 1 ) * this.altitude;

			this.devLayer
				.beginFill( 0xF14000 )
				.drawCircle( offset * this.chunkWidth + x, y, 5 )
				.endFill()
			;
		}
		*/

		// pois

		/*
		for( let i = 0; i <= this.chunkCount; i++ )
		{
			let x = i * this.chunkWidth;
			let y = this.stageHeight - noise.getElevation( i + offset, 1 ) * this.altitude;

			if( noise.getPoi( i + offset, 1 ) ) {

				this.graphics
					.beginFill( 0xEA00FF )
					.drawCircle( offset * this.chunkWidth + x, y, 25 )
					.endFill()
				;
			}
		}
		*/
		// terrain

		// water

		/*
		this.water
			.beginFill( 0x0d3954 )
			.drawPolygon( [
				0, this.stageHeight, // bottom left
				0, this.stageHeight - ( 0.1 * this.altitude ), // top left
				this.chunkWidth * this.chunkCount, this.stageHeight - ( 0.1 * this.altitude ), // top right
				this.chunkWidth * this.chunkCount, this.stageHeight // bottom right
			] )
			.endFill()
		;
		*/

		// keep the terrain in view (fixed)

		/*
		this.water.position.x = ( offset * this.chunkWidth - ( this.stageWidth / 2 ) );
		this.terrain.position.x = ( offset * this.chunkWidth - ( this.stageWidth / 2 ) );
		*/
		// this.water.position.x = ( offset - ( this.stageWidth / 2 ) );
		// this.terrain.position.x = ( offset - ( this.stageWidth / 2 ) );
	}
}

module.exports = World;