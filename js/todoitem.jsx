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
			return {editText: 0};
		},
		handleEdit: function () {
			this.props.onEdit();
			this.setState({editText:  this.props.todo.get('title') });
		},
		render: function () {
			return (
				<li className={classNames({
					completed: this.props.todo.get('completed'),
					editing: this.props.editing
					})}	>
					<div className="view">
						<input	className="toggle" type="checkbox" checked={this.props.todo.get('completed')} />
						<label  onDoubleClick={this.handleEdit}>	{this.props.todo.get('title')}  </label>
						<button className="destroy"  />
					</div>
					<input ref="editField"	className="edit" value={this.state.editText}/>
				</li>
			);
		}
	});
})();
