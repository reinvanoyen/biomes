"use strict";

const ECS = require('yagl-ecs');
const Vector2 = require('gl-matrix').vec2;

class Movement extends ECS.System {

  test(entity) {
    return entity.components.position && entity.components.body;
  }

  update(entity) {

    let {position, body} = entity.components;

    entity.components.position.previous = position.value;

    // Apply velocity
    Vector2.add(position.value, position.value, body.velocity);
  }

  exit(entity) {}
}

module.exports = Movement;