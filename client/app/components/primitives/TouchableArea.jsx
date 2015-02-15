/** @jsx React.DOM */
/*jshint node:true*/
'use strict';

var React = require('react');
React.initializeTouchEvents(true);
var TouchableArea = React.createClass({
  getDefaultProps: function() {
    return {
      touchable: true
    };
  },

  handleTouchStart: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }

    this.props.scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  },


  handleTouchMove: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }
    this.props.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    e.preventDefault();
  },

  handleTouchEnd: function(e) {
    if (!this.props.scroller || !this.props.touchable) {
      return;
    }
    this.props.scroller.doTouchEnd(e.timeStamp);
    e.preventDefault();
  },

  render: function() {
    return(
      <div
        {...this.props}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchEnd}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = TouchableArea;