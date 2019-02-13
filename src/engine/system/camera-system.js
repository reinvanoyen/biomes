"use strict";

const ECS = require('yagl-ecs');
const MessageManager = require('../messaging/messagemanager');

class CameraSystem extends ECS.System {

  constructor(renderer) {

    super();
    this.renderer = renderer;
  }

  test(entity) {
    return entity.components.camera && entity.components.position;
  }

  enter(entity) {
    MessageManager.trigger('camera::set', {
      entity: entity
    });
  }

  update(entity) {

    let {camera, position} = entity.components;

    // Render layers
    for (let depth in this.renderer.layers) {

      let depthFactor = 1 + depth / 10;
      depthFactor = Math.max(0.1, depthFactor);

      this.renderer.layers[depth].position.x = -position.value[0] * depthFactor + (this.renderer.width / 2) + camera.offset[0];
      this.renderer.layers[depth].position.y = -position.value[1] + depth * 10 + (this.renderer.height / 2) + camera.offset[1];
    }
  }
}

module.exports = CameraSystem;