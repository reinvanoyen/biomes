"use strict";

const CoreEngine = require('../engine/core-engine'),
  WorldGeneration = require('../engine/system/worldgeneration'),
  SpatialHashingSystem = require('../engine/system/spatial-hashing-system'),
  CollisionDetection = require('../engine/system/collision-detection'),
  CollisionResponseHandler = require('../engine/system/collision-response-handler'),
  Physics = require('../engine/system/physics'),
  Control = require('../engine/system/control'),
  Behavior = require('../engine/system/behavior'),
  Force = require('../engine/system/force'),
  Movement = require('../engine/system/movement'),
  Acceleration = require('../engine/system/acceleration'),
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
    let renderer = new Renderer(1200, 600);
    let worldGeneration = new WorldGeneration( 'dS5ud2q4ta3f9q1PQ4z' );
    let spatialHashing = new SpatialHashingSystem();
    let time = new Time(renderer.stage, 0); // 9 Process time

    engine.addSystems([
      worldGeneration, // 1 Generate the world

      new AIProcessing(),
      new Control(), // Processes input

      new Force(), // Apply forces like gravity
      new SkyObjectOrbitting(time.worldTime),

      new CollisionResponseHandler(worldGeneration.world),

      new Behavior(), // Processes behavior state
      new Acceleration(), // Update velocity with force / acceleration / mass
      new Movement(), // Update position with velocity

      spatialHashing, // Divide all entities into spatial hashing buckets based on their collision box
      new CollisionDetection(spatialHashing, worldGeneration.world), // Checks if there's collision

      new CameraSystem(renderer), // Move then world based on the camera position
      renderer, // Render everything
      time, // Move time forward
    ]);

    engine.ecs.addEntity(new Background());
    engine.ecs.addEntity(new Sun());

    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());
    engine.ecs.addEntity(new Rock());

    engine.ecs.addEntity(new Player());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
    engine.ecs.addEntity(new NPC());
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