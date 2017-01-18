"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	Camera = require('../../engine/component/camera'),
	Debug = require('../../engine/component/debug'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Input = require('../../engine/component/input'),
	Vector2 = require('gl-matrix').vec2
;

class Player extends ECS.Entity {

	constructor() {

		super( 'player', [
			Camera,
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			Input,
			Debug
		] );

		this.updateComponent( 'position', { value: Vector2.fromValues( 0, -1000 ) } );
	}
}

module.exports = Player;