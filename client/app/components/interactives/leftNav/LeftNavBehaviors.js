
/*jshint node:true*/

'use strict';
var LeftNavBehaviors = {
  PARALLAX_FADE: {
    side: {
      translate: function(sideWidth, scrollLeft) {
        return {
          x: sideWidth - 0.5 * scrollLeft
        };
      },
      rotate: function() {
        return null;
      },
      opacity: function(sideWidth, scrollLeft) {
        return 0.5 + 0.5 * (1 - scrollLeft / sideWidth);
      }
    },
    top: {
      translate: function(sideWidth, scrollLeft) {
        return {x: sideWidth - scrollLeft};
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    },
    content: {
      translate: function(sideWidth, scrollLeft) {
        return {x: sideWidth - scrollLeft};
      },
      rotate: function() {
        return null;
      },
      opacity: function() {
        return null;
      }
    }
  }
};

module.exports = LeftNavBehaviors;