"use strict";

const Vector2 = require('gl-matrix').vec2;

const Sprite = {
	name: 'sprite',
	defaults: {
		src: 'assets/textures/player.png',
		sprite: null,
		width: 78,
		height: 196,
		anchor: Vector2.fromValues( .5, 1 )
	}
};

module.exports = Sprite;