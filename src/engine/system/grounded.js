"use strict";

const ECS = require('yagl-ecs'),
  Vector2 = require('gl-matrix').vec2
;

class Grounded extends ECS.System {

  test(entity) {
    return entity.components.body && entity.components.collision;
  }

  update(entity) {

    let {body, collision, walkingbehavior} = entity.components;

    if (collision.groundCollision) {

      if (! walkingbehavior || walkingbehavior.state === 'idle') {

        let lerpedForce = Vector2.clone(body.force);
        let lerpedVelocity = Vector2.clone(body.velocity);

        Vector2.lerp(lerpedForce, lerpedForce, Vector2.fromValues(0, 0), .5);
        Vector2.lerp(lerpedVelocity, lerpedVelocity, Vector2.fromValues(0, 0), .5);

        body.force[0] = lerpedForce[0];
        body.velocity[0] = lerpedVelocity[0];
      }
    }
  }
}

module.exports = Grounded;