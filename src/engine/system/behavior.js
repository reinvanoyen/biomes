"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('gl-matrix').vec2
;

class Behavior extends ECS.System {

	test(entity) {
		return entity.components.walkingbehavior;
	}

	update(entity) {

		let {walkingbehavior, body = false, collision = false} = entity.components;

		if( body && collision ) {

			if( walkingbehavior.state == 'walkingforward' ) {

				Vector2.add( body.force, body.force, Vector2.fromValues( .7, 0 ) );

			} else if( walkingbehavior.state == 'walkingbackward' ) {

				Vector2.add( body.force, body.force, Vector2.fromValues( -.7, 0 ) );

			} else if ( collision.bottom ) {

				// Lerp to make movement stop
				let lerpedForce = Vector2.clone( body.force );
				let lerpedVelocity = Vector2.clone( body.velocity );

				Vector2.lerp( lerpedForce, lerpedForce, Vector2.fromValues( 0, 0 ), 1 );
				Vector2.lerp( lerpedVelocity, lerpedVelocity, Vector2.fromValues( 0, 0 ), 1 );

				body.force[0] = lerpedForce[0];
				body.velocity[0] = lerpedVelocity[0];
			}

			if( walkingbehavior.state == 'jumping' && collision.bottom ) {

				Vector2.add( body.force, body.force, Vector2.fromValues( 0, -8 ) );
			}
		}
	}
}

module.exports = Behavior;