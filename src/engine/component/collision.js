"use strict";

const Vector2 = require('gl-matrix').vec2;

const Collision = {
  name: 'collision',
  defaults: {
    boxWidth: 45,
    boxHeight: 90,
    boxAnchor: Vector2.fromValues(0.5, 1),
    boxTopLeft: Vector2.fromValues(0.0, 0.0),
    boxTopRight: Vector2.fromValues(0.0, 0.0),
    boxBottomRight: Vector2.fromValues(0.0, 0.0),
    boxBottomLeft: Vector2.fromValues(0.0, 0.0),
    top: false,
    right: false,
    bottom: false,
    left: false
  }
};

module.exports = Collision;