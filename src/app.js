"use strict";

const PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),

	// Systems
	Rendering = require('./system/rendering'),
	WorldGeneration = require('./system/worldgeneration'),
	Gravity = require('./system/gravity'),
	CollisionDetection = require('./system/collisiondetection'),
	Physics = require('./system/physics'),
	Control = require('./system/control'),

	// Components
	Sprite = require('./component/sprite'),
	Position = require('./component/position'),
	Velocity = require('./component/velocity'),
	Collision = require('./component/collision'),
	Camera = require('./component/camera'),
	Input = require('./component/input'),
	Stats = require('./component/stats'),
	Debug = require('./component/debug'),

	// Util
	math = require('./util/math'),
	noise = require('./util/noise')
;

class App {

	constructor() {

		// install renderer
		this.renderer = new PIXI.WebGLRenderer(800, 600);
		this.renderer.backgroundColor = 0x7BCAF2;
		document.body.appendChild(this.renderer.view);

		// install stage
		this.stage = new PIXI.Container();
		this.stage.interactive = true;

		// install ticker
		this.ticker = PIXI.ticker.shared;
		this.ticker.autoStart = false;
		this.ticker.stop();

		// install ECS
		this.ecs = new ECS();
		this.ecs.addSystem(new Rendering(this.stage));
		this.ecs.addSystem(new Control());
		this.ecs.addSystem(new WorldGeneration(this.stage, '5ds45ds4'));
		this.ecs.addSystem(new Physics());
		this.ecs.addSystem(new Gravity());
		this.ecs.addSystem(new CollisionDetection());

		this.spawnPlayer(math.randBetween(0, 1000000), -20);
		this.start();
	}

	spawnPlayer(x=0, y=0) {

		let player = new ECS.Entity('player', [
			Sprite,
			Position,
			Velocity,
			Collision,
			Input,
			Stats,
			Camera,
			Debug
		]);

		player.updateComponent('position', { x: x, y: y });

		this.ecs.addEntity(player);
	}

	start() {

		this.ticker.start();

		this.ticker.add(time => {

			this.ecs.update();
			this.renderer.render(this.stage);
		} );
	}
}

module.exports = App;
