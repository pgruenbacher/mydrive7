/*jshint node:true*/
/**
 * Main application routes
 */

'use strict';


var errors = require('./components/errors');
var auth = require('./auth/auth.service');

var ReactRoutes = require('./config/react');
// var serialize = require('serialize-javascript');
// var navigateAction = require('flux-router-component').navigateAction;
// var debug = require('debug')('mydrive');
// var React = require('react');
// var mydrive5 = require('../client/app/app');
// var HtmlComponent = React.createFactory(require('../client/app/components/Html.jsx'));


module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|client|build|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // app.get('/signup', auth.isAuthenticated());

  // All other routes should redirect to the index.html
  app.get('/*', new ReactRoutes(app));

};


