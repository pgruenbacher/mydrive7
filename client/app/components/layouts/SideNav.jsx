/** @jsx React.DOM */

var React = require('react');

// var App = require('react-touch/lib/primitives/App');
// var RoutedLink = require('react-touch/lib/routing/RoutedLink');
// var Header = require('../components/Header');
var LeftNavContainer = require('../interactives/leftNav/LeftNavContainer.jsx');


// Keep in sync with Layout.css
// TODO: deprecate the CSS standard
var SIDEBAR_WIDTH = 192;
var TOPBAR_HEIGHT = 51; // + 1 for the border

var Layout = React.createClass({
  handleNavClick: function() {
    this.refs.LeftNavContainer.closeNav();
  },

  render: function() {
    var STYLE = {
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'fixed',
      right: 0,
      top: 0
    };
    var button = (
      <div className="Layout-hamburger fa fa-bars" />
    );

    var topContent = (
      <h1 className="Layout-topBar">React touch demos</h1>
    );

    var sideContent = (
      <div className="Layout-nav">
        <a className="Layout-navLink" >asdlfkj</a>
        <a className="Layout-navLink" >asdlfkj</a>
        <a className="Layout-navLink" >asdlfkj</a>
        <a className="Layout-navLink" >asdlfkj</a>
        <a className="Layout-navLink" >asdlfkj</a>
      </div>
    );
        // <RoutedLink href="/home" className="Layout-navLink" onClick={this.handleNavClick}>Home</RoutedLink>
        // <RoutedLink href="/scroll" className="Layout-navLink" onClick={this.handleNavClick}>Simple scroll</RoutedLink>
        // <RoutedLink href="/glass" className="Layout-navLink" onClick={this.handleNavClick}>Frosted glass</RoutedLink>
        // <RoutedLink href="/viewer" className="Layout-lastNavLink" onClick={this.handleNavClick}>Photo gallery</RoutedLink>

    return(
      <div style={STYLE}>
        <LeftNavContainer
          ref="leftNavContainer"
          button={button}
          topContent={topContent}
          sideContent={sideContent}
          topHeight={TOPBAR_HEIGHT}
          sideWidth={SIDEBAR_WIDTH}>
          <div className="Layout-content">
            {this.props.children}
          </div>
        </LeftNavContainer>
      </div>
    );
  }
});

Layout.TOPBAR_HEIGHT = TOPBAR_HEIGHT; // account for border

module.exports = Layout;