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

    // Update the collision box

    if (entity.components.collision) {

      let [ x, y ] = position.value;
      let [ anchorX, anchorY ] = entity.components.collision.boxAnchor;
      let width = entity.components.collision.boxWidth;
      let height = entity.components.collision.boxHeight;

      entity.components.collision.boxTopLeft = Vector2.fromValues(x - (width * anchorX), y - (height * anchorY));
      entity.components.collision.boxTopRight = Vector2.fromValues(x - (width * anchorX) + width, y - (height * anchorY));
      entity.components.collision.boxBottomRight = Vector2.fromValues(x - (width * anchorX) + width, y - (height * anchorY) + height);
      entity.components.collision.boxBottomLeft = Vector2.fromValues(x - (width * anchorX), y - (height * anchorY) + height);
    }
  }

  exit(entity) {}
}

module.exports = Movement;