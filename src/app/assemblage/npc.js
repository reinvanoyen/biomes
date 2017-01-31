"use strict";

const ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	Collision = require('../../engine/component/collision'),
	Body = require('../../engine/component/body'),
	WalkingBehavior = require('../../engine/component/walkingbehavior'),
	Camera = require('../../engine/component/camera'),
	AI = require('../../engine/component/ai'),
	math = require('../../engine/util/math'),
	Vector2 = require('gl-matrix').vec2,
	Depth = require('../../engine/component/depth')
;

class NPC extends ECS.Entity {

	constructor() {

		super( null, [
			Sprite,
			Position,
			Body,
			Collision,
			WalkingBehavior,
			AI,
			Depth
		] );

		this.updateComponent( 'depth', { value: -3 } );

		this.updateComponent( 'body', {
			bounciness: .5,
			maxVelocity: Vector2.fromValues( math.randFloatBetween(1, 10), 15 )
		} );

		this.updateComponent( 'position', { value: Vector2.fromValues( math.randFloatBetween(-1000, 1000), math.randFloatBetween(-1000, 0) ) } );
	}
}

module.exports = NPC;