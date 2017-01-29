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

class Tree extends ECS.Entity {

	constructor() {

		super( null, [
			Sprite,
			Position,
			Body,
			Collision
		] );

		let rand = math.randBetween( 0, 4 );

		if( rand == 0 ) {
			this.updateComponent('sprite', {
				src: 'assets/textures/tree01.png',
				width: 216,
				height: 1500,
				anchor: Vector2.fromValues(.5, 1)
			});
		} else if( rand == 1 ) {
			this.updateComponent('sprite', {
				src: 'assets/textures/tree02.png',
				width: 281,
				height: 1500,
				anchor: Vector2.fromValues(.5, 1)
			});
		} else if( rand == 2 ) {
			this.updateComponent('sprite', {
				src: 'assets/textures/tree03.png',
				width: 305,
				height: 1500,
				anchor: Vector2.fromValues(.5, 1)
			});
		} else if( rand == 3 ) {
			this.updateComponent('sprite', {
				src: 'assets/textures/bush.png',
				width: 831,
				height: 962,
				anchor: Vector2.fromValues(.5, 1)
			});
		}
	}
}

module.exports = Tree;