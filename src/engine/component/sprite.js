"use strict";

const Vector2 = require('gl-matrix').vec2;

const Sprite = {
	name: 'sprite',
	getDefaults: function() {
		return {
			src: 'assets/textures/fox.png',
			sprite: null,
			width: 400,
			height: 176,
			anchor: Vector2.fromValues(.5, 1)
		};
	}
};

module.exports = Sprite;