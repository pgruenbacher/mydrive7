/* jshint node:true */
'use strict';
var React = require('react');

var PopArrow = React.createClass({
  render: function () {
    return (
      <nav className="nav-circlepop">
        <a {...this.props}>
          <span className="icon-wrap">
          </span>
        </a>
      </nav>
    );
  }
});

module.exports = PopArrow;