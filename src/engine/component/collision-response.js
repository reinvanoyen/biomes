"use strict";

const collisionResponseTypes = require('../collision-response-types');

const CollisionResponse = {
  name: 'collisionResponse',
  defaults: {
    type: collisionResponseTypes.COLLISION_RESPONSE_BOUNCE
  }
};

module.exports = CollisionResponse;