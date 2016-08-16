"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	FastSimplexNoise = require('fast-simplex-noise')
;

class WorldSystem extends ECS.System {

	constructor(stage) {
		super();
		this.stage = stage;
		this.noise = new FastSimplexNoise();
	}

	test(entity) {

		return !! entity.components.world;
	}

	enter(entity) {

		entity.polygon = new PIXI.Graphics();
		this.stage.addChild(entity.polygon);
	}

	update(entity) {

		let {points} = entity.components.world;

		points = [
			0, 600
		];

		for( var i = 0; i < 50; i++ )
		{
			points.push( i * 50 );
			points.push( this.noise.in2D( i, 1 ), 1 );
		}

		points.push( 800, 600 );

		entity.polygon
			.clear()
			.beginFill( 0x49AB84 )
			.drawPolygon( points )
			.endFill()
		;
	}

	exit(entity) {}
}

module.exports = WorldSystem;
