"use strict";

let ECS = require('yagl-ecs'),
	Sprite = require('../../engine/component/sprite'),
	Position = require('../../engine/component/position'),
	math = require('../../engine/util/math'),
	Depth = require('../../engine/component/depth'),
	SkyObject = require('../../engine/component/skyobj'),
	Camera = require('../../engine/component/camera'),
	Debug = require('../../engine/component/debug'),
	PositionFixed = require('../../engine/component/positionfixed'),
	Vector2 = require('gl-matrix').vec2
;

class Sun extends ECS.Entity {

	constructor() {

		super(null, [
			Sprite,
			Position,
			PositionFixed,
			SkyObject,
			Depth
		]);

		this.updateComponent('depth', {
			value: -19
		});

		this.updateComponent('position', {
		  value: Vector2.fromValues(500, 500)
		});

		this.updateComponent('sprite', {
			src: 'assets/textures/sun.png',
			width: 200,
			height: 200,
			anchor: Vector2.fromValues(.5, .5)
		});
	}
}

module.exports = Sun;