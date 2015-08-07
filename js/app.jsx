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
	var TodoItem = app.TodoItem;
	var TodoFooter = app.TodoFooter;

	var TodoApp = React.createClass({
		componentWillMount: function(){ // Se lanza antes de que se renderice el componente
    		Backbone.React.Component.mixin.on(this, {collections: { myCollection:  app.todos }});
		},
		componentWillUnmount: function(){ // Se lanza antes de que el componente se elimine
			Backbone.React.Component.mixin.off(this);
		},
		edit: function (todo, callback) {
			// refer to todoItem.jsx `handleEdit` for the reason behind the callback
			this.setState({editing: todo.get('id')}, callback);
		},
		render: function () {
			var todos = this.props.todos;
			var todoItems = todos.map(function (todo){
				         return(
				         	<TodoItem 
				         	    key={todo.get('id')} 
				         	    todo={todo} 
				         	    onToggle = {todo.toggle.bind(todo)}
				         	    onEdit={this.edit.bind(this, todo)}
				         	    editing={this.state.editing === todo.get('id')}	
				         	    />);},this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.get('completed') ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;
		
		

			var footer = (<TodoFooter
							count = {activeTodoCount} 
	               			completedCount = {completedCount}
				 />);
			
			var main =  (
		    		<section id="main">
						<input	id="toggle-all"	type="checkbox"	/>
						<ul id="todo-list">
					 		{todoItems}
						</ul>
				 	</section>
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
   
   app.todos.add({id:1,title: 'Tarea1', completed: true});
   app.todos.add({id:2,title: 'Tarea2', completed: false});
   app.todos.add({id:3,title: 'Tarea3', completed: true});
   app.todos.add({id:4,title: 'Tarea4', completed: false});
   app.todos.add({id:5,title: 'Tarea5', completed: true});
   
	React.render(
		<TodoApp todos={ app.todos} />,
		document.getElementById('todoapp')
	);
})();

// ** eliminar
// app.todos.remove(app.todos.get(2))
// ** Ordenar 
//app.todos.comparator = "completed"
//app.todos.sort()