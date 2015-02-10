/*jshint node:true*/

'use strict';

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Routes = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

var LOGIN = require('./components/Login.jsx');
var HOME = require('./components/Home.jsx');
var SIGNUP = require('./components/Signup.jsx');
var NAV = require('./components/NavBar.jsx');
var BANNER = require('./components/Banner.jsx');
var FOOTER = require('./components/Footer.jsx');


var APP = React.createClass({
  render: function(){
    return (
      <div>
        <NAV />
        <BANNER />
        <RouteHandler />
        <FOOTER />
      </div>
    );
  }
});

var routes = (
  <Route handler={APP}>
    <Route name="home" path="/" handler={HOME}/>
    <Route name="login" path="/login" handler={LOGIN}/>
    <Route name="signup" path="/signup" handler={SIGNUP}/>
    <DefaultRoute handler={APP}/>
  </Route>
);


module.exports = routes;