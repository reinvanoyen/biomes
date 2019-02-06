"use strict";

let ECS = require('yagl-ecs'),
  Sprite = require('../../engine/component/sprite'),
  Position = require('../../engine/component/position'),
  Collision = require('../../engine/component/collision'),
  Body = require('../../engine/component/body'),
  math = require('../../engine/util/math'),
  Depth = require('../../engine/component/depth'),
  Vector2 = require('gl-matrix').vec2
  ;

class Tree extends ECS.Entity {

  constructor() {

    super( null, [
      Sprite,
      Position,
      Body,
      Collision,
      Depth
    ]);

    this.updateComponent('depth', {
      value: -5
    });

    this.updateComponent('position', {
      value: Vector2.fromValues( 500, 0 )
    });

    this.updateComponent('sprite', {
      src: 'assets/textures/tree0' + math.randBetween( 1, 4 ) + '.png',
      width: null,
      height: null,
      anchor: Vector2.fromValues(.5, 1)
    });
  }
}

module.exports = Tree;