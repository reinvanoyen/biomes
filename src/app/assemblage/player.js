"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	Camera = require('../../engine/component/camera'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Input = require('../../engine/component/input'),
	Vector2 = require('gl-matrix').vec2
;

class Player extends ECS.Entity {

	constructor() {

		super( null, [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			Input,
			Camera
		] );

		this.updateComponent( 'body', {
			bounciness: .5,
			maxVelocity: Vector2.fromValues( 15, 15 )
		} );

		this.updateComponent( 'position', { value: Vector2.fromValues( 0, 0 ) } );
	}
}

module.exports = Player;