"use strict";

var PIXI = require('pixi.js'),
	RenderingSystem = require('./system/renderingsystem'),
	WorldSystem = require('./system/worldsystem'),
	ECS = require('yagl-ecs'),
	Position = require('./component/position'),
	Sprite = require('./component/sprite'),
	Camera = require('./component/camera'),
	World = require('./component/world'),
	math = require('./util/math'),
	FastSimplexNoise = require('fast-simplex-noise')
;

class App {

	constructor() {

		// install renderer
		this.renderer = new PIXI.WebGLRenderer( 800, 600 );
		this.renderer.backgroundColor = 0x10453E;
		document.body.appendChild( this.renderer.view );

		// install stage
		this.stage = new PIXI.Container();
		this.stage.interactive = true;

		// install ticker
		this.ticker = PIXI.ticker.shared;
		this.ticker.autoStart = false;
		this.ticker.stop();

		// install ECS
		this.ecs = new ECS();
		this.ecs.addSystem(new RenderingSystem(this.stage));
		this.ecs.addSystem(new WorldSystem(this.stage));

		this.populateWithEntities(10);
		this.buildWorld();
		this.spawnPlayer();
		this.start();
	}

	buildWorld() {

		let world = new ECS.Entity( 'world', [
			World
		] );

		this.ecs.addEntity(world);
	}

	spawnPlayer() {

		let player = new ECS.Entity( 'player', [
			Sprite,
			Position,
			Camera
		] );

		player.updateComponent( 'pos', {
			x: math.randBetween(0,800),
			y: math.randBetween(0,600)
		} );

		this.ecs.addEntity(player);
	}

	populateWithEntities( n ) {
		
		for( var i = 0; i < n; i++ )
		{
			let entity = new ECS.Entity( 'e' + i, [
				Sprite,
				Position
			] );

			entity.updateComponent( 'pos', {
				x: math.randBetween(0,800),
				y: math.randBetween(0,600)
			} );

			this.ecs.addEntity(entity);
		}
	}

	start() {

		this.ticker.start();

		this.ticker.add( ( time ) => {

			this.ecs.update();
			this.renderer.render( this.stage );
		} );
	}
}

module.exports = App;
