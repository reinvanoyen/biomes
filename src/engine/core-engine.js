"use strict";

const PIXI = require('pixi.js'),
  ECS = require('yagl-ecs'),
  MessageManager = require('./messaging/messagemanager')
;

class CoreEngine {

  constructor() {

    // install ticker
    this.ticker = PIXI.ticker.shared;
    this.ticker.autoStart = false;
    this.ticker.stop();

    // install ECS
    this.ecs = new ECS();
  }

  addSystems(systems) {
    systems.forEach( s => this.ecs.addSystem( s ) );
  }

  start() {

    this.ticker.start();

    this.ticker.add(time => {
      MessageManager.process_queue();
      this.ecs.update();
    });
  }
}

module.exports = CoreEngine;