"use strict";

const CoreEngine = require('../engine/core-engine'),
  WorldGeneration = require('../engine/system/worldgeneration'),
  SpatialHashingSystem = require('../engine/system/spatial-hashing-system'),
  CollisionDetection = require('../engine/system/collision-detection'),
  Physics = require('../engine/system/physics'),
  Control = require('../engine/system/control'),
  Behavior = require('../engine/system/behavior'),
  Force = require('../engine/system/force'),
  Movement = require('../engine/system/movement'),
  AIProcessing = require('../engine/system/aiprocessing'),
  Time = require('../engine/system/time'),
  SkyObjectOrbitting = require('../engine/system/skyobjectorbitting'),

  Renderer = require('../engine/system/renderer'),
  CameraSystem = require('../engine/system/camera-system'),

  Player = require('./assemblage/player'),
  NPC = require('./assemblage/npc'),
  Tree = require('./assemblage/tree'),
  Rock = require('./assemblage/rock'),
  Sun = require('./assemblage/sun'),
  Background = require('./assemblage/background')
;

class Application {

  constructor() {

    let engine = new CoreEngine();
    let renderer = new Renderer(1280, 900);
    let worldGeneration = new WorldGeneration( 'dS5ud2q4ta3f9q1PQ4z' );
    let spatialHashing = new SpatialHashingSystem();
    let time = new Time(renderer.stage, 0); // 9 Process time

    engine.addSystems([
      worldGeneration, // 1 Generate the world
      new AIProcessing(), // @TODO assign number
      spatialHashing,
      new CollisionDetection(spatialHashing, worldGeneration.world), // 2 Check if there's collision
      new Physics(worldGeneration.world), // 3 Based on collision, apply physics reactions
      new Control(), // 4 Get player input
      new Behavior(), // 5 Based on player input, change body vectors
      new Force(), // 6 Apply forces
      new Movement(), // 7 Move
      renderer, // 8 Render
      new CameraSystem( renderer ),
      time,
      new SkyObjectOrbitting(time.worldTime)
    ]);

    engine.ecs.addEntity(new Background());
    engine.ecs.addEntity(new Sun());
    engine.ecs.addEntity(new Player());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());

    /*
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new Tree());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new Rock());
    */

    engine.start();
  }
}

module.exports = Application;