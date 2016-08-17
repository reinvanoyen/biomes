"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	noise = require('../util/noise')
;

class WorldGenerationSystem extends ECS.System {

	constructor(stage) {

		super();

		this.stage = stage;
		this.terrain = new PIXI.Graphics();
		this.points = [];
		this.stage.addChild( this.terrain );
	}

	test(entity) {

		return ( entity.components.cam && entity.components.pos );
	}

	update(entity) {

		let {pos} = entity.components;

		let stageWidth = 800;
		let stageHeight = 600;

		let gridSize = 100;
		let tileWidth = stageWidth / ( gridSize - 1 );
		let offset = Math.floor( pos.x / tileWidth );

		let maxHeight = 200;

		this.points = [
			0, stageHeight // bottom left
		];

		for( var i = 0; i <= gridSize; i++ )
		{
			let x = i * tileWidth;
			let y = stageHeight - noise.terrain( i + offset, 1 ) * maxHeight;

			this.points.push( x );
			this.points.push( y );
		}

		this.points.push( tileWidth * gridSize ); // bottom right
		this.points.push( stageHeight );

		// keep the terrain in view (fixed)
		this.terrain.position.x = ( offset * tileWidth - ( stageWidth / 2 ) );

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
