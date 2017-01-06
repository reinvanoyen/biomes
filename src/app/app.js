"use strict";

const CoreEngine = require('../engine/core-engine'),
	WorldGeneration = require('../engine/system/worldgeneration'),
	CollisionDetection = require('../engine/system/collisiondetection'),
	Physics = require('../engine/system/physics'),
	Control = require('../engine/system/control'),
	AI = require('../engine/system/ai'),
	Force = require('../engine/system/force'),
	Movement = require('../engine/system/movement'),
	Rendering = require('../engine/system/rendering')
;

class Application {

	constructor() {

		let engine = new CoreEngine();

		let worldGeneration = new WorldGeneration('q6r54tgzqsa', engine.stage);

		engine.addSystems([
			worldGeneration, // 1 Generate the world
			new CollisionDetection(worldGeneration.world), // 2 Check if there's collision
			new Physics(worldGeneration.world), // 3 Based on collision, apply physics reactions
			new Control(), // 4 Get player input
			new AI(), // 5 Based on player input, change body vectors
			new Force(), // 6 Apply forces
			new Movement(), // 7 Move
			new Rendering(engine.stage) // 8 Render
		]);

		engine.start();
	}
}

module.exports = Application;