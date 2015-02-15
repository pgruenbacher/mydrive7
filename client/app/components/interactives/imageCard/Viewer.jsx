/** @jsx React.DOM */

// Implicit require of Scroller from Zynga
var ImageCardContainer = require('./ImageCardContainer.jsx');
var React = require('react');

var Scroller = require('scroller').Scroller;

var TouchableArea = require('../../primitives/TouchableArea.jsx');

var PopArrow = require('../../elements/popArrow/PopArrow.jsx');

var Viewer = React.createClass({
  componentWillMount: function() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount: function() {
    this.scroller.setDimensions(
      this.props.width,
      this.props.height,
      this.props.width * this.props.images.urls.length,
      this.props.height
    );
    this.scroller.setSnapSize(this.props.width, this.props.height);
  },

  getInitialState: function() {
    return {left: 0};
  },

  // direction-integer
  handleTapRight:function(){
    this.scroller.scrollBy(this.props.width,0,true);
  },
  handleTapLeft:function(){
    this.scroller.scrollBy(this.props.width*-1,0,true);
  },

  handleScroll: function(left, top, zoom) {
    this.setState({left: left});
  },

  render: function() {
    var images = this.props.images.urls.map(function(url, i) {
      if (this.state.left < (i - 1) * this.props.width || this.state.left > (i + 1) * this.props.width) {
        return null;
      }

      // Find the highest resolution image
      return (
        <ImageCardContainer
          left={this.state.left}
          key={i}
          index={i}
          url={url}
          width={this.props.width}
          height={this.props.height}
          caption={'LoremPixel photo #' + (i + 1)}
        />
      );
    }, this);

    return (
      <div>
        <PopArrow className="next" onClick={this.handleTapRight}/>
        <PopArrow className="previous" onClick={this.handleTapLeft}/>
        <TouchableArea
          className="viewer"
          style={{width: this.props.width, height: this.props.height}}
          scroller={this.scroller}>
          {images}
        </TouchableArea>
      </div>
    );
  }
});

module.exports = Viewer;