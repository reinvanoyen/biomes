const FastSimplexNoise = require('fast-simplex-noise'),
	seedrandom = require('seedrandom'),
	curve = require('./curve'),
	biomes = require('../data/biomes.json')
;

const noise = {
	setSeed: function(seed) {

		this.rng = seedrandom(seed);
		this.rng2 = seedrandom(this.rng());
		this.rng3 = seedrandom(this.rng2());

		this.elevationGenerator = new FastSimplexNoise({
			random: this.rng,
			frequency: 0.002,
			max: 1,
			min: 0,
			octaves: 6
		});

		this.maxHeightGenerator = new FastSimplexNoise({
			random: this.rng2,
			frequency: 0.005,
			max: 1,
			min: 0,
			octaves: 5
		});

		this.moistureGenerator = new FastSimplexNoise({
			random: this.rng3,
			frequency: .002,
			max: 1,
			min: 0,
			octaves: 1
		});

		this.poiGenerator = new FastSimplexNoise({
			random: this.rng,
			frequency: 0.5,
			max: 1,
			min: 0,
			octaves: 2
		});
	},
	getElevation: function(x, y) {

		let maxHeight = this.maxHeightGenerator.in2D(x, y) + 0.75;
		let e = Math.pow(this.elevationGenerator.in2D(x, y), 3);
		//let e = this.elevationGenerator.in2D( x, y );

		return e * maxHeight;
	},
	getMoisture: function(x, y) {

		return Math.pow(this.moistureGenerator.in2D(x, y), 1);
	},
	getBiome: function(x, y) {

		let e = this.getElevation(x, y);
		let m = this.getMoisture(x, y);

		if(e < 0.1) {
			return 'water';
		}

		if(e < 0.12) {
			return 'beach';
		}

		if(e > 0.9) {
			//console.log( 'snow' );
			return 'snow';
		}

		if(e > 0.8) {

			if(m < 0.1) {
				//console.log( 'scorched' );
				return 'scorched';
			}

			if(m < 0.2) {
				//console.log( 'bare' );
				return 'bare';
			}

			if(m < 0.5) {
				//console.log( 'tundra' );
				return 'tundra';
			}

			//console.log( 'snow' );
			return 'snow';
		}

		if(e > 0.6) {
			if(m < 0.33) {
				//console.log( 'temperate_desert' );
				return 'temperate_desert';
			}

			if(m < 0.66) {
				//console.log( 'shrubland' );
				return 'shrubland';
			}

			//console.log( 'taiga' );
			return 'taiga';
		}

		if(e > 0.3) {

			if(m < 0.16) {
				//console.log( 'temperate_desert' );
				return 'temperate_desert';
			}

			if(m < 0.50) {
				//console.log( 'grassland' );
				return 'grassland';
			}

			if(m < 0.83) {
				//console.log( 'temperate_deciduous_forest' );
				return 'temperate_deciduous_forest';
			}

			//console.log( e, m );
			return 'temperate_rain_forest';
		}

		if(m < 0.16) {
			// console.log( 'subtropical_desert' );
			return 'subtropical_desert';
		}

		if(m < 0.33) {
			// console.log( 'grassland' );
			return 'grassland';
		}

		if(m < 0.66) {
			// console.log( 'tropical_seasonal_forest' );
			return 'tropical_seasonal_forest';
		}

		return 'tropical_rain_forest';
	},
	getBiomeData: function(biome) {

		return biomes[biome];
	},
	getPoi: function(x, y) {

		return this.poiGenerator.in2D(x, y) > .9;
	}
};

module.exports = noise;