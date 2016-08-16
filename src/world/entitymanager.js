"use strict";

class EntityManager {

	constructor( app ) {

		this.app = app
		this.entities = []
	}

	add( e ) {

		this.app.stage.addChild( e.display )
		this.entities.push( e )
	}

	update() {

		this.entities.forEach( ( e ) => {

			e.update()
		} )
	}
}

module.exports = EntityManager