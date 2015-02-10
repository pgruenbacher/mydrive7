/*jshint node:true*/

/** @jsx React.DOM */

/*ReadMe:
  Components are where you will be designing your view in the
  render section.  This code is written in jsx; <this.props.activeRouteHandler/>
  is used below for changing views for routing.  

  To add components, you can run react-fullstack:component, and it will create a new component file in the folder.
*/


'use strict';

var React = require('react');

var Fluxible = require('fluxible');
var fetchrPlugin = require('fluxible-plugin-fetchr');
var routrPlugin = require('fluxible-plugin-routr');

var app = new Fluxible({
    appComponent: React.createFactory(require('./components/MyDrive.jsx'))
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

app.plug(routrPlugin({
    routes: require('./routes/routes')
}));

app.registerStore(require('./stores/ApplicationStore'));



// var AppRoutes=require('./routes.jsx');
// var Router = require('react-router');


var injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


module.exports = app;



// Router
//   // Runs the router, similiar to the Router.run method. You can think of it as an 
//   // initializer/constructor method.
//   .create({
//     routes: AppRoutes,
//     scrollBehavior: Router.ScrollToTopBehavior
//   })
//   // This is our callback function, whenever the url changes it will be called again. 
//   // Handler: The ReactComponent class that will be rendered  
//   .run(function (Handler) {
//     React.render( <Handler/>, document.body);
//   });
// // module.exports = React.render(routes, document.body);

