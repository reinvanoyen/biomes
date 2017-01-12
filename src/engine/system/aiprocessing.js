"use strict";

const ECS = require('yagl-ecs'),
	Vector2 = require('tnt-vec2'),
	tractor = require('tree-tractor'),
	WalkForward = require('../../app/btnode/walkforward'),
	WalkBackward = require('../../app/btnode/walkbackward'),
	IsTired = require('../../app/btnode/istired'),
	IsRested = require('../../app/btnode/isrested'),
	Idle = require('../../app/btnode/idle')
;

class AIProcessing extends ECS.System {

	enter(entity) {
		let tree = new tractor.Tree();

		tree.setRoot( new tractor.Selector(
			new tractor.Sequence(
				new IsTired(),
				new Idle()
			),
			new tractor.Sequence(
				new IsRested(),
				new WalkForward()
			)
		) );

		entity.bt = tree;
		entity.blackboard = new tractor.Blackboard();
	}

	test(entity) {
		return entity.components.ai;
	}

	update(entity) {

		entity.bt.tick(entity, entity.blackboard);
		
		if( entity.components.walkingbehavior ) {
			if(
				entity.components.walkingbehavior.state == 'walkingforward' ||
				entity.components.walkingbehavior.state == 'walkingbackward'
			)
			{
				entity.components.ai.fatigue++;
			} else if( entity.components.walkingbehavior.state == 'idle' ) {
				entity.components.ai.fatigue -= 1;
			}
		}
	}
}

module.exports = AIProcessing;
