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
	Time = require('../engine/system/time'),

	Renderer = require('../engine/rendering/renderer'),

	NPC = require('./assemblage/npc'),
	Player = require('./assemblage/player'),
	Berry = require('./assemblage/berry')
;

class Application {

	constructor() {

		let engine = new CoreEngine();
		let worldGeneration = new WorldGeneration('ygdsijhhs44451554sd54', engine.root);

		engine.addSystems([
			worldGeneration, // 1 Generate the world
			new CollisionDetection(worldGeneration.world), // 2 Check if there's collision
			new Physics(worldGeneration.world), // 3 Based on collision, apply physics reactions
			new AIProcessing(), // @TODO assign number
			new Control(), // 4 Get player input
			new Behavior(), // 5 Based on player input, change body vectors
			new Force(), // 6 Apply forces
			new Movement(), // 7 Move
			new Renderer(engine.stage, engine.root, 1000, 750), // 8 Render
			new Time(engine.stage, 50) // @TODO number
		]);

		engine.ecs.addEntity(new Player());
		engine.ecs.addEntity(new NPC());
		engine.ecs.addEntity(new Berry());

		/*
		for( let i = 0; i < 50; i++ )
		{
			engine.ecs.addEntity(new NPC());
			engine.ecs.addEntity(new Berry());
		}
		*/

		engine.start();
	}
}

module.exports = Application;