"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	FastSimplexNoise = require('fast-simplex-noise')
;

class WorldGenerationSystem extends ECS.System {

	constructor(stage) {
		super();
		this.stage = stage;
		this.noise = new FastSimplexNoise( {
			frequency: 0.2,
			max: 50,
			min: 0,
			octaves: 8
		} );
		this.terrain = new PIXI.Graphics();
		this.points = [];
		this.stage.addChild( this.terrain );
	}

	test(entity) {

		return ( entity.components.cam && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		let tileWidth = 10;
		let gridSize = 80;

		this.points = [
			0, 600 // bottom left
		];

		for( var i = 0; i < gridSize; i++ )
		{
			this.points.push( ( i * tileWidth ) ); // x
			//this.points.push( i );
			this.points.push( this.noise.in2D( i + pos.x, 1 ) ); // y
		}

		this.points.push( tileWidth * gridSize - tileWidth ); // bottom right
		this.points.push( 600 );

		this.terrain.position.x = pos.x - 400;

		this.terrain
			.clear()
			.beginFill( 0x49AB84 )
			.drawPolygon( this.points )
			.endFill()
		;
	}

	exit(entity) {}
}

module.exports = WorldGenerationSystem;