"use strict";

let ECS = require('yagl-ecs'),
  SpatialAwareness = require('../../engine/component/spatial-awareness'),
  Sprite = require('../../engine/component/sprite'),
  Position = require('../../engine/component/position'),
  Collision = require('../../engine/component/collision'),
  Body = require('../../engine/component/body'),
  math = require('../../engine/util/math'),
  Depth = require('../../engine/component/depth'),
  Camera = require('../../engine/component/camera'),
  Vector2 = require('gl-matrix').vec2
;

class Rock extends ECS.Entity {

  constructor(depth) {

    super(null, [
      Sprite,
      Position
    ]);

    this.updateComponent('position', {
      value: Vector2.fromValues(math.randFloatBetween(-1000, 1000), 0)
    });

    this.updateComponent('sprite', {
      src: 'assets/textures/rock01.png',
      width: 200,
      height: 212,
      anchor: Vector2.fromValues(.5, 1)
    });
  }
}

module.exports = Rock;