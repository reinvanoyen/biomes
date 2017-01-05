"use strict";

const ECS = require('yagl-ecs'),
	PIXI = require('pixi.js')
;

class Rendering extends ECS.System {

	constructor(stage) {

		super();
		this.stage = stage;
	}

	test(entity) {
		return entity.components.position && entity.components.sprite;
	}

	enter(entity) {

		entity.sprite = new PIXI.Sprite( PIXI.Texture.fromImage( entity.components.sprite.src ) );

		if( entity.components.debug ) {

			entity.debugText = new PIXI.Text( '', {
				fontSize: '11px',
				fontFamily: 'Monospace',
				fill : 0xff1010,
				align : 'left'
			} );

			this.stage.addChild( entity.debugText );
		}

		this.stage.addChild( entity.sprite );
	}

	update(entity) {
		
		let {position} = entity.components;

		entity.sprite.position.x = position.x;
		entity.sprite.position.y = position.y;

		if( entity.components.camera ) {

			this.stage.position.x = -position.x + ( 800 / 2 );
			this.stage.position.y = -position.y + ( 600 / 2 );
		}

		if( entity.components.debug ) {

			entity.debugText.text = 'x: ' + parseInt(position.x) + ', y: ' + parseInt(position.y);

			entity.debugText.position.x = position.x;
			entity.debugText.position.y = position.y;
		}
	}

	exit(entity) {}
}

module.exports = Rendering;