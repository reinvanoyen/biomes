"use strict";

var SimplexNoise = require('simplex-noise');
var Alea = require('alea');

var RedNoise = {
	create: function( seed, id ) {

		var o = Object.create( this );

		o.gen = new SimplexNoise(new Alea(seed));
		o.canvas = document.getElementById(id);
		o.ctx = o.canvas.getContext('2d');
		o.width = o.canvas.width;
		o.height = o.canvas.height;

		o.start();

		return o;
	},
	noise: function( x, y ) {

		// Rescale from -1.0:+1.0 to 0.0:1.0

		return this.gen.noise2D( x, y ) * 0.5 + 0.5;
	},
	noise02: function( x, y ) {

		return 1 * this.noise( .01 * x, .01 * y )
			+ .5 * this.noise( .02 * x, .02 * y )
			+ .25 * this.noise( .04 * x, .04 * y )
		;
	},
	start: function() {

		var imgdata = this.ctx.getImageData( 0, 0, this.width, this.height ),
			data = imgdata.data
		;

		for( var x = 0; x < this.width; x++ ) {

			for( var y = 0; y < this.height; y++ ) {

				var r = this.noise02( x, y );

				data[ ( x + y * this.height ) * 4 + 0 ] = r * 100;
				data[ ( x + y * this.height ) * 4 + 1 ] = 30;
				data[ ( x + y * this.height ) * 4 + 2 ] = 50;
				data[ ( x + y * this.height ) * 4 + 3 ] = 255;
			}
		}

		this.ctx.putImageData( imgdata, 0, 0 );
	}
};

module.exports = RedNoise;