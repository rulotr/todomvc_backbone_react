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

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.ALL_TODOS = 'all';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	
	var TodoItem = app.TodoItem;
	var TodoFooter = app.TodoFooter;
    
	var TodoApp = React.createClass({		 
		//mixins: [ReactRenderVisualizer],
		componentWillMount: function(){ // Se lanza antes de que se renderice el componente
    		Backbone.React.Component.mixin.on(this, {collections: { myCollection:  app.todos }});
		},
		componentWillUnmount: function(){ // Se lanza antes de que el componente se elimine
			Backbone.React.Component.mixin.off(this);
		},
		componentDidMount: function () { //Se lanza despues de que se renderiza el componente
			var Router = Backbone.Router.extend({
				routes: {
					'': 'all',
					'active': 'active',
					'completed': 'completed'
				},
				all: this.setState.bind(this, {nowShowing: app.ALL_TODOS},function(){console.log("menu all")}),
				active: this.setState.bind(this, {nowShowing: app.ACTIVE_TODOS},function(){console.log("menu active")}),
				completed: this.setState.bind(this, {nowShowing: app.COMPLETED_TODOS},function(){console.log("menu completed")})
			});

			new Router();
			Backbone.history.start();
            //index.html#/completed
			//this.props.todos.fetch();
		},

		getInitialState: function () {
			return {editing: null};
		},
		handleNewTodoKeyDown: function (event) {
			if (event.which !== ENTER_KEY) {
				return;
			}

			var val = this.refs.newField.getDOMNode().value.trim();
			console.log(val)
			if (val) {
				var siguiente= app.todos.nextOrder();
				console.log(siguiente);
				app.todos.add({id:siguiente,title: val, completed: false});								
				this.refs.newField.getDOMNode().value = '';
			}

		//	event.preventDefault();
		},
		save: function (todo, text) {
			todo.set({title: text})
			this.setState({editing: null});
		},		
		cancel: function () {
			this.setState({editing: null});
		},
		// Cuando temine de ejecutar setState se ejecutara la funcion que se le paso
		edit: function (todo,callback) {
			this.setState({editing: todo.get('id')},callback);
		},
		delete: function(todo){
			app.todos.remove(todo);
		},
		toggleAll: function (event) {
			var checked = event.target.checked;
			app.todos.forEach(function (todo) {
				todo.set('completed', checked);
			});
		},
		clearCompleted: function () {
			app.todos.completed().forEach(function (todo) {
				app.todos.remove(todo);
			});
		},
		render: function () {
			var todos = this.props.todos;
			var todoItems = todos.map(function (todo){
						 if(this.state.nowShowing===app.ACTIVE_TODOS && todo.get('completed')===true){
						 	return ;
						 }
						 if(this.state.nowShowing===app.COMPLETED_TODOS && todo.get('completed')===false){
						 	return ;
						 }
				         return(
				         	<TodoItem 
				         	      key={todo.get('id')} 
				         	      todo={todo} 
				         	      onToggle={todo.toggle.bind(todo)}
				         	      onDestroy={this.delete.bind(this,todo)}
				         	      onEdit={this.edit.bind(this, todo)}
				         	      editing={this.state.editing === todo.get('id')}
				         	      onSave={this.save.bind(this, todo)}
				         	      onCancel={this.cancel}
				         	 />);},this);

			var activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.get('completed') ? accum : accum + 1;
			}, 0);

			var completedCount = todos.length - activeTodoCount;
		
		

			var footer = (<TodoFooter
							count = {activeTodoCount} 
	               			completedCount = {completedCount}
	               			onClearCompleted={this.clearCompleted}
				 />);
			
			var main =  (
		    		<section id="main">
						<input	
							id="toggle-all"	
							type="checkbox"	
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul id="todo-list">
					 		{todoItems}
						</ul>
				 	</section>
				 );




			return (				
				<div>
					<header id="header">
						<h1>todos</h1>	
						<input	
							ref="newField"								
							id="new-todo"
							placeholder="What needs to be done?"
							autoFocus={true}
							onKeyDown={this.handleNewTodoKeyDown}
						/>		
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