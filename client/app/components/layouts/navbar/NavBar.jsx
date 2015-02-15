/** @jsx React.DOM */
/* jshint node:true*/

'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var SessionStore=require('../../../stores/SessionStore');
var ApplicationStore=require('../../../stores/ApplicationStore');

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var AppBar=mui.AppBar;
var DropDownIcon = mui.DropDownIcon;

// var Bootstrap=require('react-bootstrap');

var FluxibleMixin = require('fluxible').Mixin;
// var Nav=Bootstrap.Nav;
// var Navbar = Bootstrap.Navbar;
// var NavItem = Bootstrap.NavItem;
// var DropdownButton = Bootstrap.DropdownButton;
// var MenuItem = Bootstrap.MenuItem;

var NavLink = require('flux-router-component').NavLink;

var NavInstance = React.createClass({

  mixins: [FluxibleMixin],
  statics: {
    storeListeners: [SessionStore,ApplicationStore]
  },

  getInitialState: function() {
      return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      currentUser: this.getStore(SessionStore).getCurrentUser(),
      title:this.getStore(ApplicationStore).getPageTitle()
    };
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  onChange: function() {
    this.setState(this.getStateFromStores());
  },

  getDefaultProps: function () {
    return {
      selected: 'home',
      links: {}
    };
  },
  isActive:function(name){
    if(name===this.props.selected){
      return 'active';
    }
    return null;
  },
  render: function() {
    var selected = this.props.selected,
      links = this.props.links,
      context = this.props.contex;

    var iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];
    var NavbarHeaderStyle={
      float:'right'
    };

    var navbarRight=null;
    if(typeof this.state.currentUser._id ==='undefined'){
      navbarRight=(
        <ul className="nav navbar-nav navbar-right">
          <li className={this.isActive(links.login.page)}><NavLink routeName={links.login.page} label="login">Login</NavLink></li>
          <li className={this.isActive(links.signup.page)}><NavLink routeName={links.signup.page} label="login">Signup</NavLink></li>
        </ul>
        );
    }else{
      navbarRight=(
        <ul className="nav navbar-nav navbar-right">
          <li><span className="navbar-text">Welcome {this.state.currentUser.name}</span></li>
          <li><NavLink routeName={links.login.page} label="logout">Logout</NavLink></li>
        </ul>
        );
    }

    var NavbarHeader=(
      <div className="navbar-header" style={NavbarHeaderStyle}>
        <NavLink routeName={links.home.page} className="navbar-brand navbar-brand-left">
          MyDrive5
        </NavLink> 
      </div>
    );
    return(
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" routeName={links.admin.home} href="/">MyDrive5</NavLink>
          </div>
          <div className="navbar-title">
            {this.state.title}
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className={this.isActive(links.admin.page)}><NavLink routeName={links.admin.page}>Admin</NavLink></li>
            </ul>
            {navbarRight}
          </div>
        </div>
      </nav>

      );
    // return (
    //  <Navbar className="navbar-inverse navbar-static-top">
    //     {NavbarHeader}
    //     <Nav className="navbar-right">
    //       <DropdownButton eventKey={3} title={userIcon}>
    //         <MenuItem eventKey="1">Action</MenuItem>
    //         <MenuItem eventKey="2">Another action</MenuItem>
    //         <MenuItem eventKey="3">Something else here</MenuItem>
    //         <MenuItem divider />
    //         <MenuItem eventKey="4">Separated link</MenuItem>
    //       </DropdownButton>
    //       <NavItem eventKey={1} href={links.login.path}>
    //         Login
    //       </NavItem>
    //       <NavItem eventKey={2} href="#">Register</NavItem>
    //     </Nav>
    //   </Navbar>
    // );
  }
});

module.exports = NavInstance;