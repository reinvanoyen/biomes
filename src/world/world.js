"use strict";

const PIXI = require('pixi.js'),
	noise = require('../util/noise'),
	Chunk = require('./chunk')
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

		this.graphics = new PIXI.Graphics();
		this.devLayer = new PIXI.Graphics();

		// Create the terrain
		this.water = new PIXI.Graphics();
		this.water.alpha = .98;

		this.terrain = new PIXI.Graphics();
		this.points = [];

		this.stage.addChild( this.terrain );
		this.stage.addChild( this.water );
		this.stage.addChild( this.devLayer );
		this.stage.addChild( this.graphics );

		// this.chunks = [];
		//
		// for( let i = 0; i <= this.chunkCount; i++ )
		// {
		// 	// @TODO how far will we generate the terrain?
		// 	this.chunks.push( new Chunk( this, i ) );
		// }
	}

	getElevationAt( x ) {

		return this.stageHeight - noise.getElevation( x, 1 ) * this.altitude;
	}

	render( x, y ) {

		let pos = {
			x: x,
			y: y
		};

		let offset = Math.floor( pos.x / this.chunkWidth );
		//let offset = pos.x;

		this.graphics.clear();
		this.terrain.clear();
		this.water.clear();
		this.devLayer.clear();

		// draw moisture (dev)

		for( let i = 0; i <= this.chunkCount * 2; i++ )
		{
			let x = i * this.chunkWidth;
			let y = this.stageHeight - noise.getMoisture( i + offset, 1 ) * this.altitude;

			this.devLayer
				.beginFill( 0xF14000 )
				.drawCircle( offset * this.chunkWidth + x - ( this.stageWidth / 2 ), y, 5 )
				.endFill()
			;
		}

		// pois

		for( let i = 0; i <= this.chunkCount; i++ )
		{
			let x = i * this.chunkWidth;
			let y = this.stageHeight - noise.getElevation( i + offset, 1 ) * this.altitude;

			if( noise.getPoi( i + offset, 1 ) ) {

				this.graphics
					.beginFill( 0xEA00FF )
					.drawCircle( offset * this.chunkWidth + x - ( this.stageWidth / 2 ), y, 25 )
					.endFill()
				;
			}
		}

		// terrain

		this.points = [
			0, this.stageHeight // bottom left
		];

		for( let i = 0; i <= this.chunkCount; i++ )
		{
			let x = i * this.chunkWidth;
			let y = this.getElevationAt( i + offset );

			this.points.push( x );
			this.points.push( y );
		}

		this.points.push( this.chunkWidth * this.chunkCount ); // bottom right
		this.points.push( this.stageHeight );

		this.terrain
			.beginFill( 0x2c2f31 )
			.drawPolygon( this.points )
			.endFill()
		;

		// water

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

		// keep the terrain in view (fixed)

		this.water.position.x = ( offset * this.chunkWidth - ( this.stageWidth / 2 ) );
		this.terrain.position.x = ( offset * this.chunkWidth - ( this.stageWidth / 2 ) );
		// this.water.position.x = ( offset - ( this.stageWidth / 2 ) );
		// this.terrain.position.x = ( offset - ( this.stageWidth / 2 ) );
	}
}

module.exports = World;