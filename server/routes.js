/*jshint node:true*/
/**
 * Main application routes
 */

'use strict';

require('node-jsx').install({ extension: '.jsx' });

var errors = require('./components/errors');


var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var debug = require('debug')('mydrive');
var React = require('react');
var mydrive5 = require('../client/app/app');
var HtmlComponent = React.createFactory(require('../client/app/components/Html.jsx'));


module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|build|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/some')
    .get(function(req, res , next) {
      // res.sendfile(app.get('appPath') + '/index.html');
      var context = mydrive5.createContext();
      debug('Executing navigate action');
      context.executeAction(navigateAction, {
          // url: req.url
          url:'/'
      }, function (err) {
          if (err) {
              if (err.status && err.status === 404) {
                  next();
              } else {
                  next(err);
              }
              return;
          }

          debug('Exposing context state');
          var exposed = 'window.App=' + serialize(mydrive5.dehydrate(context)) + ';';

          debug('Rendering Application component into html');
          var AppComponent = mydrive5.getAppComponent();

          React.withContext(context.getComponentContext(), function () {
              var html = React.renderToStaticMarkup(HtmlComponent({
                  state: exposed,
                  markup: React.renderToString(AppComponent())
              }));

              debug('Sending markup');
              res.write(html);
              res.end();
          });
      });
    });
};


