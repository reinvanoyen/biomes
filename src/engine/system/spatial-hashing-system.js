"use strict";

const ECS = require('yagl-ecs');
const Vector2 = require('gl-matrix').vec2;

class SpatialHashingSystem extends ECS.System {

  constructor() {
    super();
    this.buckets = {};
  }

  generateSpatialHashes(entity) {

    return [
      Math.floor(entity.components.collision.boxTopLeft[0] / 100)+'-'+Math.floor(entity.components.collision.boxTopLeft[1] / 100), // topLeft
      Math.floor(entity.components.collision.boxTopRight[0] / 100)+'-'+Math.floor(entity.components.collision.boxTopRight[1] / 100), // topRight
      Math.floor(entity.components.collision.boxBottomRight[0] / 100)+'-'+Math.floor(entity.components.collision.boxBottomRight[1] / 100), // bottomRight
      Math.floor(entity.components.collision.boxBottomLeft[0] / 100)+'-'+Math.floor(entity.components.collision.boxBottomLeft[1] / 100) // bottomLeft
    ];
  }

  addEntityToBucket(hash, entity) {

    if (!this.buckets[hash]) {
      this.buckets[hash] = [];
    }

    this.buckets[hash].push(entity);
    entity.components.spatialAwareness.isDirty = false;
  }

  addEntityToBuckets(hashes, entity) {
    hashes.filter((value, index, array) => {

      // Only keep unique values
      return array.indexOf(value) === index;
    }).forEach((hash) => {

      // Add the entity to all buckets
      this.addEntityToBucket(hash, entity);
    });
  }

  removeDirtyEntitiesFromBucket(hash) {
    this.buckets[hash] = this.buckets[hash].filter((e) => {
      return ! e.components.spatialAwareness.isDirty;
    });
  }

  test(entity) {
    return entity.components.spatialAwareness && entity.components.collision && entity.components.position;
  }

  exit(entity) {

    let { spatialAwareness } = entity.components;

    // @TODO optimize this
    spatialAwareness.isDirty = true;
    this.removeDirtyEntitiesFromBucket(spatialAwareness.topLeft);
    spatialAwareness.isDirty = true;
    this.removeDirtyEntitiesFromBucket(spatialAwareness.topRight);
    spatialAwareness.isDirty = true;
    this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomRight);
    spatialAwareness.isDirty = true;
    this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomLeft);
  }

  enter(entity) {

    let hashes = this.generateSpatialHashes(entity);

    hashes.filter((value, index, array) => {

      // Only keep unique values
      return array.indexOf(value) === index;
    }).forEach((hash) => {

      // Add the entity to all buckets
      this.addEntityToBucket(hash, entity);
    });
  }

  update(entity) {

    let {spatialAwareness} = entity.components;

    // Generate hashes
    let hashes = this.generateSpatialHashes(entity);

    if (
      hashes[0] !== spatialAwareness.topLeft ||
      hashes[1] !== spatialAwareness.topRight ||
      hashes[2] !== spatialAwareness.bottomRight ||
      hashes[3] !== spatialAwareness.bottomLeft
    ) {

      spatialAwareness.isDirty = true;
      this.removeDirtyEntitiesFromBucket(spatialAwareness.topLeft);
      spatialAwareness.isDirty = true;
      this.removeDirtyEntitiesFromBucket(spatialAwareness.topRight);
      spatialAwareness.isDirty = true;
      this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomRight);
      spatialAwareness.isDirty = true;
      this.removeDirtyEntitiesFromBucket(spatialAwareness.bottomLeft);

      entity.components.spatialAwareness.topLeft = hashes[0];
      entity.components.spatialAwareness.topRight = hashes[1];
      entity.components.spatialAwareness.bottomRight = hashes[2];
      entity.components.spatialAwareness.bottomLeft = hashes[3];

      this.addEntityToBuckets(hashes, entity);
    }
  }

  postUpdate() {
    // console.log( this.buckets );
  }
}

module.exports = SpatialHashingSystem;