"use strict";

const Vector4 = require('gl-matrix').vec4;

let DARK_COLOR = Vector4.fromValues( 0, .1, .15, 1 );
let DAWN_COLOR = Vector4.fromValues( .6, .5, .6, 1 );
let LIGHT_COLOR = Vector4.fromValues( 1, 1, .9, 1 );
let DUSK_COLOR = Vector4.fromValues( 0.7, .5, .5, 1 );

let NIGHT_TIME = 23;
let DAWN_TIME = 7;
let DAY_TIME = 10;
let DUSK_TIME = 20;

let DARK_TO_DAWN_TIME = 1.0;
let DAWN_TO_LIGHT_TIME = 2.15;
let LIGHT_TO_DUSK_TIME = 1.5;
let DUSK_TO_DARK_TIME = 2.0;

class WorldTime {

	constructor() {

		this.time = 12;
		this.day = 0;
		this.ambientColor = Vector4.create();
	}

	tick() {

		this.time += 0.01;

		if( this.time > 24 ) {
			this.time = 0;
			this.day += 1;
			if( this.day > 365 ) {
				this.day = 0;
			}
		}

		// Calculate ambient color
		let outputColor = Vector4.create();
		let lerpColor = null;
		let factor = 0;

		if( this.time >= NIGHT_TIME ) {

			outputColor = Vector4.clone( DARK_COLOR );

		} else if( this.time <= DAWN_TIME ) {

			outputColor = Vector4.clone( DARK_COLOR );

			if( this.time >= ( DAWN_TIME - DARK_TO_DAWN_TIME ) ) {

				lerpColor = Vector4.clone( DAWN_COLOR );
				factor = ( this.time - ( DAWN_TIME - DARK_TO_DAWN_TIME ) / DARK_TO_DAWN_TIME );
			}

		} else if( ( this.time >= DAWN_TIME ) && ( this.time < DAY_TIME ) ) {

			outputColor = Vector4.clone( DAWN_COLOR );

			// if in transition to day
			if ( this.time >= ( DAY_TIME - DAWN_TO_LIGHT_TIME ) ) {

				lerpColor = Vector4.clone( LIGHT_COLOR );
				factor = ( this.time - ( DAY_TIME - DAWN_TO_LIGHT_TIME ) ) / DAWN_TO_LIGHT_TIME;
			}

		} else if( ( this.time >= DAY_TIME ) && ( this.time < DUSK_TIME ) ) {

			outputColor = Vector4.clone( LIGHT_COLOR );

			// if in transition to dusk
			if( this.time >= ( DUSK_TIME - LIGHT_TO_DUSK_TIME ) ) {

				lerpColor = Vector4.clone( DUSK_COLOR );
				factor = ( this.time - ( DUSK_TIME - LIGHT_TO_DUSK_TIME ) ) / LIGHT_TO_DUSK_TIME;
			}

		} else if( ( this.time >= DUSK_TIME ) && ( this.time < NIGHT_TIME ) ) {

			outputColor = Vector4.clone( DUSK_COLOR );

			if( this.time >= ( NIGHT_TIME - DUSK_TO_DARK_TIME ) ) {

				lerpColor = Vector4.clone( DARK_COLOR );
				factor = ( this.time - ( NIGHT_TIME - DUSK_TO_DARK_TIME ) ) / DUSK_TO_DARK_TIME;
			}
		}

		// Apply the calculated colors
		this.ambientColor = Vector4.clone( outputColor );

		if( lerpColor != null ) {
			Vector4.lerp( this.ambientColor, this.ambientColor, lerpColor, factor );
		}
	}

	getSeasonAmbientColor() {
		return [ 1, 1, 1, 1 ];
	}

	getTime() {
		return this.time;
	}

	getDay() {
		return this.day;
	}

	getDayAmbientColor() {
		return [ this.ambientColor[0], this.ambientColor[1], this.ambientColor[2], this.ambientColor[3] ];
	}
}

module.exports = WorldTime;