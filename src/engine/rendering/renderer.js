"use strict";

const ECS = require('yagl-ecs'),
	PIXI = require('pixi.js')
;

class Renderer extends ECS.System {

	constructor(stage, width, height) {

		super();
		this.stage = stage;
		this.layers = {};
		this.width = width;
		this.height = height;
	}

	test(entity) {
		return entity.components.position && entity.components.sprite;
	}

	enter(entity) {

		let {sprite} = entity.components;

		entity.sprite = new PIXI.Sprite( PIXI.Texture.fromImage( sprite.src ) );

		entity.sprite.width = sprite.width;
		entity.sprite.height = sprite.height;

		entity.sprite.anchor.x = sprite.anchor[0];
		entity.sprite.anchor.y = sprite.anchor[1];

		// If it's a skybox, add it to the back on the stage
		if( entity.components.skybox ) {
			entity.sprite.zIndex = -20;
			this.stage.addChild( entity.sprite );
			return;
		}

		// Determine depth
		let depth = 0;
		if (entity.components.depth) {
			depth = entity.components.depth.value;
		}

		if( ! this.layers[ depth ] ) {
			// Create depth layer
			this.layers[ depth ] = new PIXI.Container();
			this.layers[ depth ].zIndex = depth;
			this.stage.addChild(this.layers[ depth ]);
			this.stage.children.sort( ( a, b ) => a.zIndex - b.zIndex );
		}

		// Add entity to depth layer
		this.layers[ depth ].addChild( entity.sprite );

		if( entity.components.debug ) {

			entity.debugText = new PIXI.Text( '', {
				fontSize: '11px',
				fontFamily: 'Monospace',
				fill : 0xff1010,
				align : 'left'
			} );

			this.layers[ depth ].addChild( entity.debugText );
		}
	}

	update(entity) {

		let {position} = entity.components;

		entity.sprite.position.x = position.value[0];
		entity.sprite.position.y = position.value[1];

		if( entity.components.camera ) {
			// Render layers
			for( let depth in this.layers ) {
				let depthFactor = 1 + depth / 5;
				this.layers[depth].position.x = -position.value[0] * depthFactor + ( this.width / 2 );
				this.layers[depth].position.y = -position.value[1] * depthFactor + ( this.height / 2 ) + 200;
			}
		}

		if( entity.components.debug ) {

			entity.debugText.text = 'x: ' + parseInt(position.value[0]) + ', y: ' + parseInt(position.value[1]);

			entity.debugText.position.x = position.value[0];
			entity.debugText.position.y = position.value[1];
		}
	}

	exit(entity) {}
}

module.exports = Renderer;