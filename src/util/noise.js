var FastSimplexNoise = require('fast-simplex-noise'),
	seedrandom = require('seedrandom')
;

var seed = seedrandom('hello');

var noiseGenerator = new FastSimplexNoise( {
	random: seed,
	frequency: 0.01,
	max: 1,
	min: 0,
	octaves: 4
} );

var noise = {
	terrain: function( x, y ) {

		return noiseGenerator.in2D( x, y );
	}
};

module.exports = noise;
