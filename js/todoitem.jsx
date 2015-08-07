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
	app.TodoItem = React.createClass({
		getInitialState: function () {
			return {editText: this.props.todo.get('title')};
		},
		handleEdit: function () {
			this.props.onEdit(function () {
				var node = React.findDOMNode(this.refs.editField);
				app.node =node;
				console.log(this.refs.editField);
				node.focus();
				node.setSelectionRange(node.value.length, node.value.length);
			}.bind(this));
			this.setState({editText: this.props.todo.get('title')});
		},

		render: function () {
			return (
				<li className={classNames({
					completed: this.props.todo.get('completed'),
					editing:this.props.editing
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
					<input ref="editField"	className="edit" value={this.state.editText} />
				</li>
			);
		}
	});
})();
