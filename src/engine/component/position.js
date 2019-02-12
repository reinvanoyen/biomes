"use strict";

const Vector2 = require('gl-matrix').vec2;

const Position = {
  name: 'position',
  getDefaults: function() {
    return {
      value: Vector2.fromValues(0.0, 0.0),
      previous: Vector2.fromValues(0.0, 0.0)
    };
  }
};

module.exports = Position;