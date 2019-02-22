"use strict";

const ECS = require('yagl-ecs');
const Vector2 = require('gl-matrix').vec2;

class CollisionReponseHandler extends ECS.System {

  constructor(world) {

    super();
    this.world = world;
  }

  test(entity) {
    return entity.components.collision && (
      entity.components.onCollisionBounce ||
      entity.components.onCollisionApplyForce
    );
  }

  update(entity) {

    let { collision } = entity.components;

    if (collision.entityCollision) {

      if (entity.components.onCollisionBounce && collision.entityCollision.components.onCollisionBounce) {

        if (entity.components.body) {

          if (entity.components.position) {

            // We try to set it to the last non colliding position
            entity.components.position.value = Vector2.clone(entity.components.collision.lastNonCollidingPosition);
          }

          // Let's reverse the force being applied to the body
          entity.components.body.velocity = Vector2.fromValues(
            -entity.components.body.velocity[0] * entity.components.body.bounciness,
            -entity.components.body.velocity[1] * entity.components.body.bounciness
          );

          Vector2.scaleAndAdd(
            entity.components.body.force,
            entity.components.body.force,
            collision.entityCollision.components.body.force,
            entity.components.body.mass
          );
        }
      }

      if (entity.components.onCollisionApplyForce) {

        if (collision.entityCollision.components.body) {

          // Apply force
          Vector2.add(
            collision.entityCollision.components.body.force,
            collision.entityCollision.components.body.force,
            entity.components.onCollisionApplyForce.force
          );
        }
      }
    }

    if (collision.groundCollision && entity.components.position && entity.components.body) {

      // Lerp to stop movement
      // let lerpedForce = Vector2.clone(entity.components.body.force);
      // let lerpedVelocity = Vector2.clone(entity.components.body.velocity);
      //
      // Vector2.lerp(lerpedForce, lerpedForce, Vector2.fromValues(0, 0), 1);
      // Vector2.lerp(lerpedVelocity, lerpedVelocity, Vector2.fromValues(0, 0), 1);
      //
      // entity.components.body.force[0] = lerpedForce[0];
      // entity.components.body.velocity[0] = lerpedVelocity[0];

      entity.components.position.value[1] = this.world.getWorldElevation(entity.components.position.value[0]);
      // entity.components.body.velocity[1] = -entity.components.body.velocity[1] * entity.components.body.bounciness;
      entity.components.body.velocity[1] = 0;
      entity.components.body.force[1] = 0;
      // entity.components.body.force = Vector2.fromValues(0, 0);
      // entity.components.body.acceleration = Vector2.fromValues(0, 0);
    }
  }

  exit(entity) {}
}

module.exports = CollisionReponseHandler;