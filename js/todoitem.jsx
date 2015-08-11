/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	app.TodoItem = React.createClass({
		getInitialState: function () {
			return {editText:  this.props.todo.get('title')};
		},		
		handleSubmit: function (event) {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				console.log("se guarda");
			} 
		//	return false;
		},
		handleEdit: function () {
			//Usando refs podemos hacer referencia mas facial a algun control del component
			//Aqui input tiene ref="editField"
			// Le informa al componente padre que hay cambio de celda a editar						
		    // Le pasamos al componente padre la funcion que ejecutara al final
			this.props.onEdit(function () {
				var node = React.findDOMNode(this.refs.editField);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}.bind(this));

			this.setState({editText:  this.props.todo.get('title') });
		},
		handleKeyDown: function (event) {
			if (event.which === ENTER_KEY) {				
				this.handleSubmit();
			} else if(event.which === ESCAPE_KEY){
				
				this.setState({editText: this.props.todo.get('title')});
				this.props.onCancel()
			}
		},
		// Como el input es de solo lectura esta es la forma de cambiar su valor
		handleChange: function (event) {
			 	if(this.props.editing){
					this.setState({editText: event.target.value});			
			 	}			 	
		},
		// Cuando se le asigna value=valor el componente sera de solo lectura
		// para poder escribir en el se necesita agregar el evento onChange y asignarle un manejador
  	  render: function () {
			return (
				<li className={classNames({
					completed: this.props.todo.get('completed'),
					editing: this.props.editing
					})}	>
					<div className="view">
						<input	className="toggle" type="checkbox" checked={this.props.todo.get('completed')} />
						<label  onDoubleClick={this.handleEdit}>{this.props.todo.get('title')} </label>
						<button className="destroy"  />
					</div>
					<input 
						ref="editField"	
						className="edit" 
						value={this.state.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
				</li>
			);
		}
	});
})();
