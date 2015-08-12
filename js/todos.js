/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		nextOrder: function () {
			return this.length ? this.last().get('id') + 1 : 1;
		},
	});

	
	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();