"use strict";

const CoreEngine = require('../engine/core-engine'),
	WorldGeneration = require('../engine/system/worldgeneration'),
	CollisionDetection = require('../engine/system/collisiondetection'),
	Physics = require('../engine/system/physics'),
	Control = require('../engine/system/control'),
	Behavior = require('../engine/system/behavior'),
	Force = require('../engine/system/force'),
	Movement = require('../engine/system/movement'),
	AIProcessing = require('../engine/system/aiprocessing'),
	Spawner = require('../engine/system/spawner'),
	Time = require('../engine/system/time'),
	SkyObjectOrbitting = require('../engine/system/skyobjectorbitting'),

	Renderer = require('../engine/rendering/renderer'),
	CameraSystem = require('../engine/rendering/camerasystem'),

	Player = require('./assemblage/player'),
	NPC = require('./assemblage/npc'),
	Tree = require('./assemblage/tree'),
	Rock = require('./assemblage/rock'),
	Sun = require('./assemblage/sun'),
	Background = require('./assemblage/background'),
	Camera = require('./assemblage/camera')
;

class Application {

	constructor() {

		let engine = new CoreEngine();
		let worldGeneration = new WorldGeneration( 'ygdsijhhs44451554sd54', engine.stage );
		let time = new Time(engine.stage, 0); // 9 Process time
		let renderer = new Renderer(engine.stage, 1280, 900);

		engine.addSystems([
			worldGeneration, // 1 Generate the world
			new CollisionDetection(worldGeneration.world), // 2 Check if there's collision
			new Physics(worldGeneration.world), // 3 Based on collision, apply physics reactions
			new AIProcessing(), // @TODO assign number
			new Control(), // 4 Get player input
			new Behavior(), // 5 Based on player input, change body vectors
			new Force(), // 6 Apply forces
			new Movement(), // 7 Move
			renderer, // 8 Render
			new CameraSystem( renderer ),
			time,
			new SkyObjectOrbitting( time.worldTime ),
			new Spawner(engine.ecs)
		]);

		engine.ecs.addEntity(new Background());
		engine.ecs.addEntity(new Sun());
		engine.ecs.addEntity(new Player());

		for( let i = 0; i < 10; i++ ) {
			engine.ecs.addEntity(new Rock(-3));
			engine.ecs.addEntity(new Rock(-1));
			engine.ecs.addEntity(new Rock(7));
			engine.ecs.addEntity(new Tree(-7));
			engine.ecs.addEntity(new Tree(-6));
			engine.ecs.addEntity(new Tree(-5));
			engine.ecs.addEntity(new Tree(-4));
			engine.ecs.addEntity(new Tree(-3));
			engine.ecs.addEntity(new Tree(-2));
			engine.ecs.addEntity(new Tree(-1));
			engine.ecs.addEntity(new Tree(0));
			engine.ecs.addEntity(new Tree(1));
			engine.ecs.addEntity(new Tree(2));
			engine.ecs.addEntity(new Tree(3));
			engine.ecs.addEntity(new Tree(4));
			engine.ecs.addEntity(new Tree(5));
			engine.ecs.addEntity(new Tree(6));
			engine.ecs.addEntity(new Tree(7));
		}

		engine.start();
	}
}

module.exports = Application;