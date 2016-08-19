"use strict";

var PIXI = require('pixi.js'),
	ECS = require('yagl-ecs'),
	RenderingSystem = require('./system/renderingsystem'),
	WorldGenerationSystem = require('./system/worldgenerationsystem'),
	MovementSystem = require('./system/movementsystem'),
	Position = require('./component/position'),
	Sprite = require('./component/sprite'),
	Camera = require('./component/camera'),
	Debug = require('./component/debug'),
	PlayerControllable = require('./component/playercontrollable'),
	math = require('./util/math'),
	noise = require('./util/noise')
;

class App {

	constructor() {

		// install renderer
		this.renderer = new PIXI.WebGLRenderer( 800, 600 );
		this.renderer.backgroundColor = 0x7BCAF2;
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
		this.ecs.addSystem( new WorldGenerationSystem( this.stage, '5ds45ds4' ) );
		this.ecs.addSystem( new MovementSystem() );

		this.spawnPlayer();
		this.start();
	}

	spawnPlayer() {

		let player = new ECS.Entity( 'player', [
			Sprite,
			Position,
			Camera,
			PlayerControllable,
			Debug
		] );

		player.updateComponent( 'pos', {
			x: math.randBetween( 0, 1000000 ),
			y: 300
		} );

		/*
		setInterval( () => {

			player.updateComponent( 'pos', {
				x: math.randBetween( 0, 1000000 )
			} );
		}, 50 );
		*/

		this.ecs.addEntity(player);
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
