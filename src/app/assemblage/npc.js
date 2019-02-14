"use strict";

const ECS = require('yagl-ecs');
const SpatialAwareness = require('../../engine/component/spatial-awareness');
const Sprite = require('../../engine/component/sprite');
const Position = require('../../engine/component/position');
const Collision = require('../../engine/component/collision');
const CollisionResponse = require('../../engine/component/collision-response');
const Body = require('../../engine/component/body');
const WalkingBehavior = require('../../engine/component/walkingbehavior');
const math = require('../../engine/util/math');
const Vector2 = require('gl-matrix').vec2;
const Input = require('../../engine/component/input');
const AI = require('../../engine/component/ai');

class NPC extends ECS.Entity {

  constructor() {

    super(null, [
      SpatialAwareness,
      Sprite,
      Position,
      Body,
      Collision,
      CollisionResponse,
      AI,
      WalkingBehavior
    ]);

    this.updateComponent('sprite', {
      src: 'assets/textures/werner.png',
      width: 55,
      height: 90
    });

    this.updateComponent('collision', {
      boxWidth: 55,
      boxHeight: 90
    });

    this.updateComponent('body', {
      bounciness: .25,
      maxVelocity: Vector2.fromValues(20, 30)
    });

    this.updateComponent('position', {
      value: Vector2.fromValues(math.randFloatBetween(-250, 250), math.randFloatBetween(-1000, -10000))
    });

    /*
    this.updateComponent('position', {
      value: Vector2.fromValues(math.randFloatBetween(-1000, 1000), math.randFloatBetween(-1000, 1000))
    });
    */
  }
}

module.exports = NPC;