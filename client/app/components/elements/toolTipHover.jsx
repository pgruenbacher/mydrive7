/* jshint node:true */
'use strict';
var React = require('react');

var Mui = require('material-ui');
var Tooltip = Mui.Tooltip;

var HoverTrigger = React.createClass({
  getInitialState: function() {
    return {hovering: false};
  },
  propTypes: {
    label: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className="tooltip-hover">
        {this.props.children}
        <Tooltip label={this.props.label} show={this.state.hovering} className="tooltip-right"/>
      </div>
    );
  },
  _onMouseEnter: function() {
    this.setState({hovering:true});
  },
  _onMouseLeave: function() {
    this.setState({hovering:false});
  }
});

module.exports = HoverTrigger;