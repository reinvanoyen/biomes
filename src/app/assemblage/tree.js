"use strict";

let ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	math = require('../../engine/util/math'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Input = require('../../engine/component/input'),
	Camera = require('../../engine/component/camera'),
	Depth = require('../../engine/component/depth'),
	Vector2 = require('gl-matrix').vec2
;

class Tree extends ECS.Entity {

	constructor(depth) {

		super( null, [
			Sprite,
			Position,
			Body,
			Collision,
			Depth
		] );

		this.updateComponent('depth', { value: depth } );
		this.updateComponent('position', { value: Vector2.fromValues( math.randFloatBetween( -5000, 5000 ), 0 ) } );

		this.updateComponent('sprite', {
			src: 'assets/textures/tree0' + math.randBetween( 1, 3 ) + '.png',
			width: 216,
			height: 1500,
			anchor: Vector2.fromValues(.5, 1)
		});
	}
}

module.exports = Tree;