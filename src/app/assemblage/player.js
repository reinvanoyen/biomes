"use strict";

const ECS = require('yagl-ecs'),
  SpatialAwareness = require('../../engine/component/spatial-awareness'),
  Sprite = require('../../engine/component/sprite'),
  Position = require('../../engine/component/position'),
  Collision = require('../../engine/component/collision'),
  OnCollisionBounce = require('../../engine/component/on-collision-bounce'),
  Body = require('../../engine/component/body'),
  Camera = require('../../engine/component/camera'),
  WalkingBehavior = require('../../engine/component/walkingbehavior'),
  Input = require('../../engine/component/input'),
  Vector2 = require('gl-matrix').vec2
;

const AI = require('../../engine/component/ai');

class Player extends ECS.Entity {

  constructor() {

    super(null, [
      SpatialAwareness,
      Collision,
      OnCollisionBounce,
      Sprite,
      Position,
      Body,
      WalkingBehavior,
      Input,
      Camera
    ]);

    this.updateComponent('body', {
      bounciness: 0.25,
      maxVelocity: Vector2.fromValues(100, 15)
    });

    this.updateComponent('position', {
      value: Vector2.fromValues(0, 0)
    });

    this.updateComponent('camera', {
      offset: Vector2.fromValues(0, 250)
    });
  }
}

module.exports = Player;