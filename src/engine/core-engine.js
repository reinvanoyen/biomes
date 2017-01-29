"use strict";

const PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),
	MessageManager = require('./messaging/messagemanager')
;

class CoreEngine {

	constructor() {

		// install renderer // @TODO move to rendering system
		this.renderer = new PIXI.WebGLRenderer(1280, 900);
		this.renderer.backgroundColor = 0x999999;
		document.body.appendChild(this.renderer.view);

		// install stage
		this.stage = new PIXI.Container();
		this.root = new PIXI.Container();

		// background, temp solution
		let texture = PIXI.Texture.fromImage('assets/textures/bg.jpg');
		this.bg = new PIXI.Sprite(texture);

		this.bg.anchor.x = 0;
		this.bg.anchor.y = 0;
		this.bg.position.x = 0;
		this.bg.position.y = 0;

		this.stage.addChild(this.bg);
		this.stage.addChild(this.root);

		// install ticker
		this.ticker = PIXI.ticker.shared;
		this.ticker.autoStart = false;
		this.ticker.stop();

		// install ECS
		this.ecs = new ECS();
	}

	addSystems(systems) {
		systems.forEach( s => this.ecs.addSystem( s ) );
	}

	start() {

		this.ticker.start();

		this.ticker.add(time => {
			MessageManager.process_queue();
			this.ecs.update();
			this.renderer.render(this.stage);
		} );
	}
}

module.exports = CoreEngine;