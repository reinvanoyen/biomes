"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2')
;

class Behavior extends ECS.System {

	test(entity) {
		return entity.components.walkingbehavior;
	}

	update(entity) {

		let {walkingbehavior, body = false, collision = false} = entity.components;

		if( body && collision ) {

			if( walkingbehavior.state == 'walkingforward' ) {

				body.force = body.force.add(new Vector2( .7, 0 ));

			} else if( walkingbehavior.state == 'walkingbackward' ) {

				body.force = body.force.add(new Vector2( -.7, 0 ));

			} else {

				let lerpedForce = body.force.lerp( new Vector2( 0, 0 ), .5 );
				let lerpedVelocity = body.velocity.lerp( new Vector2( 0, 0 ), .5 );

				body.force.x = lerpedForce.x;
				body.velocity.x = lerpedVelocity.x;
			}

			if( walkingbehavior.state == 'jumping' && collision.bottom ) {
				body.force = body.force.add(new Vector2( 0, -5 ));
			}
		}
	}
}

module.exports = Behavior;
