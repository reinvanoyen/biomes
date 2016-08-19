"use strict";

var input = {

	_pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,

	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},

	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
	},

	onKeyup: function(event) {
		delete this._pressed[event.keyCode];
	}
};

window.addEventListener('keyup', function(event) { input.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { input.onKeydown(event); }, false);

module.exports = input;