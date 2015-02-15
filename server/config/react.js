/*jshint node:true*/
'use strict';

var serialize = require('serialize-javascript');
var navigateAction = require('flux-router-component').navigateAction;
var debug = require('debug')('mydrive');
var React = require('react');
var mydrive5 = require('../../client/app/app');
var HtmlComponent = React.createFactory(require('../../client/app/components/Html.jsx'));

module.exports = function(app) {
	return function(req, res, next) {
		// res.sendfile(app.get('appPath') + '/index.html');
		var context = mydrive5.createContext({
			req: req,
	    xhrContext: { // Used as query params for all XHR calls
        lang: 'en-US', // make sure XHR calls receive the same lang as the initial request
        _csrf: req.csrfToken() // CSRF token to validate on the server using your favorite library
	    }
		});
		debug('Executing navigate action');
		context.executeAction(navigateAction, {
	    // url: req.url
	    url:req.url
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
			  var html = React.renderToStaticMarkup(new HtmlComponent({
				state: exposed,
				markup: React.renderToString(new AppComponent())
		  }));

		  debug('Sending markup');
		  res.write(html);
		  res.end();
	    });
		});
  };
};