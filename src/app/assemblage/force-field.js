"use strict";

const ECS = require('yagl-ecs');
const SpatialAwareness = require('../../engine/component/spatial-awareness');
const Sprite = require('../../engine/component/sprite');
const Position = require('../../engine/component/position');
const Collision = require('../../engine/component/collision');
const Body = require('../../engine/component/body');
const WalkingBehavior = require('../../engine/component/walkingbehavior');
const AI = require('../../engine/component/ai');
const math = require('../../engine/util/math');
const Vector2 = require('gl-matrix').vec2;

const OnCollisionApplyForce = require('../../engine/component/on-collision-apply-force');

class ForceField extends ECS.Entity {

  constructor() {

    super(null, [
      Sprite,
      SpatialAwareness,
      Position,
      Collision,
      OnCollisionApplyForce
    ]);

    this.updateComponent('sprite', {
      src: 'assets/textures/sun.png',
      width: 90,
      height: 90
    });

    this.updateComponent('collision', {
      boxWidth: 90,
      boxHeight: 90
    });

    this.updateComponent('position', {
      value: Vector2.fromValues(500, 0)
    });
  }
}

module.exports = ForceField;