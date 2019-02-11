"use strict";

const ECS = require('yagl-ecs'),
  Vector2 = require('gl-matrix').vec2
;

class SkyObjectOrbitting extends ECS.System {

  constructor(time) {
    super();
    this.time = time;
  }

  test(entity) {
    return entity.components.skyobj && entity.components.position;
  }

  update(entity) {

    let {position} = entity.components;

    position.value = Vector2.fromValues(
      Math.cos( this.time.getTimestamp() / 10 ) * 800,
      Math.sin( this.time.getTimestamp() / 10 ) * 800
    );

    position.value[0] += 500;
  }

  exit(entity) {}
}

module.exports = SkyObjectOrbitting;