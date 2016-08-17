"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	FastSimplexNoise = require('fast-simplex-noise')
;

class WorldGenerationSystem extends ECS.System {

	constructor(stage) {
		super();
		this.stage = stage;
		this.noise = new FastSimplexNoise();
		this.terrain = new PIXI.Graphics();
		this.points = [];

		this.stage.addChild(this.terrain);
	}

	test(entity) {

		return ( entity.components.cam && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		this.points = [
			0, 600
		];

		for( var i = 0; i < 50; i++ )
		{
			this.points.push( i * 50 ); // x
			this.points.push( this.noise.in2D( i + pos.x, 1 ) ); // y
		}

		this.points.push( 800, 600 );

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