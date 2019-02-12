"use strict";

const ECS = require('yagl-ecs'),
  SpatialAwareness = require('../../engine/component/spatial-awareness'),
  Sprite = require('../../engine/component/sprite'),
  Position = require('../../engine/component/position'),
  Collision = require('../../engine/component/collision'),
  CollisionResponse = require('../../engine/component/collision-response'),
  Body = require('../../engine/component/body'),
  Camera = require('../../engine/component/camera'),
  WalkingBehavior = require('../../engine/component/walkingbehavior'),
  Input = require('../../engine/component/input'),
  Vector2 = require('gl-matrix').vec2
;

class Player extends ECS.Entity {

  constructor() {

    super(null, [
      SpatialAwareness,
      Collision,
      CollisionResponse,
      Sprite,
      Position,
      Body,
      WalkingBehavior,
      Input,
      Camera
    ]);

    this.updateComponent('body', {
      bounciness: 0.5,
      maxVelocity: Vector2.fromValues(15, 30)
    });

    this.updateComponent('position', {
      value: Vector2.fromValues(0, 0)
    });
  }
}

module.exports = Player;