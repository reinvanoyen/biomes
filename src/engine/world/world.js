"use strict";

const PIXI = require('pixi.js'),
	noise = require('../util/noise'),
	math = require('../util/math'),
	Vector2 = require('gl-matrix').vec2,
	MessageManager = require('../messaging/messagemanager')
;

class World {

	constructor(seed, stage) {

		noise.setSeed( seed );

		this.tileSize = 80;
		this.generateTileCount = 20;

		this.currentTile = 0;
		this.points = [];

		this.verticesX = 20;
		this.verticesY = 4;

		this.isGenerated = false;
	}

	getWorldElevation(x) {
		x = x / this.tileSize;
		return this.getElevationAt(x);
	}

	getElevationAt(x) {
		return -noise.getElevation( x, 1 ) * 3000;
	}

	render(position) {

		let currentTile = Math.floor( position[0] / this.tileSize );

		if( ! this.isGenerated ) {
			this.generate();
			this.currentTile = currentTile;
		}

		if( this.currentTile != currentTile ) {
			this.generate();
			this.currentTile = currentTile;
		}
	}

	generate() {
		this.generateMesh();
		this.spawnProps();
		this.isGenerated = true;
	}

	generateMesh() {

		// this.points = [];
		// this.debug.clear();
		//
		// let startTile = this.currentTile - this.generateTileCount / 2,
		// 	endTile = this.currentTile + this.generateTileCount / 2
		// ;
		//
		// for( let y = 0; y < this.verticesY; y++ ) {
		// 	for( let x = startTile; x < endTile; x++ ) {
		// 		let height = this.getElevationAt(x) + ( y * this.tileSize );
		// 		this.points.push( Vector2.fromValues( x * this.tileSize, height ) );
		// 	}
		// }
		//
		// // Copy the points over to the mesh
		// this.points.forEach( ( v, i ) => {
		//
		// 	i *= 2;
		//
		// 	this.mesh.vertices[ i ] = v[0];
		// 	this.mesh.vertices[ i + 1 ] = v[1];
		//
		// 	this.debug.beginFill(0xff0022);
		// 	this.debug.drawCircle( v[0], v[1], 5 );
		// 	this.debug.endFill();
		// } );
		//
		// this.isGenerated = true;
	}

	spawnProps() {

		let height = this.getElevationAt( this.currentTile );

		if( Math.abs( height ) > 500 ) {

			MessageManager.trigger( 'world::spawnEntity', {
				position: Vector2.fromValues( this.currentTile * this.tileSize, 0 );
			} );
		}

		// let startTile = this.currentTile - this.generateTileCount / 2,
		// 	endTile = this.currentTile + this.generateTileCount / 2
		// ;
		//
		// for( let y = 0; y < this.verticesY; y++ ) {
		//
		// 	for( let x = startTile; x < endTile; x++ ) {
		//
		// 		let height = this.getElevationAt( x ) + ( y * this.tileSize );
		//
		// 		MessageManager.trigger( 'world::spawnEntity', {
		// 			position: Vector2.fromValues( x * this.tileSize, y * this.tileSize )
		// 		} );
		// 	}
		// }
	}
}

module.exports = World;