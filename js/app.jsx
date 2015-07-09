/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React, Backbone */
var app = app || {};

(function () {
	'use strict';
	var TodoFooter = app.TodoFooter;
	var TodoItem = app.TodoItem;
	
	var TodoApp = React.createClass({
		render: function () {
			var main;
			var footer;
			

			var todoItems =(
				<TodoItem />
				);

		    main =  (
		    	<section id="main">
					<input	id="toggle-all"	type="checkbox"	/>
					<ul id="todo-list">
					 {todoItems}
					</ul>
				 </section>
				 );

            footer = (
            	<TodoFooter />
            	);


			return (
			 	<div>
					<header id="header">
						<h1>todos</h1>	
						<input	ref="newField"	id="new-todo" placeholder="What needs to be done?"/>					
					</header>
						{main}	
						{footer}						
				</div>
			);
		}
	});

	React.render(
		<TodoApp />,
		document.getElementById('todoapp')
	);
})();