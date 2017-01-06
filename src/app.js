"use strict";

const PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),

	// Core
	MessageManager = require('./core/messagemanager'),

	// Systems
	Rendering = require('./system/rendering'),
	WorldGeneration = require('./system/worldgeneration'),
	Force = require('./system/force'),
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
	WalkingBehavior = require('./component/walkingbehavior'),
	Debug = require('./component/debug'),

	// Util
	Vector2 = require('tnt-vec2'),
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

		this.ecs.addSystem(worldGeneration); // 1 Generate the world
		this.ecs.addSystem(new CollisionDetection(worldGeneration.world)); // 2 Check if there's collision
		this.ecs.addSystem(new Physics(worldGeneration.world)); // 3 Based on collision, apply physics reactions
		this.ecs.addSystem(new Control()); // 4 Get player input
		this.ecs.addSystem(new AI()); // 5 Based on player input, change body vectors
		this.ecs.addSystem(new Force()); // 6 Apply forces
		this.ecs.addSystem(new Movement()); // 7 Move
		this.ecs.addSystem(new Rendering(this.stage)); // 8 Render

		this.spawnPlayer(500, 0);

		for( let i = 0; i < 100; i++ ) {
			this.spawnNpc(i, math.randBetween(0, 1000), 0);
		}

		this.start();
	}

	spawnNpc(id, x=0, y=0) {

		let npc = new ECS.Entity(id, [
			Sprite,
			Position,
			Body,
			Collision,
			Stats,
			WalkingBehavior
		]);

		npc.updateComponent('position', { x: x, y: y });

		npc.updateComponent('body', {
			mass: math.randBetween(10, 100),
			maxVelocity: new Vector2(math.randBetween(1, 15), 15),
			bounciness: math.randFloatBetween(0, .5)
		});

		let rand = math.randBetween(1, 3);
		if( rand == 1 ) {
			npc.updateComponent('walkingbehavior', { state: 'walkingforward' });
		} else if ( rand == 2 ) {
			npc.updateComponent('walkingbehavior', { state: 'walkingbackward' });
		} else if ( rand == 3 ) {
			npc.updateComponent('walkingbehavior', { state: 'jumping' });
		}

		rand = math.randBetween(1, 3);
		if( rand == 3 ) {
			npc.updateComponent('sprite', {
				src: 'assets/textures/01.png'
			});
		}

		this.ecs.addEntity(npc);
	}

	spawnPlayer(x=0, y=0) {

		let player = new ECS.Entity('player', [
			Sprite,
			Position,
			Body,
			Collision,
			Stats,
			WalkingBehavior,

			Input,
			Camera
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