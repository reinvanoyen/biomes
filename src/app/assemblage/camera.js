"use strict";

let ECS = require('yagl-ecs'),
	Position = require('../../engine/component/position'),
	Camera = require('../../engine/component/camera'),
	Vector2 = require('gl-matrix').vec2
;

class CameraE extends ECS.Entity {

	constructor() {

		super( null, [
			Position,
			Camera
		] );

		this.updateComponent('position', { value: Vector2.fromValues( -200, 0 ) } );
	}
}

module.exports = CameraE;