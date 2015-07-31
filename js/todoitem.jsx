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
		
		render: function () {
			return (
				<li>
					<div className="view">
						<input	className="toggle" type="checkbox" />
						<label>	Tarea 1 </label>
						<button className="destroy"  />
					</div>
					<input ref="editField"	className="edit" />
				</li>
			);
		}
	});
})();