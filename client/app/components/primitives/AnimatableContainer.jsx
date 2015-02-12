/** @jsx React.DOM */

var React = require('react');

var StaticContainer = require('./StaticContainer.jsx');
var StyleKeys = require('../../environment/StyleKeys');

var POLL_FACTOR = 0.5;

var AnimatableContainer = React.createClass({
  displayName: 'AnimatableContainer',

  getDefaultProps: function() {
    return {
      blockUpdates: true,
      opacity: 1,
      rotate: null,
      scale: null,
      timeout: 200,
      translate: null
    };
  },

  componentWillMount: function() {
    this.wasEverOnGPU = false;
    this.isAnimating = false;
    this.lastAnimationTime = 0;
    this.animationInterval = null;
  },

  componentWillUnmount: function() {
    if (this.animationInterval) {
      window.clearInterval(this.animationInterval);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var prevStyle = this.getStyle(this.props);
    var style = this.getStyle(nextProps);

    this.isAnimating = (
      style.opacity !== prevStyle.opacity ||
      style[StyleKeys.TRANSFORM] !== prevStyle[StyleKeys.TRANSFORM]
    );

    if (this.isAnimating) {
      this.lastAnimationTime = Date.now();
      if (this.props.timeout && !this.animationInterval) {
        this.animationInterval = window.setInterval(
          this.checkAnimationEnd,
          this.props.timeout * POLL_FACTOR
        );
      }
    }
  },

  checkAnimationEnd: function() {
    if (Date.now() - this.lastAnimationTime > this.props.timeout) {
      window.clearInterval(this.animationInterval);
      this.animationInterval = null;
      this.isAnimating = false;
      this.forceUpdate();
    }
  },

  getStyle: function(props) {
    var style = {};

    if (this.props.style) {
      for (var key in this.props.style) {
        style[key] = this.props.style[key];
      }
    }

    var transforms = '';
    if (props.opacity !== 1) {
      style.opacity = props.opacity;
    }

    if (props.translate) {
      transforms += (
        'translate3d(' + (props.translate.x || 0) + 'px, ' +
        (props.translate.y || 0) + 'px, ' +
        (props.translate.z || 0) + 'px) '
      );
    }

    if (props.rotate) {
      transforms += (
        'rotate3d(' + (props.rotate.x || 0) + ', ' +
        (props.rotate.y || 0) + ', ' +
        (props.rotate.z || 0) + ', ' +
        props.rotate.deg + 'deg) '
      );
    }

    if (props.scale) {
      transforms += 'scale(' + props.scale + ') ';
    }

    if (transforms.length > 0) {
      style[StyleKeys.TRANSFORM] = transforms;
      this.wasEverOnGPU = true;
    } else {
      if (this.wasEverOnGPU) {
        // on iOS when you go from translate3d to non-translate3d you get
        // flicker. Let's avoid it
        style[StyleKeys.TRANSFORM] = 'translate3d(0, 0, 0)';
      }
    }

    return style;
  },

  render: function() {

    return (
      <div className={this.props.className} style={this.getStyle(this.props)}> 
        <StaticContainer shouldUpdate={!this.props.blockUpdates || !this.isAnimating}>
          <span>
            {this.props.children}
          </span>
        </StaticContainer>
      </div>
    );
  }
});

module.exports = AnimatableContainer;