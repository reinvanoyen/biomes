"use strict";

const input = {

	_pressed: {},

	LEFT_ARROW: 37,
	UP_ARROW: 38,
	RIGHT_ARROW: 39,
	DOWN_ARROW: 40,
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