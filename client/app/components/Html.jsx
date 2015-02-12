/*jshint node:true*/
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible').Mixin;

/**
 * React class to handle the rendering of the HTML head section
 *
 * @class Head
 * @constructor
 */
var Html = React.createClass({
	mixins: [FluxibleMixin],
	/**
	 * Refer to React documentation render
	 *
	 * @method render
	 * @return {Object} HTML head section
	 */
	render: function() {
		return (
			<html>
			<head>
				<meta charSet="utf-8" />
				<title>{this.getStore(ApplicationStore).getPageTitle()}</title>
				<meta name="viewport" content="width=device-width, user-scalable=no" />
				<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
				<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"/>
				<link rel="stylesheet" href="./build/main.css"/>
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
			</body>
			<script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
			<script src="/build/vendors.js" defer></script>
			<script src="/build/main.js" defer></script>
			</html>
		);
	}
});

module.exports = Html;
