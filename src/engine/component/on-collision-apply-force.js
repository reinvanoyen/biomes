"use strict";

const Vector2 = require('gl-matrix').vec2;

const OnCollisionApplyForce = {
  name: 'onCollisionApplyForce',
  defaults: {
    force: Vector2.fromValues(1, 0)
  }
};

module.exports = OnCollisionApplyForce;