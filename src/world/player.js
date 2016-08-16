"use strict";

var Entity = require('./entity')

class Player extends Entity {

	constructor() {

		super();

		this.display = new PIXI.Sprite( PIXI.Texture.fromImage( 'assets/textures/player.png' ) )

		this.display.position.x = 400
		this.display.position.y = 300

		this.display.scale.x = 1
		this.display.scale.y = 1
	}

	update() {

		this.display.rotation += .01;
	}
}

module.exports = Player;