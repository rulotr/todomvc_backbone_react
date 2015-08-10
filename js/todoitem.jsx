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
			return {editText: this.props.todo.get('title')};
		},
		handleSubmit: function () {
			var val = this.state.editText.trim();		

			if (val) {
				console.log("guardando " + val)
				this.props.onSave(val);				
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
			return false;
		},
		handleEdit: function () {
			this.props.onEdit();
			this.setState({editText: this.props.todo.get('title')});
		},
		handleKeyDown: function (event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.get('title')});
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit(event);
			}
		},
		handleChange: function (event) {
			this.setState({editText: event.target.value});
		},
		componentDidUpdate: function (prevProps) {
			if (!prevProps.editing && this.props.editing) {
				console.log(prevProps.editing)
				console.log(this.props.editing)			
				var node = React.findDOMNode(this.refs.editField);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}
		},
//bind(tipo_de_evento, manejador) 
		render: function () {
			return (
				<li className={classNames({
					completed: this.props.todo.get('completed'), //la clase completed muestra un label
					editing:this.props.editing //la clase editing muestra la caja de texto
				})}>
					<div className="view">
						<input	
							className="toggle" 
							type="checkbox" 
							checked={this.props.todo.get('completed')}
							onChange = {this.props.onToggle}
						 />
						<label onDoubleClick={this.handleEdit}>	
						             {this.props.todo.get('title')} 
						</label>
						<button className="destroy"  />
					</div>
					<input 
						ref="editField"	
						className="edit" 
						value={this.state.editText} 
						onBlur = {this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
				</li>
			);
		}
	});
})();