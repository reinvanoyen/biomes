"use strict";

var PIXI = require('pixi.js'),
	EntityManager = require('./world/entitymanager'),
	Player = require('./world/player'),
	Terrain = require('./world/terrain')

class App {

	constructor() {

		// install renderer
		this.renderer = new PIXI.WebGLRenderer( 800, 600 )
		document.body.appendChild( this.renderer.view )

		// install stage
		this.stage = new PIXI.Container()
		this.stage.interactive = true

		// install ticker
		this.ticker = PIXI.ticker.shared
		this.ticker.autoStart = false
		this.ticker.stop()

		// start registering entities
		this.entitymanager = new EntityManager( this )

		this.player = new Player();
		this.terrain = new Terrain();

		this.entitymanager.add( this.player )
		this.entitymanager.add( this.terrain )

		this.start()
	}

	start() {

		this.ticker.start()

		this.ticker.add( ( time ) => {

			this.entitymanager.update()
			this.renderer.render( this.stage )
		} )
	}
}

module.exports = App;