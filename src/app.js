"use strict";

var PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),
	RenderingSystem = require('./system/renderingsystem'),
	WorldGenerationSystem = require('./system/worldgenerationsystem'),
	MovementSystem = require('./system/movementsystem'),
	Position = require('./component/position'),
	Sprite = require('./component/sprite'),
	Camera = require('./component/camera'),
	PlayerControllable = require('./component/playercontrollable'),
	math = require('./util/math')
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
		this.ecs.addSystem( new RenderingSystem( this.stage ) );
		this.ecs.addSystem( new WorldGenerationSystem( this.stage ) );
		this.ecs.addSystem( new MovementSystem() );

		this.populateWithEntities(10);
		this.spawnPlayer();
		this.start();
	}

	spawnPlayer() {

		let player = new ECS.Entity( 'player', [
			Sprite,
			Position,
			Camera,
			PlayerControllable
		] );

		player.updateComponent( 'pos', {
			x: 0,
			y: 0
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
