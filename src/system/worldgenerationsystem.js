"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	noise = require('../util/noise')
;

class WorldGenerationSystem extends ECS.System {

	constructor(stage, seed) {

		super();

		noise.setSeed(seed);

		this.stage = stage;

		this.devLayer = new PIXI.Graphics();

		// Create the terrain
		this.water = new PIXI.Graphics();
		this.water.alpha = .5;
		this.terrain = new PIXI.Graphics();
		this.points = [];

		// Create the vegetation
		this.vegetation = new PIXI.Graphics();

		// Create the texture
		this.texture = new PIXI.extras.TilingSprite( PIXI.Texture.fromImage( 'assets/textures/base.png' ), 800, 600 );
		this.texture.mask = this.terrain;

		this.stage.addChild( this.water );
		this.stage.addChild( this.terrain );
		this.stage.addChild( this.texture );
		this.stage.addChild( this.vegetation );
		this.stage.addChild( this.devLayer );
	}

	test(entity) {

		return ( entity.components.cam && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		let stageWidth = 800;
		let stageHeight = 600;

		let gridSize = 5;
		let tileWidth = stageWidth / ( gridSize - 1 );
		let offset = Math.floor( pos.x / tileWidth );

		let maxHeight = 2000;

		this.terrain.clear();
		this.water.clear();
		this.vegetation.clear();
		this.devLayer.clear();

		this.points = [
			0, stageHeight // bottom left
		];

		for( var i = 0; i <= gridSize; i++ )
		{
			let x = i * tileWidth;
			let y = stageHeight - noise.getElevation( i + offset, 1 ) * maxHeight;

			this.points.push( x );
			this.points.push( y );
		}

		this.points.push( tileWidth * gridSize ); // bottom right
		this.points.push( stageHeight );

		// keep the terrain in view (fixed)
		this.texture.position.x = pos.x - ( stageWidth / 2 );
		this.texture.position.y = pos.y - ( stageHeight / 2 );
		this.water.position.x = ( offset * tileWidth - ( stageWidth / 2 ) );
		this.terrain.position.x = ( offset * tileWidth - ( stageWidth / 2 ) );

		this.terrain
			.beginFill( 0x49AB84 )
			.drawPolygon( this.points )
			.endFill()
		;

		// water
		this.water
			.beginFill( 0x0031D1 )
			.drawPolygon( [
				0, stageHeight, // bottom left
				0, stageHeight - ( 0.1 * maxHeight ), // top left
				tileWidth * gridSize, stageHeight - ( 0.1 * maxHeight ), // top right
				tileWidth * gridSize, stageHeight // bottom right
			] )
			.endFill()
		;

		// draw vegetation
		for( var i = 0; i <= gridSize; i++ )
		{
			let x = i * tileWidth;
			let y = stageHeight - noise.getElevation( i + offset, 1 ) * maxHeight;

			let biome = noise.getBiome( i + offset, 1 );

			if( biome ) {

				this.vegetation
					.beginFill( noise.getBiomeColor( biome ) )
					.drawCircle( offset * tileWidth + x - ( stageWidth / 2 ), y, 5 )
					.endFill()
				;
			}
		}

		// draw moisture (dev)
		for( var i = 0; i <= gridSize; i++ )
		{
			let x = i * tileWidth;
			let y = stageHeight - noise.getMoisture( i + offset, 1 ) * maxHeight;

			this.devLayer
				.beginFill( 0xF14000 )
				.drawCircle( offset * tileWidth + x - ( stageWidth / 2 ), y, 2 )
				.endFill()
			;
		}

		// draw POIs
		for( var i = 0; i <= gridSize; i++ )
		{
			let x = i * tileWidth;
			let y = stageHeight - noise.getElevation( i + offset, 1 ) * maxHeight;

			if( noise.getPoi( i + offset, 1 ) ) {

				this.vegetation
					.beginFill( 0xEA00FF )
					.drawCircle( offset * tileWidth + x - ( stageWidth / 2 ), y, 10 )
					.endFill()
				;
			}
		}
	}

	exit(entity) {}
}

module.exports = WorldGenerationSystem;