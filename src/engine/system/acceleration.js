"use strict";

const ECS = require('yagl-ecs');
const Vector2 = require('gl-matrix').vec2;

class Acceleration extends ECS.System {

  test(entity) {
    return entity.components.position && entity.components.body;
  }

  update(entity) {

    let {body} = entity.components;

    Vector2.scale(body.acceleration, body.force, body.mass);
    Vector2.add(body.velocity, body.velocity, body.acceleration);

    // Clamp velocity
    Vector2.min(body.velocity, body.velocity, body.maxVelocity);

    let reversedMaxVelocity = Vector2.create();
    Vector2.negate(reversedMaxVelocity, body.maxVelocity);
    Vector2.max(body.velocity, body.velocity, reversedMaxVelocity);
    Vector2.min(body.velocity, body.velocity, body.maxVelocity);
  }

  exit(entity) {}
}

module.exports = Acceleration;