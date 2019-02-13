"use strict";

const PIXI = require('pixi.js');
const fs = require('fs');

class Ambient extends PIXI.Filter {

  constructor() {
    super(
      // vertex shader
      '',
      // fragment shader
      fs.readFileSync(__dirname + '/ambient.frag', 'utf8')
    );

    this.ambientColor = [ 1, 1, 0.9, 1 ];
  }

  get ambientColor()
  {
    return this.uniforms.ambientColor;
  }

  set ambientColor(ambientColorValue)
  {
    this.uniforms.ambientColor = ambientColorValue;
  }
}

module.exports = Ambient;