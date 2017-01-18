"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	math = require('../../engine/util/math'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Input = require('../../engine/component/input'),
	Camera = require('../../engine/component/camera'),
	Vector2 = require('gl-matrix').vec2
;

class Berry extends ECS.Entity {

	constructor() {

		super( 'berry', [
			Sprite,
			Position,
			Body,
			Collision
		] );

		/*
		this.updateComponent('body', {
			bounciness: math.randFloatBetween( 0, 1 )
		});
		*/

		this.updateComponent('sprite', {
			src: 'assets/textures/01.jpg',
			width: 20,
			height: 20
		});

		this.updateComponent( 'position', { value: Vector2.fromValues( 0, -1000 ) } );
	}
}

module.exports = Berry;