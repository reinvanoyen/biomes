"use strict";

const ECS = require('yagl-ecs');

class CollisionDetection extends ECS.System {

  constructor(spatialHashingSystem, world) {

    super();
    this.world = world;
    this.spatialHashingSystem = spatialHashingSystem;
  }

  test(entity) {
    return entity.components.position && entity.components.collision && entity.components.spatialAwareness;
  }

  update(entity) {

    let {spatialAwareness, position, collision} = entity.components;

    // Check spatial hash buckets for collisions with other entities

    let hashes = [
      spatialAwareness.topLeft,
      spatialAwareness.topRight,
      spatialAwareness.bottomRight,
      spatialAwareness.bottomLeft
    ].filter((value, index, array) => {

      // Only keep unique buckets
      return array.indexOf(value) === index;
    });

    let entities = [];

    hashes.forEach((hash) => {
      entities = entities.concat(this.spatialHashingSystem.buckets[hash]);
    });

    entity.components.collision.entityCollision = false;

    entities.forEach((otherEntity) => {

      // AABB collision detection
      if (
        entity.id !== otherEntity.id &&
        collision.boxTopRight[0] >= otherEntity.components.collision.boxTopLeft[0] &&
        collision.boxTopLeft[0] <= otherEntity.components.collision.boxTopRight[0] &&
        collision.boxBottomLeft[1] >= otherEntity.components.collision.boxTopLeft[1] &&
        collision.boxTopLeft[1] <= otherEntity.components.collision.boxBottomLeft[1]
      ) {
        entity.components.collision.entityCollision = true;
      }
    });

    // Check for ground collision
    let elevation = this.world.getWorldElevation(position.value[0]);

    entity.components.collision.groundCollision = (position.value[1] >= elevation);

    if (! entity.components.collision.entityCollision) {
      entity.components.collision.lastNonCollidingPosition = entity.components.position.value;
    }
  }

  exit(entity) {}
}

module.exports = CollisionDetection;