"use strict";

var SimplexNoise = require('simplex-noise');
var Alea = require('alea');

var Line = {
	create: function( seed, id ) {

		var o = Object.create( this );

		o.gen = new SimplexNoise(new Alea(seed));
		o.canvas = document.getElementById(id);
		o.ctx = o.canvas.getContext('2d');
		o.width = o.canvas.width;
		o.height = o.canvas.height;

		o.posX = 0;

		o.start();

		return o;
	},
	noise01: function( x, y ) {

		return this.gen.noise2D( x, y ) * 0.5 + 0.5;
	},
	noise02: function( x, y ) {

		return 1 * this.noise01( x / 100, y / 100 )
			+ .5 * this.noise01( x / 50, y / 50 )
			+ .25 * this.noise01( x / 25, y / 25 )
		;
	},
	noise03: function( x, y ) {

		return Math.pow( this.noise02( x, y ), 1 );
	},
	start: function() {

		var that = this;

		requestAnimationFrame( function() {

			that.start();
		} );

		this.render();
	},
	render: function() {

		this.posX++;

		this.ctx.clearRect( 0, 0, this.width, this.height );

		this.ctx.beginPath();

		for( var x = 0; x < this.width; x++ )
		{
			var r = this.noise03( x + this.posX, 1 );

			this.ctx.lineTo( x, r * 150 );
			this.ctx.lineTo( x, this.height );
		}

		this.ctx.stroke();
	}
};

module.exports = Line;