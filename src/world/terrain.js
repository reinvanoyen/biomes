"use strict";

class Terrain {

	constructor( seed ) {
		
		this.posX = 0;

		this.seed = seed;

		this.noiseGen = new FastSimplexNoise( {
			frequency: 0.01,
			max: 600,
			min: 0,
			octaves: 8
		} )

		this.points = [];

		this.polygon = new PIXI.Graphics();
	}

	update() {

		this.points = [
			0, 600
		];

		for( var i = 0; i < 50; i++ )
		{
			this.points.push( i * 50 );
			this.points.push( this.noiseGen.in2D( i + this.posX, 1 ) );
		}

		this.points.push( 800, 600 );

		this.polygon
			.clear()
			.beginFill( 0x49AB84 )
			.drawPolygon( this.points )
			.endFill()
		;

		this.posX = this.posX + 0.06;
	}
}

module.exports = Terrain;