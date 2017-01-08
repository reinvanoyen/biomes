"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	Camera = require('../../engine/component/camera'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Input = require('../../engine/component/input')
;

class Player extends ECS.Entity {

	constructor() {

		super( 'player', [
			Sprite,
			Position,
			Camera,
			Body,
			Collision,
			WalkingBehavior,
			Input
		] );
	}
}

module.exports = Player;