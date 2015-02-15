
/** @jsx React.DOM */

var AnimatableContainer = require('../../primitives/AnimatableContainer.jsx');
var EasingFunctions = require('../../../../../lib/math/easing');
var ImageCard = require('./ImageCard.jsx');
var React = require('react');

var ImageCardContainer = React.createClass({
  render: function() {
    var pct = (this.props.left - (this.props.index * this.props.width)) / this.props.width;
    var x = this.props.index * this.props.width - this.props.left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = this.props.left > this.props.index * this.props.width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    var card = <ImageCard {...this.props} />;

    return (
      <AnimatableContainer
        className="ImageCardContainer"
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg: deg}}
        translate={{x: x, z: z}}>
        {card}
      </AnimatableContainer>
    );
  }
});

module.exports = ImageCardContainer;