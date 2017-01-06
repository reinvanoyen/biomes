"use strict";

const PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),
	MessageManager = require('./messaging/messagemanager')
;

class CoreEngine {

	constructor() {

		// install renderer // @TODO move to rendering system
		this.renderer = new PIXI.WebGLRenderer(800, 600);
		this.renderer.backgroundColor = 0x605050;
		document.body.appendChild(this.renderer.view);

		// install stage
		this.stage = new PIXI.Container();

		// install ticker
		this.ticker = PIXI.ticker.shared;
		this.ticker.autoStart = false;
		this.ticker.stop();

		// install ECS
		this.ecs = new ECS();
	}

	addSystems(systems) {
		systems.forEach( s => {
			this.ecs.addSystem(s);
		} );
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