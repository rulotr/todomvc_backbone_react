/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		sort_key: 'id', // default sort key

		comparator: function(a,b) {
			//Para numeros
			return b - a;
			//Para cadenas
			//if (a === b) return 0;
  			//return a < b ? -1 : 1;
		},
	
		sortByField: function(fieldName) {
			this.sort_key = fieldName;
			this.sort();
		},

		// Reference to this collection's model.
		model: app.Todo,

		nextOrder: function () {
			return this.length ? this.last().get('id') + 1 : 1;
		},
		completed: function () {
			return this.where({completed: true});
		},
	});

	
	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();