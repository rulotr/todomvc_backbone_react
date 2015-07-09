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

			var todos = this.props.todos;

			var main;
			var footer;
			

			var todoItems = todos.map(function (todo){
				return (
			   	<TodoItem 
			   			todo={todo}
			   	/>
				);
			},this);


		    main =  (
		    	<section id="main">
					<input	id="toggle-all"	type="checkbox"	/>
					<ul id="todo-list">
					 {todoItems}
					</ul>
				 </section>
				 );

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.completed ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;

            footer = (
            	<TodoFooter 
            		count = {activeTodoCount}
            		completedCount = {completedCount}
            	/>
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

// Lista de tareas
var tareas =[];

var tareas = [
  {title: 'Tarea1', completed: true},
  {title: 'Tarea2', completed: false},
  {title: 'Tarea3', completed: true},
  {title: 'Tarea4', completed: false},
];


	React.render(
		<TodoApp todos={tareas} />,
		document.getElementById('todoapp')
	);
})();


