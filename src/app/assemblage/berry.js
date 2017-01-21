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
	Vector2 = require('gl-matrix').vec2
;

class Berry extends ECS.Entity {

	constructor() {

		super( null, [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			Input,
		] );

		this.updateComponent('sprite', {
			src: 'assets/textures/01.jpg',
			width: 20,
			height: 20,
			anchor: Vector2.fromValues( .5, 1 )
		});

		this.updateComponent( 'body', {
			bounciness: math.randFloatBetween(0, .5),
			mass: Vector2.fromValues( math.randFloatBetween(0, 10), math.randFloatBetween(0, 10) )
		} );

		this.updateComponent( 'position', { value: Vector2.fromValues( math.randFloatBetween(-1000, 1000), -1000 ) } );
	}
}

module.exports = Berry;