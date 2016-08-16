"use strict";

var ECS = require('yagl-ecs'),
	PIXI = require('pixi.js')
;

class RenderingSystem extends ECS.System {

	constructor(stage) {
		super();
		this.stage = stage;
	}

	test(entity) {

		return ( entity.components.pos && entity.components.sprite );
	}

	enter(entity) {

		let src = entity.components.sprite.src;
		let sprite = new PIXI.Sprite( PIXI.Texture.fromImage( src ) );

		entity.sprite = sprite;

		this.stage.addChild( sprite );
	}

	update(entity) {
		
		let {pos} = entity.components;

		entity.sprite.position.x = pos.x;
		entity.sprite.position.y = pos.y;

		if( entity.components.cam ) {

			entity.sprite.alpha = .5;

			this.stage.position.x = -pos.x + ( 800 / 2 );
			this.stage.position.y = -pos.y + ( 600 / 2 );
		}
	}

	exit(entity) {}
}

module.exports = RenderingSystem;
