"use strict";

const ECS = require('yagl-ecs');

class SpatialHashingSystem extends ECS.System {

  constructor() {
    super();
    this.buckets = {};
  }

  generateSpatialHash(entity) {
    return Math.floor(entity.components.position.value[0] / 10)+'-'+Math.floor(entity.components.position.value[1] / 10);
  }

  addEntityToBucket(hash, entity) {

    if (! this.buckets[hash]) {
      this.buckets[hash] = [];
    }

    this.buckets[hash].push(entity);

    // Update the entity with new hash and mark as non-dirty
    entity.components.spatialAwareness.hash = hash;
    entity.components.spatialAwareness.isDirty = false;
  }

  test(entity) {
    return entity.components.spatialAwareness && entity.components.position;
  }

  enter(entity) {
    this.addEntityToBucket(this.generateSpatialHash(entity), entity);
  }

  update(entity) {

    let {spatialAwareness} = entity.components;

    let hash = this.generateSpatialHash(entity);

    // Check if the hash of the entity should be changed
    if (spatialAwareness.hash !== hash) {

      // Mark the entity as dirty
      spatialAwareness.isDirty = true;

      // Check if the bucket for the current hash exists
      if (this.buckets[spatialAwareness.hash]) {

        // Filter out the entity
        this.buckets[spatialAwareness.hash] = this.buckets[spatialAwareness.hash].filter((e) => {
          return ! e.components.spatialAwareness.isDirty;
        });
      }

      this.addEntityToBucket(hash, entity);
    }
  }

  postUpdate() {
    // console.log( this.buckets );
  }
}

module.exports = SpatialHashingSystem;