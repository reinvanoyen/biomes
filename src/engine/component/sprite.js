"use strict";

const Vector2 = require('tnt-vec2');

const Sprite = {
	name: 'sprite',
	defaults: {
		src: 'assets/textures/player.png',
		sprite: null,
		width: 78,
		height: 196,
		anchor: new Vector2( .5, 1 )
	}
};

module.exports = Sprite;