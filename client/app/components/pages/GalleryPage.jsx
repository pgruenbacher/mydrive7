/** @jsx React.DOM */

var React = require('react');

var Images = require('../../../assets/Images');
var NAVBAR_HEIGHT = require('../../constants/AppConstants').NAVBAR_HEIGHT;
var Viewer = require('../interactives/imageCard/Viewer.jsx');

var NUM_IMAGES = 10;

var START_INDEX = 5;

var GalleryPage = React.createClass({
  getInitialState: function() {
    return {width: 0, height: 0};
  },

  getUsername: function() {
    return this.props.routeParams[0] || 'JustinBieber';
  },

  componentDidMount: function() {
    window.addEventListener("resize", this.setDimensions);
    this.setDimensions();
  },

  setDimensions:function(){
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  },

  render: function() {
    if (!this.state.width || !this.state.height) {
      return <span>Loading...</span>;
    }

    return (
      <Viewer
        width={this.state.width}
        height={this.state.height - NAVBAR_HEIGHT}
        images={Images}
      />
    );
  }
});

module.exports = GalleryPage;