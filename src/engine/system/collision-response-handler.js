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
            entity.components.position.value = Vector2.fromValues(
              Math.round(entity.components.collision.lastNonCollidingPosition[0]),
              Math.round(entity.components.collision.lastNonCollidingPosition[1])
            );
          }

          // Let's reverse the force being applied to the body
          entity.components.body.velocity = Vector2.fromValues(
            -entity.components.body.velocity[0] * entity.components.body.bounciness,
            -entity.components.body.velocity[1] * entity.components.body.bounciness
          );

          //Vector2.add(entity.components.body.force, entity.components.body.force, collision.entityCollision.components.body.force);
          Vector2.sub(entity.components.body.velocity, entity.components.body.velocity, collision.entityCollision.components.body.velocity);

          entity.components.body.acceleration = Vector2.fromValues(0, 0);
          entity.components.body.force = Vector2.fromValues(0, 0);
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

      // @TODO bounce?
      entity.components.position.value[1] = this.world.getWorldElevation(entity.components.position.value[0]);
      entity.components.body.velocity[1] = -entity.components.body.velocity[1] * entity.components.body.bounciness;
      entity.components.body.acceleration = Vector2.fromValues(0, 0);
      entity.components.body.force = Vector2.fromValues(0, 0);
    }
  }

  exit(entity) {}
}

module.exports = CollisionReponseHandler;