"use strict";

let ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	math = require('../../engine/util/math'),
	Depth = require('../../engine/component/depth'),
	Vector2 = require('gl-matrix').vec2
;

class Rock extends ECS.Entity {

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
			src: 'assets/textures/rock01.png',
			width: 100,
			height: 106,
			anchor: Vector2.fromValues(.5, 1)
		});
	}
}

module.exports = Rock;