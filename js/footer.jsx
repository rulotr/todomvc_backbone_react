/**
 * @jsx React.DOM
 */
/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {
				var activeTodoWord = this.props.count === 1 ? 'item' : 'items';
			return (
				<footer id="footer">
					<span id="todo-count">
						<strong> {this.props.count} </strong> {activeTodoWord} left
					</span>
					<ul id="filters">
						<li><a	href="#/">All</a></li>
						{' '}
						<li><a	href="#/active">Active</a></li>
						{' '}
						<li><a	href="#/completed">	Completed</a></li>
					</ul>
					<button	id="clear-completed"> Clear completed </button>
			   	</footer>
			);		
		}
	});
})();