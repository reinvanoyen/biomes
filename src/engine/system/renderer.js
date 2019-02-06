"use strict";

const ECS = require('yagl-ecs'),
	PIXI = require('pixi.js'),
	math = require('../util/math'),
	MessageManager = require('../messaging/messagemanager')
;

class Renderer extends ECS.System {

	constructor( width, height) {

		super();

		this.renderer = new PIXI.WebGLRenderer(width, height);
		this.renderer.backgroundColor = 0x999999;
		document.body.appendChild(this.renderer.view);

		// install stage
		this.stage = new PIXI.Container();

		this.layers = {};
		this.fixedEntities = [];
		this.width = width;
		this.height = height;
	}

	depthSort() {
		this.stage.children.sort((a, b) => {
			return a.zIndex - b.zIndex;
		});
	}

	test(entity) {
		return entity.components.sprite && entity.components.position;
	}

	enter(entity) {

		let {sprite} = entity.components;

		entity.sprite = new PIXI.Sprite( PIXI.Texture.fromImage( sprite.src ) );

		if (sprite.width && sprite.height) {
			entity.sprite.width = sprite.width;
			entity.sprite.height = sprite.height;
		}

		entity.sprite.anchor.x = sprite.anchor[0];
		entity.sprite.anchor.y = sprite.anchor[1];

		// If it's a skybox, add it to the back on the stage
		if (entity.components.skybox) {

			entity.sprite.zIndex = -20;
			this.fixedEntities.push( entity );
			this.stage.addChild( entity.sprite );
			this.depthSort();
			return;
		}

		// If it's fixed
		if( entity.components.positionfixed ) {

			this.stage.addChild( entity.sprite );
			this.depthSort();
			return;
		}

		// Determine depth
		let depth = 0;

		if (entity.components.depth) {

			depth = entity.components.depth.value;

			let minDepth = -20,
				maxDepth = 7,
				scalingDepthFactor = (depth - minDepth ) / ( maxDepth - minDepth ); // Normalize to a value between 0 and 1

			entity.sprite.scale.x = scalingDepthFactor;
			entity.sprite.scale.y = scalingDepthFactor;
		}

		if( ! this.layers[depth] ) {

			// Create depth layer
			this.layers[depth] = new PIXI.Container();
			this.layers[depth].zIndex = depth;

			this.stage.addChild(this.layers[ depth ]);
			this.depthSort();
		}

		// Add entity to depth layer
		this.layers[ depth ].addChild( entity.sprite );
	}

	update(entity) {

		let {position} = entity.components;

		entity.sprite.position.x = position.value[0];
		entity.sprite.position.y = position.value[1];
	}

	postUpdate() {
		this.renderer.render(this.stage);
	}
}

module.exports = Renderer;