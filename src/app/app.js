"use strict";

const CoreEngine = require('../engine/core-engine'),
  WorldGeneration = require('../engine/system/worldgeneration'),
  SpatialHashingSystem = require('../engine/system/spatial-hashing-system'),
  CollisionDetection = require('../engine/system/collision-detection'),
  CollisionBoxMovement = require('../engine/system/collision-box-movement'),
  CollisionResponseHandler = require('../engine/system/collision-response-handler'),
  Physics = require('../engine/system/physics'),
  Control = require('../engine/system/control'),
  Behavior = require('../engine/system/behavior'),
  Grounded = require('../engine/system/grounded'),
  Force = require('../engine/system/force'),
  Movement = require('../engine/system/movement'),
  Acceleration = require('../engine/system/acceleration'),
  AIProcessing = require('../engine/system/aiprocessing'),
  Time = require('../engine/system/time'),
  SkyObjectOrbitting = require('../engine/system/skyobjectorbitting'),

  Renderer = require('../engine/system/renderer'),
  CameraSystem = require('../engine/system/camera-system'),

  Player = require('./assemblage/player'),
  ForceField = require('./assemblage/force-field'),
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

      new Grounded(),
      new Behavior(), // Processes behavior state

      new Acceleration(), // Update velocity with force / acceleration / mass
      new Movement(), // Update position with velocity

      new CollisionBoxMovement(),
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
    engine.ecs.addEntity(new NPC(-500));
    engine.ecs.addEntity(new NPC(-750));
    engine.ecs.addEntity(new NPC(-950));

    engine.ecs.addEntity(new ForceField(200, 0));
    engine.ecs.addEntity(new ForceField(300, -100));
    engine.ecs.addEntity(new ForceField(400, -200));
    engine.ecs.addEntity(new ForceField(500, -300));
    engine.ecs.addEntity(new ForceField(600, -400));
    engine.ecs.addEntity(new ForceField(700, -500));
    engine.ecs.addEntity(new ForceField(800, -600));
    engine.ecs.addEntity(new ForceField(900, 700));
    engine.ecs.addEntity(new ForceField(1500, 0));

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