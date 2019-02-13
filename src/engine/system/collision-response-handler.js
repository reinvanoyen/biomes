"use strict";

const ECS = require('yagl-ecs');
const CollisionResponseTypes = require('../collision-response-types');
const Vector2 = require('gl-matrix').vec2;

class CollisionReponseHandler extends ECS.System {

  constructor(world) {

    super();
    this.world = world;
  }

  test(entity) {
    return entity.components.collision && entity.components.collisionResponse;
  }

  update(entity) {

    let { collision, collisionResponse } = entity.components;

    if (collision.groundCollision && entity.components.position) {
      entity.components.position.value[1] = this.world.getWorldElevation(entity.components.position.value[0]);
    }
    
    if (collision.entityCollision) {

      if (collisionResponse.type === CollisionResponseTypes.COLLISION_RESPONSE_BOUNCE) {

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

          entity.components.body.force = Vector2.fromValues(0, 0);
          entity.components.body.acceleration = Vector2.fromValues(0, 0);
        }
      }
    }
  }

  exit(entity) {}
}

module.exports = CollisionReponseHandler;