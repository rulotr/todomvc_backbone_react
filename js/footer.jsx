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
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
						<button	id="clear-completed"> Clear completed </button>				
				);
			}

			return (
				<footer id="footer">
					<span id="todo-count">
						<strong>{this.props.count} </strong> {activeTodoWord} left
					</span>
					<ul id="filters">
						<li>
							<a	href="#/">All</a>
						</li>
						{' '}
						<li>
							<a	href="#/active">Active</a>
						</li>
						{' '}
						<li>
							<a	href="#/completed">	Completed</a>
						</li>
					</ul>
					{clearButton}
			   	</footer>
			);		
		}
	});
})();