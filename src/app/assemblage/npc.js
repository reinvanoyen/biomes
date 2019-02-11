"use strict";

const ECS = require('yagl-ecs'),
  SpatialAwareness = require('../../engine/component/spatial-awareness'),
  Sprite = require('../../engine/component/sprite'),
  Position = require('../../engine/component/position'),
  Collision = require('../../engine/component/collision'),
  Body = require('../../engine/component/body'),
  WalkingBehavior = require('../../engine/component/walkingbehavior'),
  Camera = require('../../engine/component/camera'),
  AI = require('../../engine/component/ai'),
  math = require('../../engine/util/math'),
  Vector2 = require('gl-matrix').vec2,
  Depth = require('../../engine/component/depth'),
  Input = require('../../engine/component/input')
;

class NPC extends ECS.Entity {

  constructor() {

    super(null, [
      SpatialAwareness,
      Sprite,
      Position,
      Body,
      Collision,
      WalkingBehavior
      // AI
    ]);

    this.updateComponent('body', {
      bounciness: 0.0,
      maxVelocity: Vector2.fromValues( math.randFloatBetween(1, 10), 15 )
    });

    this.updateComponent('position', {
      value: Vector2.fromValues( math.randFloatBetween(-1000, 1000), 0 )
    });
  }
}

module.exports = NPC;