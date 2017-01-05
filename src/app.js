"use strict";

const PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),

	// Core
	MessageManager = require('./core/messagemanager'),

	// Systems
	Rendering = require('./system/rendering'),
	WorldGeneration = require('./system/worldgeneration'),
	Gravity = require('./system/gravity'),
	CollisionDetection = require('./system/collisiondetection'),
	Physics = require('./system/physics'),
	Movement = require('./system/movement'),
	Control = require('./system/control'),
	AI = require('./system/ai'),

	// Components
	Sprite = require('./component/sprite'),
	Position = require('./component/position'),
	Body = require('./component/body'),
	Collision = require('./component/collision'),
	Camera = require('./component/camera'),
	Input = require('./component/input'),
	Stats = require('./component/stats'),
	Behavior = require('./component/behavior'),
	Debug = require('./component/debug'),

	// Util
	math = require('./util/math')
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

		let worldGeneration = new WorldGeneration(this.stage, 'mldjksjkl');

		this.ecs.addSystem(worldGeneration);
		this.ecs.addSystem(new CollisionDetection(worldGeneration.world));
		this.ecs.addSystem(new Gravity());
		this.ecs.addSystem(new Physics());
		this.ecs.addSystem(new AI());
		this.ecs.addSystem(new Control());
		this.ecs.addSystem(new Movement());
		this.ecs.addSystem(new Rendering(this.stage));

		this.spawnPlayer(0, 0);

		for( let i = 0; i < 50; i++ ) {
			this.spawnNpc(math.randBetween(0, 10000), -20);
		}

		this.start();
	}

	spawnNpc(x=0, y=0) {

		let npc = new ECS.Entity('npc', [
			Sprite,
			Position,
			Body,
			Collision,
			Stats,
			Behavior
		]);

		npc.updateComponent('position', { x: x, y: y });

		this.ecs.addEntity(npc);
	}

	spawnPlayer(x=0, y=0) {

		let player = new ECS.Entity('player', [
			Sprite,
			Position,
			Body,
			Collision,
			Stats,

			Input,
			Camera,
			Debug
		]);

		player.updateComponent('position', { x: x, y: y });

		this.ecs.addEntity(player);
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

module.exports = App;