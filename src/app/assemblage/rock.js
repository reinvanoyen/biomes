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
      SpatialAwareness,
      Sprite,
      Position,
      Body,
      Collision
    ]);

    //this.updateComponent('depth', { value: depth } );
    this.updateComponent('position', { value: Vector2.fromValues( 0, 0 ) } );
    this.updateComponent('sprite', {
      src: 'assets/textures/rock01.png',
      width: 100,
      height: 100,
      anchor: Vector2.fromValues(.5, 1)
    });
  }
}

module.exports = Rock;