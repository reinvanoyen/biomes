"use strict";

const ECS = require('yagl-ecs');

class Physics extends ECS.System {

	constructor(world) {

		super();
		this.world = world;
	}

	test(entity) {
		return entity.components.position && entity.components.body && entity.components.collision;
	}

	update(entity) {

		let {position, collision, body} = entity.components;

		if( collision.bottom ) {

			position.y = this.world.getWorldElevation(position.x);
			body.force.y = 0;
			body.velocity.y = -body.velocity.y * body.bounciness;

			// @TODO what we should do here is reflect the velocity vector in the normal of the surface the ball has collided with.
			// @TODO http://www.3dkingdoms.com/weekly/weekly.php?a=2
		}
	}

	exit(entity) {}
}

module.exports = Physics;