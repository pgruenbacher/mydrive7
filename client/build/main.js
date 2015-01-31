(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./client/app/src/app.jsx":[function(require,module,exports){
/** @jsx React.DOM *//*jshint node:true*/

/** @jsx React.DOM */

/*ReadMe:
  Components are where you will be designing your view in the
  render section.  This code is written in jsx; <this.props.activeRouteHandler/>
  is used below for changing views for routing.  

  To add components, you can run react-fullstack:component, and it will create a new component file in the folder.
*/


'use strict';

var React = require('react');


var AppRoutes=require('./routes.jsx');
var Router = require('react-router');


var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();






Router
  // Runs the router, similiar to the Router.run method. You can think of it as an 
  // initializer/constructor method.
  .create({
    routes: AppRoutes,
    scrollBehavior: Router.ScrollToTopBehavior
  })
  // This is our callback function, whenever the url changes it will be called again. 
  // Handler: The ReactComponent class that will be rendered  
  .run(function (Handler) {
    React.render(Handler(null), document.body);
  });
// module.exports = React.render(routes, document.body);

},{"./routes.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/routes.jsx","react":"react","react-router":"react-router","react-tap-event-plugin":"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/injectTapEventPlugin.js"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js":[function(require,module,exports){
/*ReadMe:
  Actions are data packaged from user interactions or web APIs.
  It is an object literal containing the new fields of data and
  specific action types.  Actions are sent to the dispatcher before
  the store.
*/

'use strict';
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  populateAction: function() {
    return AppDispatcher.handleViewAction({
      actionType: AppConstants.POPULATE
    });
  },
  addItemAction: function(text) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD,
      text: text
    });
  },
  removeItemAction: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE,
      id: id
    });
  }
};

module.exports = AppActions;

},{"../constants/AppConstants":"/home/paul/Code/fundraiser/mydrive7/client/app/src/constants/AppConstants.js","../dispatchers/AppDispatcher":"/home/paul/Code/fundraiser/mydrive7/client/app/src/dispatchers/AppDispatcher.js"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Banner.jsx":[function(require,module,exports){
/** @jsx React.DOM */


var React = require('react');

var BANNER = React.createClass({displayName: 'BANNER',
 
  
  render: function(){
    return (
      React.DOM.div({className: "container-fluid banner"}, 
        React.DOM.img({src: "http://s28.postimg.org/uiq4zy3j1/slush_react_fullstack.png"})
      )
    )
  }
})

module.exports = BANNER;
},{"react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Footer.jsx":[function(require,module,exports){
/** @jsx React.DOM */


var React = require('react');

var FOOTER = React.createClass({displayName: 'FOOTER',
 
  
  render: function(){
    return (
      React.DOM.div({className: "footer"}, 
        React.DOM.div({className: "container"}, 
          React.DOM.p({className: "text-muted"}, " Fork me on Github! ")
        )
      )
    )
  }
})

module.exports = FOOTER;
},{"react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Home.jsx":[function(require,module,exports){
/** @jsx React.DOM */


'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NAV = require('./NavBar.jsx');
var BANNER = require('./Banner.jsx');
var TODO = require('./ToDo.jsx');

var Q = require('q');

function getAppState(){
  return AppStore.getData();
};

function getInitialAppState(){
  return AppStore.getInitialData();
}

var APP = React.createClass({displayName: 'APP',
  getInitialState: function(){
    return getInitialAppState();
    // return getAppState();
    // return null;
  },

  _onChange: function(){
    // this.setState(getAppState());
    var that = this;
    Q(getAppState()).then(function(promise){
      console.log('change')
      console.log(promise)
      that.setState({todos: promise})
    })

  },

  componentDidMount: function(){
    var that = this;
    console.log(1)
    AppStore.addChangeListener(this._onChange);
    // Q(AppActions.populateAction()).then(function(promisedData){
    //   console.log(promisedData);
    //   this.setState(promisedData);
    // });
    Q(getAppState()).then(function(promise){
      console.log(2)
      console.log("this:",that)
      console.log(promise)
      // var data = {todos: promise}
      that.setState({todos: promise})
    })
  },

  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },

  handleClick: function(){
    AppActions.exampleAction('Data from View');
  },
  
  render: function(){
    return (
      React.DOM.div(null, 
        TODO({allTodos: this.state.todos})
      )
      )
  }
})

module.exports = APP;

},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","./Banner.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Banner.jsx","./NavBar.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/NavBar.jsx","./ToDo.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/ToDo.jsx","q":"q","react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Item.jsx":[function(require,module,exports){
/** @jsx React.DOM */
/*jshint node:true*/

'use strict';


var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');


var ITEM = React.createClass({displayName: 'ITEM',

  handleClick: function(e) {
    e.preventDefault();
    AppActions.removeItemAction(this.props.item.id);
  },
  render: function(){
    return (
      React.DOM.li({key: this.props.key, className: "list-group-item"}, 
        this.props.item.item, 
        React.DOM.a({className: "close", onClick: this.handleClick, href: "#"}, "x")
      ) 
    );
  }
});

module.exports = ITEM;
},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Login.jsx":[function(require,module,exports){
/** @jsx React.DOM */


'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NAV = require('./NavBar.jsx');
var BANNER = require('./Banner.jsx');

var LOGIN  = React.createClass({displayName: 'LOGIN',

  handleClick: function(){
    console.log("at handleClick in Signup")
  },

  handleInput: function(e) {
    console.log("at handleInput in Login")
  },
  
  render: function(){
    return (
      React.DOM.div(null, 
        React.DOM.div({className: "container"}, 
          React.DOM.h1(null, "Login"), 
            React.DOM.form({className: "form-horizontal", role: "form"}, 
              React.DOM.div({className: "form-group"}, 
                React.DOM.label({for: "inputEmail3", className: "control-label"}, "Email"), 
                React.DOM.div({className: "container"}, 
                  React.DOM.input({type: "email", className: "form-control", id: "inputEmail3", placeholder: "Email", onKeyPress: this.handleInput})
                )
              ), 
              React.DOM.div({className: "form-group"}, 
                React.DOM.label({for: "inputPassword3", className: "control-label"}, "Password"), 
                React.DOM.div({className: "container"}, 
                  React.DOM.input({type: "password", className: "form-control", id: "inputPassword3", placeholder: "Password", onKeyPress: this.handleInput})
                )
              ), 
              React.DOM.div({className: "form-group"}, 
                React.DOM.div(null, 
                  React.DOM.div({className: "checkbox"}, 
                    React.DOM.label(null, 
                      React.DOM.input({type: "checkbox"}), " Remember me"
                    )
                  )
                )
              ), 
              React.DOM.div({className: "form-group"}, 
                React.DOM.div({className: "control-button"}, 
                  React.DOM.button({type: "submit", className: "btn btn-default", onClick: this.handleClick}, "Sign in")
                )
              )
            )
        )
      )
      )
  }
})

module.exports = LOGIN;

},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","./Banner.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Banner.jsx","./NavBar.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/NavBar.jsx","react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/NavBar.jsx":[function(require,module,exports){
/** @jsx React.DOM */


'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Router = require('react-router');
var Link = Router.Link;

function getAppState(){
  return AppStore.getData();
};

var NAV = React.createClass({displayName: 'NAV',
  
  render: function(){
    return (
      React.DOM.nav({className: "navbar navbar-default", role: "navigation"}, 
        Link({className: "navbar-brand", to: "home"}, "MyDrive5"), 
        React.DOM.ul({className: "nav navbar-nav navbar-right"}, 
          React.DOM.li(null, Link({to: "signup"}, "Signup")), 
          React.DOM.li(null, Link({className: "login", to: "login"}, "Login"))
        )
      )
    );
  }
})

module.exports = NAV;
},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","react":"react","react-router":"react-router"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Signup.jsx":[function(require,module,exports){
/** @jsx React.DOM */


'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NAV = require('./NavBar.jsx');
var BANNER = require('./Banner.jsx')


var SIGNUP  = React.createClass({displayName: 'SIGNUP',

  handleClick: function(){
    console.log("at handleClick in Signup")
  },

  handleInput: function(e) {
    console.log("at handleInput in Signup")
  },
  
  render: function(){
    return (
      React.DOM.div(null, 
        React.DOM.div({className: "container"}, 
        React.DOM.h1(null, "Signup"), 
        React.DOM.form({className: "form-horizontal", role: "form"}, 
            React.DOM.div({className: "form-group"}, 
              React.DOM.label({for: "inputPassword3", className: "control-label"}, "Name"), 
              React.DOM.div({className: "container"}, 
                React.DOM.input({type: "text", className: "form-control", placeholder: "Name", onKeyPress: this.handleInput})
              )
            ), 
            React.DOM.div({className: "form-group"}, 
              React.DOM.label({for: "inputEmail3", className: "control-label"}, "Email"), 
              React.DOM.div({className: "container"}, 
                React.DOM.input({type: "email", className: "form-control", id: "inputEmail3", placeholder: "Email", onKeyPress: this.handleInput})
              )
            ), 
            React.DOM.div({className: "form-group"}, 
              React.DOM.label({for: "inputPassword3", className: "control-label"}, "Password"), 
              React.DOM.div({className: "container"}, 
                React.DOM.input({type: "password", className: "form-control", id: "inputPassword3", placeholder: "Password", onKeyPress: this.handleInput})
              )
            ), 
           
            React.DOM.div({className: "form-group"}, 
              React.DOM.div({className: "control-button"}, 
                React.DOM.button({type: "submit", className: "btn btn-default", onClick: this.handleClick}, "Sign up")
              )
            )
          )
        )
      )

      )
  }
})

module.exports = SIGNUP;

},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","./Banner.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Banner.jsx","./NavBar.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/NavBar.jsx","react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/ToDo.jsx":[function(require,module,exports){
/** @jsx React.DOM */

'use strict';


var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');
var ITEM = require('./Item.jsx');


var TODO = React.createClass({displayName: 'TODO',

  handleClick: function() {

    var task = this.refs.todo.getDOMNode().value.trim();
    if (task != '') {
      AppActions.addItemAction(task);
    }
    this.refs.todo.getDOMNode().value = '';
  },

  handleInput: function(e) {
    if (e.nativeEvent.charCode === 13) {
      this.handleClick();
    }
  },

  render: function(){
    var items = this.props.allTodos.map(function(item, i) {
      return ITEM({item: item, key: i})
    });
    return (
      React.DOM.div(null, 
        React.DOM.div({className: "container"}, 
          React.DOM.div(null, React.DOM.h1(null, "Welcome To The React-Flux-Fullstack Slush Generator")), 
          React.DOM.div({className: "input-group"}, 
            React.DOM.input({type: "text", className: "form-control", onKeyPress: this.handleInput, placeholder: "New item...", ref: "todo"}), 
            React.DOM.span({className: "input-group-btn"}, 
              React.DOM.button({className: "btn btn-primary", type: "button", onClick: this.handleClick}, "Add")
            )
            ), 
          React.DOM.div(null, React.DOM.h3(null, "Features:")), 
          React.DOM.ul({className: "list-group"}, 
            items
          )
        )
      )     
    );
  }
})

module.exports = TODO;
},{"../actions/AppActions":"/home/paul/Code/fundraiser/mydrive7/client/app/src/actions/AppActions.js","../stores/AppStore":"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js","./Item.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Item.jsx","react":"react"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/constants/AppConstants.js":[function(require,module,exports){
'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
  POPULATE: null,
  ADD: null,
  REMOVE: null
});

},{"react/lib/keyMirror":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyMirror.js"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/dispatchers/AppDispatcher.js":[function(require,module,exports){
/*ReadMe:
  Dispatchers operates as the central hub of data flow in a Flux application.
  They organize events into a single flow and ensure dependencies are taken care
  of at the right time before events continue to process.  Dispatchers act as a
  bridge function between user events/ web APIs and the stores so that the correct 
  changes can be made.
*/
'use strict';
var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');
var AppDispatcher = copyProperties(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   */
  handleViewAction: function(action) {
    return this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;

},{"flux":"flux","react/lib/copyProperties":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/copyProperties.js"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/routes.jsx":[function(require,module,exports){
/** @jsx React.DOM *//*jshint node:true*/

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


var APP = React.createClass({displayName: 'APP',
  render: function(){
    return (
      React.DOM.div(null, 
        NAV(null), 
        BANNER(null), 
        RouteHandler(null), 
        FOOTER(null)
      )
    );
  }
});

var routes = (
  Route({handler: APP}, 
    Route({name: "home", path: "/", handler: HOME}), 
    Route({name: "login", path: "/login", handler: LOGIN}), 
    Route({name: "signup", path: "/signup", handler: SIGNUP}), 
    DefaultRoute({handler: APP})
  )
);


module.exports = routes;
},{"./components/Banner.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Banner.jsx","./components/Footer.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Footer.jsx","./components/Home.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Home.jsx","./components/Login.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Login.jsx","./components/NavBar.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/NavBar.jsx","./components/Signup.jsx":"/home/paul/Code/fundraiser/mydrive7/client/app/src/components/Signup.jsx","react":"react","react-router":"react-router"}],"/home/paul/Code/fundraiser/mydrive7/client/app/src/stores/AppStore.js":[function(require,module,exports){
/*ReadMe:
  Stores manage data and business logic in a Flux application.
  Each store is responsible for a domain of the applicatoin, 
  and they update themselves in response to actions.  When they
  update, they emit an event that signals that their data has changed, 
  allowing the views to fetch the new data and update accordingly. 
*/

'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var Q = require('q');
var $ = require('jquery-browserify');

var CHANGE_EVENT = 'change';

var _data = {
  todos: []
};

// {item:'React', id: 0},
//     {item:'Flux', id: 1},
//     {item:'Gulp', id: 2},
//     {item:'Express Server', id: 3},
//     {item: 'Mongo Database', id: 4}
var staticPromise = function(params){
  var output = Q.defer();
  Q.resolve(params);
  return Q.promise;
}

var httpGet = function(url){
  var output = Q.defer();
  $.ajax({
    type: 'GET',
    url: url
  }).success(function(data){
    for (var i = 0; i < data.length; i++) {
      data[i].id = i;
    };
    _data.todos = data;
    output.resolve(data);
  }).error(function(error){
    output.reject(error);
  });
  return output.promise;
}
var AppStore = merge(EventEmitter.prototype, {

  getInitialData: function(){
    return _data;
  },

  getData: function(){
    return httpGet('/api/things');
  },


  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;

  if(action.actionType === AppConstants.POPULATE) {
    return AppStore.getData();
  }

  if(action.actionType === AppConstants.ADD){

    //Find out how many elements are in the todo.
    //Make new todo - id = highest id +1, message = name
    //Submit Post Req
    //On Success, getData?
    var id;
    if (_data.todos.length > 0) {
      id = _data.todos[_data.todos.length-1].id + 1;
    } else {
      id = 0;
    }
    var temp = {item: action.text, id: id};
    _data.todos.push(temp);
    AppStore.emitChange();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(temp),
      contentType: 'application/json',
      url: '/api/things/',
      success: function(item) {
        console.log('db reconciled with memory. added:', item);
        AppStore.getData();
      },
      failure: function(item) {
        console.log('db failed to reconciled with memory.');
        AppStore.getData();
        //Maybe add some Visual To improve user experience e.g. a sorry message
      }
    });
  }



  if(action.actionType === AppConstants.REMOVE){
    console.log(action)
    console.log(_data.todos)

    for (var i = 0; i < _data.todos.length; i++) {
      console.log(action.id);
      if (_data.todos[i].id === action.id) {
        var temp = _data.todos.splice(i, 1);
        AppStore.emitChange();
        console.log(temp[0]['_id'])
        //AJAX GET passing in n
        return $.ajax({
          type: 'DELETE',
          url: '/api/things/' + temp[0]['_id'],
          success: function(item){
            console.log('item removed successfully');
            console.log(item)
            AppStore.emitChange();
          },
          failure: function(failure){
            console.log('item remove failed', failure);
            AppStore.getData();
            AppStore.emitChange();
          },
        });
        break;
      }
    }
  }

  AppStore.emitChange();

});



module.exports = AppStore;

},{"../constants/AppConstants":"/home/paul/Code/fundraiser/mydrive7/client/app/src/constants/AppConstants.js","../dispatchers/AppDispatcher":"/home/paul/Code/fundraiser/mydrive7/client/app/src/dispatchers/AppDispatcher.js","events":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/events/events.js","jquery-browserify":"jquery-browserify","q":"q","react/lib/merge":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/merge.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/events/events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/ResponderEventPlugin.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ResponderEventPlugin
 */

"use strict";

var EventConstants = require('react/lib/EventConstants');
var EventPluginUtils = require('react/lib/EventPluginUtils');
var EventPropagators = require('react/lib/EventPropagators');
var SyntheticEvent = require('react/lib/SyntheticEvent');

var accumulateInto = require('react/lib/accumulateInto');
var keyOf = require('react/lib/keyOf');

var isStartish = EventPluginUtils.isStartish;
var isMoveish = EventPluginUtils.isMoveish;
var isEndish = EventPluginUtils.isEndish;
var executeDirectDispatch = EventPluginUtils.executeDirectDispatch;
var hasDispatches = EventPluginUtils.hasDispatches;
var executeDispatchesInOrderStopAtTrue =
  EventPluginUtils.executeDispatchesInOrderStopAtTrue;

/**
 * ID of element that should respond to touch/move types of interactions, as
 * indicated explicitly by relevant callbacks.
 */
var responderID = null;
var isPressing = false;

var eventTypes = {
  /**
   * On a `touchStart`/`mouseDown`, is it desired that this element become the
   * responder?
   */
  startShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onStartShouldSetResponder: null}),
      captured: keyOf({onStartShouldSetResponderCapture: null})
    }
  },

  /**
   * On a `scroll`, is it desired that this element become the responder? This
   * is usually not needed, but should be used to retroactively infer that a
   * `touchStart` had occured during momentum scroll. During a momentum scroll,
   * a touch start will be immediately followed by a scroll event if the view is
   * currently scrolling.
   */
  scrollShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onScrollShouldSetResponder: null}),
      captured: keyOf({onScrollShouldSetResponderCapture: null})
    }
  },

  /**
   * On a `touchMove`/`mouseMove`, is it desired that this element become the
   * responder?
   */
  moveShouldSetResponder: {
    phasedRegistrationNames: {
      bubbled: keyOf({onMoveShouldSetResponder: null}),
      captured: keyOf({onMoveShouldSetResponderCapture: null})
    }
  },

  /**
   * Direct responder events dispatched directly to responder. Do not bubble.
   */
  responderMove: {registrationName: keyOf({onResponderMove: null})},
  responderRelease: {registrationName: keyOf({onResponderRelease: null})},
  responderTerminationRequest: {
    registrationName: keyOf({onResponderTerminationRequest: null})
  },
  responderGrant: {registrationName: keyOf({onResponderGrant: null})},
  responderReject: {registrationName: keyOf({onResponderReject: null})},
  responderTerminate: {registrationName: keyOf({onResponderTerminate: null})}
};

/**
 * Performs negotiation between any existing/current responder, checks to see if
 * any new entity is interested in becoming responder, performs that handshake
 * and returns any events that must be emitted to notify the relevant parties.
 *
 * A note about event ordering in the `EventPluginHub`.
 *
 * Suppose plugins are injected in the following order:
 *
 * `[R, S, C]`
 *
 * To help illustrate the example, assume `S` is `SimpleEventPlugin` (for
 * `onClick` etc) and `R` is `ResponderEventPlugin`.
 *
 * "Deferred-Dispatched Events":
 *
 * - The current event plugin system will traverse the list of injected plugins,
 *   in order, and extract events by collecting the plugin's return value of
 *   `extractEvents()`.
 * - These events that are returned from `extractEvents` are "deferred
 *   dispatched events".
 * - When returned from `extractEvents`, deferred-dispatched events contain an
 *   "accumulation" of deferred dispatches.
 * - These deferred dispatches are accumulated/collected before they are
 *   returned, but processed at a later time by the `EventPluginHub` (hence the
 *   name deferred).
 *
 * In the process of returning their deferred-dispatched events, event plugins
 * themselves can dispatch events on-demand without returning them from
 * `extractEvents`. Plugins might want to do this, so that they can use event
 * dispatching as a tool that helps them decide which events should be extracted
 * in the first place.
 *
 * "On-Demand-Dispatched Events":
 *
 * - On-demand-dispatched events are not returned from `extractEvents`.
 * - On-demand-dispatched events are dispatched during the process of returning
 *   the deferred-dispatched events.
 * - They should not have side effects.
 * - They should be avoided, and/or eventually be replaced with another
 *   abstraction that allows event plugins to perform multiple "rounds" of event
 *   extraction.
 *
 * Therefore, the sequence of event dispatches becomes:
 *
 * - `R`s on-demand events (if any)   (dispatched by `R` on-demand)
 * - `S`s on-demand events (if any)   (dispatched by `S` on-demand)
 * - `C`s on-demand events (if any)   (dispatched by `C` on-demand)
 * - `R`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `S`s extracted events (if any)   (dispatched by `EventPluginHub`)
 * - `C`s extracted events (if any)   (dispatched by `EventPluginHub`)
 *
 * In the case of `ResponderEventPlugin`: If the `startShouldSetResponder`
 * on-demand dispatch returns `true` (and some other details are satisfied) the
 * `onResponderGrant` deferred dispatched event is returned from
 * `extractEvents`. The sequence of dispatch executions in this case
 * will appear as follows:
 *
 * - `startShouldSetResponder` (`ResponderEventPlugin` dispatches on-demand)
 * - `touchStartCapture`       (`EventPluginHub` dispatches as usual)
 * - `touchStart`              (`EventPluginHub` dispatches as usual)
 * - `responderGrant/Reject`   (`EventPluginHub` dispatches as usual)
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @param {string} topLevelTargetID ID of deepest React rendered element.
 * @param {object} nativeEvent Native browser event.
 * @return {*} An accumulation of synthetic events.
 */
function setResponderAndExtractTransfer(
    topLevelType,
    topLevelTargetID,
    nativeEvent) {
  var shouldSetEventType =
    isStartish(topLevelType) ? eventTypes.startShouldSetResponder :
    isMoveish(topLevelType) ? eventTypes.moveShouldSetResponder :
    eventTypes.scrollShouldSetResponder;

  var bubbleShouldSetFrom = responderID || topLevelTargetID;
  var shouldSetEvent = SyntheticEvent.getPooled(
    shouldSetEventType,
    bubbleShouldSetFrom,
    nativeEvent
  );
  EventPropagators.accumulateTwoPhaseDispatches(shouldSetEvent);
  var wantsResponderID = executeDispatchesInOrderStopAtTrue(shouldSetEvent);
  if (!shouldSetEvent.isPersistent()) {
    shouldSetEvent.constructor.release(shouldSetEvent);
  }

  if (!wantsResponderID || wantsResponderID === responderID) {
    return null;
  }
  var extracted;
  var grantEvent = SyntheticEvent.getPooled(
    eventTypes.responderGrant,
    wantsResponderID,
    nativeEvent
  );

  EventPropagators.accumulateDirectDispatches(grantEvent);
  if (responderID) {
    var terminationRequestEvent = SyntheticEvent.getPooled(
      eventTypes.responderTerminationRequest,
      responderID,
      nativeEvent
    );
    EventPropagators.accumulateDirectDispatches(terminationRequestEvent);
    var shouldSwitch = !hasDispatches(terminationRequestEvent) ||
      executeDirectDispatch(terminationRequestEvent);
    if (!terminationRequestEvent.isPersistent()) {
      terminationRequestEvent.constructor.release(terminationRequestEvent);
    }

    if (shouldSwitch) {
      var terminateType = eventTypes.responderTerminate;
      var terminateEvent = SyntheticEvent.getPooled(
        terminateType,
        responderID,
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(terminateEvent);
      extracted = accumulateInto(extracted, [grantEvent, terminateEvent]);
      responderID = wantsResponderID;
    } else {
      var rejectEvent = SyntheticEvent.getPooled(
        eventTypes.responderReject,
        wantsResponderID,
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(rejectEvent);
      extracted = accumulateInto(extracted, rejectEvent);
    }
  } else {
    extracted = accumulateInto(extracted, grantEvent);
    responderID = wantsResponderID;
  }
  return extracted;
}

/**
 * A transfer is a negotiation between a currently set responder and the next
 * element to claim responder status. Any start event could trigger a transfer
 * of responderID. Any move event could trigger a transfer, so long as there is
 * currently a responder set (in other words as long as the user is pressing
 * down).
 *
 * @param {string} topLevelType Record from `EventConstants`.
 * @return {boolean} True if a transfer of responder could possibly occur.
 */
function canTriggerTransfer(topLevelType) {
  return topLevelType === EventConstants.topLevelTypes.topScroll ||
         isStartish(topLevelType) ||
         (isPressing && isMoveish(topLevelType));
}

/**
 * Event plugin for formalizing the negotiation between claiming locks on
 * receiving touches.
 */
var ResponderEventPlugin = {

  getResponderID: function() {
    return responderID;
  },

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var extracted;
    // Must have missed an end event - reset the state here.
    if (responderID && isStartish(topLevelType)) {
      responderID = null;
    }
    if (isStartish(topLevelType)) {
      isPressing = true;
    } else if (isEndish(topLevelType)) {
      isPressing = false;
    }
    if (canTriggerTransfer(topLevelType)) {
      var transfer = setResponderAndExtractTransfer(
        topLevelType,
        topLevelTargetID,
        nativeEvent
      );
      if (transfer) {
        extracted = accumulateInto(extracted, transfer);
      }
    }
    // Now that we know the responder is set correctly, we can dispatch
    // responder type events (directly to the responder).
    var type = isMoveish(topLevelType) ? eventTypes.responderMove :
      isEndish(topLevelType) ? eventTypes.responderRelease :
      isStartish(topLevelType) ? eventTypes.responderStart : null;
    if (type) {
      var gesture = SyntheticEvent.getPooled(
        type,
        responderID || '',
        nativeEvent
      );
      EventPropagators.accumulateDirectDispatches(gesture);
      extracted = accumulateInto(extracted, gesture);
    }
    if (type === eventTypes.responderRelease) {
      responderID = null;
    }
    return extracted;
  }

};

module.exports = ResponderEventPlugin;

},{"react/lib/EventConstants":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventConstants.js","react/lib/EventPluginUtils":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginUtils.js","react/lib/EventPropagators":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPropagators.js","react/lib/SyntheticEvent":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/SyntheticEvent.js","react/lib/accumulateInto":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/accumulateInto.js","react/lib/keyOf":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyOf.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/TapEventPlugin.js":[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TapEventPlugin
 * @typechecks static-only
 */

"use strict";

var EventConstants = require('react/lib/EventConstants');
var EventPluginUtils = require('react/lib/EventPluginUtils');
var EventPropagators = require('react/lib/EventPropagators');
var SyntheticUIEvent = require('react/lib/SyntheticUIEvent');
var TouchEventUtils = require('./TouchEventUtils');
var ViewportMetrics = require('react/lib/ViewportMetrics');

var keyOf = require('react/lib/keyOf');
var topLevelTypes = EventConstants.topLevelTypes;

var isStartish = EventPluginUtils.isStartish;
var isEndish = EventPluginUtils.isEndish;

var isTouch = function(topLevelType) {
  var touchTypes = [
    topLevelTypes.topTouchCancel,
    topLevelTypes.topTouchEnd,
    topLevelTypes.topTouchStart,
    topLevelTypes.topTouchMove
  ];
  return touchTypes.indexOf(topLevelType) >= 0;
}

/**
 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
 * in order to still be considered a 'tap' event.
 */
var tapMoveThreshold = 10;
var ignoreMouseThreshold = 750;
var startCoords = {x: null, y: null};
var lastTouchEvent = null;

var Axis = {
  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
};

function getAxisCoordOfEvent(axis, nativeEvent) {
  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
  if (singleTouch) {
    return singleTouch[axis.page];
  }
  return axis.page in nativeEvent ?
    nativeEvent[axis.page] :
    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
}

function getDistance(coords, nativeEvent) {
  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
  return Math.pow(
    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
    0.5
  );
}

var dependencies = [
  topLevelTypes.topMouseDown,
  topLevelTypes.topMouseMove,
  topLevelTypes.topMouseUp
];

if (EventPluginUtils.useTouchEvents) {
  dependencies.push(
    topLevelTypes.topTouchCancel,
    topLevelTypes.topTouchEnd,
    topLevelTypes.topTouchStart,
    topLevelTypes.topTouchMove
  );
}

var eventTypes = {
  touchTap: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchTap: null}),
      captured: keyOf({onTouchTapCapture: null})
    },
    dependencies: dependencies
  }
};

var TapEventPlugin = {

  tapMoveThreshold: tapMoveThreshold,

  ignoreMouseThreshold: ignoreMouseThreshold,

  eventTypes: eventTypes,

  /**
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @see {EventPluginHub.extractEvents}
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {

    if (isTouch(topLevelType)) {
      lastTouchEvent = nativeEvent.timeStamp;
    } else {
      if (lastTouchEvent && (nativeEvent.timeStamp - lastTouchEvent) < ignoreMouseThreshold) {
        return null;
      }
    }

    if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
      return null;
    }
    var event = null;
    var distance = getDistance(startCoords, nativeEvent);
    if (isEndish(topLevelType) && distance < tapMoveThreshold) {
      event = SyntheticUIEvent.getPooled(
        eventTypes.touchTap,
        topLevelTargetID,
        nativeEvent
      );
    }
    if (isStartish(topLevelType)) {
      startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
      startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
    } else if (isEndish(topLevelType)) {
      startCoords.x = 0;
      startCoords.y = 0;
    }
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }

};

module.exports = TapEventPlugin;
},{"./TouchEventUtils":"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/TouchEventUtils.js","react/lib/EventConstants":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventConstants.js","react/lib/EventPluginUtils":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginUtils.js","react/lib/EventPropagators":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPropagators.js","react/lib/SyntheticUIEvent":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/SyntheticUIEvent.js","react/lib/ViewportMetrics":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/ViewportMetrics.js","react/lib/keyOf":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyOf.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/TouchEventUtils.js":[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TouchEventUtils
 */

var TouchEventUtils = {
  /**
   * Utility function for common case of extracting out the primary touch from a
   * touch event.
   * - `touchEnd` events usually do not have the `touches` property.
   *   http://stackoverflow.com/questions/3666929/
   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
   *
   * @param {Event} nativeEvent Native event that may or may not be a touch.
   * @return {TouchesObject?} an object with pageX and pageY or null.
   */
  extractSingleTouch: function(nativeEvent) {
    var touches = nativeEvent.touches;
    var changedTouches = nativeEvent.changedTouches;
    var hasTouches = touches && touches.length > 0;
    var hasChangedTouches = changedTouches && changedTouches.length > 0;

    return !hasTouches && hasChangedTouches ? changedTouches[0] :
           hasTouches ? touches[0] :
           nativeEvent;
  }
};

module.exports = TouchEventUtils;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/injectTapEventPlugin.js":[function(require,module,exports){
module.exports = function injectTapEventPlugin () {
  var React = require("react");
  React.initializeTouchEvents(true);

  require('react/lib/EventPluginHub').injection.injectEventPluginsByName({
    "ResponderEventPlugin": require('./ResponderEventPlugin.js'),
    "TapEventPlugin":       require('./TapEventPlugin.js')
  });
};

},{"./ResponderEventPlugin.js":"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/ResponderEventPlugin.js","./TapEventPlugin.js":"/home/paul/Code/fundraiser/mydrive7/node_modules/react-tap-event-plugin/src/TapEventPlugin.js","react":"react","react/lib/EventPluginHub":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginHub.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventConstants.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventConstants
 */

"use strict";

var keyMirror = require("./keyMirror");

var PropagationPhases = keyMirror({bubbled: null, captured: null});

/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = keyMirror({
  topBlur: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topReset: null,
  topScroll: null,
  topSelectionChange: null,
  topSubmit: null,
  topTextInput: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topWheel: null
});

var EventConstants = {
  topLevelTypes: topLevelTypes,
  PropagationPhases: PropagationPhases
};

module.exports = EventConstants;

},{"./keyMirror":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyMirror.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginHub.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginHub
 */

"use strict";

var EventPluginRegistry = require("./EventPluginRegistry");
var EventPluginUtils = require("./EventPluginUtils");

var accumulateInto = require("./accumulateInto");
var forEachAccumulated = require("./forEachAccumulated");
var invariant = require("./invariant");

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
var executeDispatchesAndRelease = function(event) {
  if (event) {
    var executeDispatch = EventPluginUtils.executeDispatch;
    // Plugins can provide custom behavior when dispatching events.
    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
    if (PluginModule && PluginModule.executeDispatch) {
      executeDispatch = PluginModule.executeDispatch;
    }
    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};

/**
 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
 *   hierarchy given ids of the logical DOM elements involved.
 */
var InstanceHandle = null;

function validateInstanceHandle() {
  var invalid = !InstanceHandle||
    !InstanceHandle.traverseTwoPhase ||
    !InstanceHandle.traverseEnterLeave;
  if (invalid) {
    throw new Error('InstanceHandle not injected before use!');
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {object} InjectedMount
     * @public
     */
    injectMount: EventPluginUtils.injection.injectMount,

    /**
     * @param {object} InjectedInstanceHandle
     * @public
     */
    injectInstanceHandle: function(InjectedInstanceHandle) {
      InstanceHandle = InjectedInstanceHandle;
      if ("production" !== process.env.NODE_ENV) {
        validateInstanceHandle();
      }
    },

    getInstanceHandle: function() {
      if ("production" !== process.env.NODE_ENV) {
        validateInstanceHandle();
      }
      return InstanceHandle;
    },

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

  registrationNameModules: EventPluginRegistry.registrationNameModules,

  /**
   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {?function} listener The callback to store.
   */
  putListener: function(id, registrationName, listener) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !listener || typeof listener === 'function',
      'Expected %s listener to be a function, instead got type %s',
      registrationName, typeof listener
    ) : invariant(!listener || typeof listener === 'function'));

    var bankForRegistrationName =
      listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[id] = listener;
  },

  /**
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    return bankForRegistrationName && bankForRegistrationName[id];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {string} id ID of the DOM element.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function(id, registrationName) {
    var bankForRegistrationName = listenerBank[registrationName];
    if (bankForRegistrationName) {
      delete bankForRegistrationName[id];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {string} id ID of the DOM element.
   */
  deleteAllListeners: function(id) {
    for (var registrationName in listenerBank) {
      delete listenerBank[registrationName][id];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @param {string} topLevelType Record from `EventConstants`.
   * @param {DOMEventTarget} topLevelTarget The listening component root node.
   * @param {string} topLevelTargetID ID of `topLevelTarget`.
   * @param {object} nativeEvent Native browser event.
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function(
      topLevelType,
      topLevelTarget,
      topLevelTargetID,
      nativeEvent) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0, l = plugins.length; i < l; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(
          topLevelType,
          topLevelTarget,
          topLevelTargetID,
          nativeEvent
        );
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function(events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function() {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
    ("production" !== process.env.NODE_ENV ? invariant(
      !eventQueue,
      'processEventQueue(): Additional events were enqueued while processing ' +
      'an event queue. Support for this has not yet been implemented.'
    ) : invariant(!eventQueue));
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function() {
    listenerBank = {};
  },

  __getListenerBank: function() {
    return listenerBank;
  }

};

module.exports = EventPluginHub;

}).call(this,require('_process'))

},{"./EventPluginRegistry":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginRegistry.js","./EventPluginUtils":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginUtils.js","./accumulateInto":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/accumulateInto.js","./forEachAccumulated":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/forEachAccumulated.js","./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginRegistry.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginRegistry
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Injectable ordering of event plugins.
 */
var EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!EventPluginOrder) {
    // Wait until an `EventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var PluginModule = namesToPlugins[pluginName];
    var pluginIndex = EventPluginOrder.indexOf(pluginName);
    ("production" !== process.env.NODE_ENV ? invariant(
      pluginIndex > -1,
      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
      'the plugin ordering, `%s`.',
      pluginName
    ) : invariant(pluginIndex > -1));
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    ("production" !== process.env.NODE_ENV ? invariant(
      PluginModule.extractEvents,
      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
      'method, but `%s` does not.',
      pluginName
    ) : invariant(PluginModule.extractEvents));
    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
    var publishedEvents = PluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      ("production" !== process.env.NODE_ENV ? invariant(
        publishEventForPlugin(
          publishedEvents[eventName],
          PluginModule,
          eventName
        ),
        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
        eventName,
        pluginName
      ) : invariant(publishEventForPlugin(
        publishedEvents[eventName],
        PluginModule,
        eventName
      )));
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'event name, `%s`.',
    eventName
  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(
          phasedRegistrationName,
          PluginModule,
          eventName
        );
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(
      dispatchConfig.registrationName,
      PluginModule,
      eventName
    );
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, PluginModule, eventName) {
  ("production" !== process.env.NODE_ENV ? invariant(
    !EventPluginRegistry.registrationNameModules[registrationName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
    'registration name, `%s`.',
    registrationName
  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] =
    PluginModule.eventTypes[eventName].dependencies;
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function(InjectedEventPluginOrder) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !EventPluginOrder,
      'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
      'once. You are likely trying to load more than one copy of React.'
    ) : invariant(!EventPluginOrder));
    // Clone the ordering so it cannot be dynamically mutated.
    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var PluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) ||
          namesToPlugins[pluginName] !== PluginModule) {
        ("production" !== process.env.NODE_ENV ? invariant(
          !namesToPlugins[pluginName],
          'EventPluginRegistry: Cannot inject two different event plugins ' +
          'using the same name, `%s`.',
          pluginName
        ) : invariant(!namesToPlugins[pluginName]));
        namesToPlugins[pluginName] = PluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function(event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[
        dispatchConfig.registrationName
      ] || null;
    }
    for (var phase in dispatchConfig.phasedRegistrationNames) {
      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
        continue;
      }
      var PluginModule = EventPluginRegistry.registrationNameModules[
        dispatchConfig.phasedRegistrationNames[phase]
      ];
      if (PluginModule) {
        return PluginModule;
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function() {
    EventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }
  }

};

module.exports = EventPluginRegistry;

}).call(this,require('_process'))

},{"./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginUtils.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPluginUtils
 */

"use strict";

var EventConstants = require("./EventConstants");

var invariant = require("./invariant");

/**
 * Injected dependencies:
 */

/**
 * - `Mount`: [required] Module that can convert between React dom IDs and
 *   actual node references.
 */
var injection = {
  Mount: null,
  injectMount: function(InjectedMount) {
    injection.Mount = InjectedMount;
    if ("production" !== process.env.NODE_ENV) {
      ("production" !== process.env.NODE_ENV ? invariant(
        InjectedMount && InjectedMount.getNode,
        'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
        'is missing getNode.'
      ) : invariant(InjectedMount && InjectedMount.getNode));
    }
  }
};

var topLevelTypes = EventConstants.topLevelTypes;

function isEndish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseUp ||
         topLevelType === topLevelTypes.topTouchEnd ||
         topLevelType === topLevelTypes.topTouchCancel;
}

function isMoveish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseMove ||
         topLevelType === topLevelTypes.topTouchMove;
}
function isStartish(topLevelType) {
  return topLevelType === topLevelTypes.topMouseDown ||
         topLevelType === topLevelTypes.topTouchStart;
}


var validateEventDispatches;
if ("production" !== process.env.NODE_ENV) {
  validateEventDispatches = function(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchIDs = event._dispatchIDs;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var idsIsArr = Array.isArray(dispatchIDs);
    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
    var listenersLen = listenersIsArr ?
      dispatchListeners.length :
      dispatchListeners ? 1 : 0;

    ("production" !== process.env.NODE_ENV ? invariant(
      idsIsArr === listenersIsArr && IDsLen === listenersLen,
      'EventPluginUtils: Invalid `event`.'
    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
  };
}

/**
 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
 * kept separate to conserve memory.
 */
function forEachEventDispatch(event, cb) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      cb(event, dispatchListeners[i], dispatchIDs[i]);
    }
  } else if (dispatchListeners) {
    cb(event, dispatchListeners, dispatchIDs);
  }
}

/**
 * Default implementation of PluginModule.executeDispatch().
 * @param {SyntheticEvent} SyntheticEvent to handle
 * @param {function} Application-level callback
 * @param {string} domID DOM id to pass to the callback.
 */
function executeDispatch(event, listener, domID) {
  event.currentTarget = injection.Mount.getNode(domID);
  var returnValue = listener(event, domID);
  event.currentTarget = null;
  return returnValue;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, executeDispatch) {
  forEachEventDispatch(event, executeDispatch);
  event._dispatchListeners = null;
  event._dispatchIDs = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return id of the first dispatch execution who's listener returns true, or
 * null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchIDs = event._dispatchIDs;
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and IDs are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchIDs[i])) {
        return dispatchIDs[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchIDs)) {
      return dispatchIDs;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchIDs = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if ("production" !== process.env.NODE_ENV) {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchID = event._dispatchIDs;
  ("production" !== process.env.NODE_ENV ? invariant(
    !Array.isArray(dispatchListener),
    'executeDirectDispatch(...): Invalid `event`.'
  ) : invariant(!Array.isArray(dispatchListener)));
  var res = dispatchListener ?
    dispatchListener(event, dispatchID) :
    null;
  event._dispatchListeners = null;
  event._dispatchIDs = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {bool} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatch: executeDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,
  injection: injection,
  useTouchEvents: false
};

module.exports = EventPluginUtils;

}).call(this,require('_process'))

},{"./EventConstants":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventConstants.js","./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPropagators.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventPropagators
 */

"use strict";

var EventConstants = require("./EventConstants");
var EventPluginHub = require("./EventPluginHub");

var accumulateInto = require("./accumulateInto");
var forEachAccumulated = require("./forEachAccumulated");

var PropagationPhases = EventConstants.PropagationPhases;
var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(id, event, propagationPhase) {
  var registrationName =
    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(id, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(domID, upwards, event) {
  if ("production" !== process.env.NODE_ENV) {
    if (!domID) {
      throw new Error('Dispatching id must not be null');
    }
  }
  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
  var listener = listenerAtPhase(domID, event, phase);
  if (listener) {
    event._dispatchListeners =
      accumulateInto(event._dispatchListeners, listener);
    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We can not perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
      event.dispatchMarker,
      accumulateDirectionalDispatches,
      event
    );
  }
}


/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(id, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(id, registrationName);
    if (listener) {
      event._dispatchListeners =
        accumulateInto(event._dispatchListeners, listener);
      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event.dispatchMarker, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
    fromID,
    toID,
    accumulateDispatches,
    leave,
    enter
  );
}


function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}



/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;

}).call(this,require('_process'))

},{"./EventConstants":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventConstants.js","./EventPluginHub":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/EventPluginHub.js","./accumulateInto":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/accumulateInto.js","./forEachAccumulated":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/forEachAccumulated.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/Object.assign.js":[function(require,module,exports){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/PooledClass.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PooledClass
 */

"use strict";

var invariant = require("./invariant");

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function(copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function(a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function(a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function(instance) {
  var Klass = this;
  ("production" !== process.env.NODE_ENV ? invariant(
    instance instanceof Klass,
    'Trying to release an instance into a pool of a different type.'
  ) : invariant(instance instanceof Klass));
  if (instance.destructor) {
    instance.destructor();
  }
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function(CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;

}).call(this,require('_process'))

},{"./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/SyntheticEvent.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticEvent
 * @typechecks static-only
 */

"use strict";

var PooledClass = require("./PooledClass");

var assign = require("./Object.assign");
var emptyFunction = require("./emptyFunction");
var getEventTarget = require("./getEventTarget");

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: getEventTarget,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 */
function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  this.dispatchConfig = dispatchConfig;
  this.dispatchMarker = dispatchMarker;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      this[propName] = nativeEvent[propName];
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ?
    nativeEvent.defaultPrevented :
    nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
}

assign(SyntheticEvent.prototype, {

  preventDefault: function() {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function() {
    var event = this.nativeEvent;
    event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function() {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function() {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      this[propName] = null;
    }
    this.dispatchConfig = null;
    this.dispatchMarker = null;
    this.nativeEvent = null;
  }

});

SyntheticEvent.Interface = EventInterface;

/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function(Class, Interface) {
  var Super = this;

  var prototype = Object.create(Super.prototype);
  assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

module.exports = SyntheticEvent;

},{"./Object.assign":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/Object.assign.js","./PooledClass":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/PooledClass.js","./emptyFunction":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/emptyFunction.js","./getEventTarget":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/getEventTarget.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/SyntheticUIEvent.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule SyntheticUIEvent
 * @typechecks static-only
 */

"use strict";

var SyntheticEvent = require("./SyntheticEvent");

var getEventTarget = require("./getEventTarget");

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function(event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target != null && target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function(event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

},{"./SyntheticEvent":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/SyntheticEvent.js","./getEventTarget":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/getEventTarget.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/ViewportMetrics.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ViewportMetrics
 */

"use strict";

var getUnboundedScrollPosition = require("./getUnboundedScrollPosition");

var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function() {
    var scrollPosition = getUnboundedScrollPosition(window);
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

},{"./getUnboundedScrollPosition":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/getUnboundedScrollPosition.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/accumulateInto.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule accumulateInto
 */

"use strict";

var invariant = require("./invariant");

/**
 *
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  ("production" !== process.env.NODE_ENV ? invariant(
    next != null,
    'accumulateInto(...): Accumulated items must not be null or undefined.'
  ) : invariant(next != null));
  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  var currentIsArray = Array.isArray(current);
  var nextIsArray = Array.isArray(next);

  if (currentIsArray && nextIsArray) {
    current.push.apply(current, next);
    return current;
  }

  if (currentIsArray) {
    current.push(next);
    return current;
  }

  if (nextIsArray) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

module.exports = accumulateInto;

}).call(this,require('_process'))

},{"./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/copyProperties.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule copyProperties
 */

/**
 * Copy properties from one or more objects (up to 5) into the first object.
 * This is a shallow copy. It mutates the first object and also returns it.
 *
 * NOTE: `arguments` has a very significant performance penalty, which is why
 * we don't support unlimited arguments.
 */
function copyProperties(obj, a, b, c, d, e, f) {
  obj = obj || {};

  if ("production" !== process.env.NODE_ENV) {
    if (f) {
      throw new Error('Too many arguments passed to copyProperties');
    }
  }

  var args = [a, b, c, d, e];
  var ii = 0, v;
  while (args[ii]) {
    v = args[ii++];
    for (var k in v) {
      obj[k] = v[k];
    }

    // IE ignores toString in object iteration.. See:
    // webreflection.blogspot.com/2007/07/quick-fix-internet-explorer-and.html
    if (v.hasOwnProperty && v.hasOwnProperty('toString') &&
        (typeof v.toString != 'undefined') && (obj.toString !== v.toString)) {
      obj.toString = v.toString;
    }
  }

  return obj;
}

module.exports = copyProperties;

// deprecation notice
console.warn(
  'react/lib/copyProperties has been deprecated and will be removed in the ' +
  'next version of React. All uses can be replaced with ' +
  'Object.assign(obj, a, b, ...) or _.extend(obj, a, b, ...).'
);

}).call(this,require('_process'))

},{"_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/emptyFunction.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/forEachAccumulated.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule forEachAccumulated
 */

"use strict";

/**
 * @param {array} an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */
var forEachAccumulated = function(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
};

module.exports = forEachAccumulated;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/getEventTarget.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getEventTarget
 * @typechecks static-only
 */

"use strict";

/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */
function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;
  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/getUnboundedScrollPosition.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getUnboundedScrollPosition
 * @typechecks
 */

"use strict";

/**
 * Gets the scroll position of the supplied element or window.
 *
 * The return values are unbounded, unlike `getScrollPosition`. This means they
 * may be negative or exceed the element boundaries (which is possible using
 * inertial scrolling).
 *
 * @param {DOMWindow|DOMElement} scrollable
 * @return {object} Map with `x` and `y` keys.
 */
function getUnboundedScrollPosition(scrollable) {
  if (scrollable === window) {
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  return {
    x: scrollable.scrollLeft,
    y: scrollable.scrollTop
  };
}

module.exports = getUnboundedScrollPosition;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyMirror.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyMirror
 * @typechecks static-only
 */

"use strict";

var invariant = require("./invariant");

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  ("production" !== process.env.NODE_ENV ? invariant(
    obj instanceof Object && !Array.isArray(obj),
    'keyMirror(...): Argument must be an object.'
  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

}).call(this,require('_process'))

},{"./invariant":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/invariant.js","_process":"/home/paul/Code/fundraiser/mydrive7/node_modules/browserify/node_modules/process/browser.js"}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/keyOf.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without loosing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};


module.exports = keyOf;

},{}],"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/merge.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule merge
 */

"use strict";

var assign = require("./Object.assign");

/**
 * Shallow merges two structures into a return value, without mutating either.
 *
 * @param {?object} one Optional object with properties to merge from.
 * @param {?object} two Optional object with properties to merge from.
 * @return {object} The shallow extension of one by two.
 */
var merge = function(one, two) {
  return assign({}, one, two);
};

module.exports = merge;

// deprecation notice
console.warn(
  'react/lib/merge has been deprecated and will be removed in the ' +
  'next version of React. All uses can be replaced with ' +
  'Object.assign({}, a, b) or _.extend({}, a, b).'
);

},{"./Object.assign":"/home/paul/Code/fundraiser/mydrive7/node_modules/react/lib/Object.assign.js"}]},{},["./client/app/src/app.jsx"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuL2NsaWVudC9hcHAvc3JjL2FwcC5qc3giLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9jbGllbnQvYXBwL3NyYy9hY3Rpb25zL0FwcEFjdGlvbnMuanMiLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9jbGllbnQvYXBwL3NyYy9jb21wb25lbnRzL0Jhbm5lci5qc3giLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9jbGllbnQvYXBwL3NyYy9jb21wb25lbnRzL0Zvb3Rlci5qc3giLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9jbGllbnQvYXBwL3NyYy9jb21wb25lbnRzL0hvbWUuanN4IiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvY2xpZW50L2FwcC9zcmMvY29tcG9uZW50cy9JdGVtLmpzeCIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L2NsaWVudC9hcHAvc3JjL2NvbXBvbmVudHMvTG9naW4uanN4IiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvY2xpZW50L2FwcC9zcmMvY29tcG9uZW50cy9OYXZCYXIuanN4IiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvY2xpZW50L2FwcC9zcmMvY29tcG9uZW50cy9TaWdudXAuanN4IiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvY2xpZW50L2FwcC9zcmMvY29tcG9uZW50cy9Ub0RvLmpzeCIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L2NsaWVudC9hcHAvc3JjL2NvbnN0YW50cy9BcHBDb25zdGFudHMuanMiLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9jbGllbnQvYXBwL3NyYy9kaXNwYXRjaGVycy9BcHBEaXNwYXRjaGVyLmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvY2xpZW50L2FwcC9zcmMvcm91dGVzLmpzeCIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L2NsaWVudC9hcHAvc3JjL3N0b3Jlcy9BcHBTdG9yZS5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC10YXAtZXZlbnQtcGx1Z2luL3NyYy9SZXNwb25kZXJFdmVudFBsdWdpbi5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC10YXAtZXZlbnQtcGx1Z2luL3NyYy9UYXBFdmVudFBsdWdpbi5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC10YXAtZXZlbnQtcGx1Z2luL3NyYy9Ub3VjaEV2ZW50VXRpbHMuanMiLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9ub2RlX21vZHVsZXMvcmVhY3QtdGFwLWV2ZW50LXBsdWdpbi9zcmMvaW5qZWN0VGFwRXZlbnRQbHVnaW4uanMiLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9ub2RlX21vZHVsZXMvcmVhY3QvbGliL0V2ZW50Q29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9FdmVudFBsdWdpbkh1Yi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvRXZlbnRQbHVnaW5SZWdpc3RyeS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvRXZlbnRQbHVnaW5VdGlscy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvRXZlbnRQcm9wYWdhdG9ycy5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUG9vbGVkQ2xhc3MuanMiLCIvaG9tZS9wYXVsL0NvZGUvZnVuZHJhaXNlci9teWRyaXZlNy9ub2RlX21vZHVsZXMvcmVhY3QvbGliL1N5bnRoZXRpY0V2ZW50LmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvbm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9TeW50aGV0aWNVSUV2ZW50LmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvbm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9WaWV3cG9ydE1ldHJpY3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2FjY3VtdWxhdGVJbnRvLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jb3B5UHJvcGVydGllcy5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC9saWIvZm9yRWFjaEFjY3VtdWxhdGVkLmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvbm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9nZXRFdmVudFRhcmdldC5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC9saWIvZ2V0VW5ib3VuZGVkU2Nyb2xsUG9zaXRpb24uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIva2V5TWlycm9yLmpzIiwiL2hvbWUvcGF1bC9Db2RlL2Z1bmRyYWlzZXIvbXlkcml2ZTcvbm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9rZXlPZi5qcyIsIi9ob21lL3BhdWwvQ29kZS9mdW5kcmFpc2VyL215ZHJpdmU3L25vZGVfbW9kdWxlcy9yZWFjdC9saWIvbWVyZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8qanNoaW50IG5vZGU6dHJ1ZSovXG5cbi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG4vKlJlYWRNZTpcbiAgQ29tcG9uZW50cyBhcmUgd2hlcmUgeW91IHdpbGwgYmUgZGVzaWduaW5nIHlvdXIgdmlldyBpbiB0aGVcbiAgcmVuZGVyIHNlY3Rpb24uICBUaGlzIGNvZGUgaXMgd3JpdHRlbiBpbiBqc3g7IDx0aGlzLnByb3BzLmFjdGl2ZVJvdXRlSGFuZGxlci8+XG4gIGlzIHVzZWQgYmVsb3cgZm9yIGNoYW5naW5nIHZpZXdzIGZvciByb3V0aW5nLiAgXG5cbiAgVG8gYWRkIGNvbXBvbmVudHMsIHlvdSBjYW4gcnVuIHJlYWN0LWZ1bGxzdGFjazpjb21wb25lbnQsIGFuZCBpdCB3aWxsIGNyZWF0ZSBhIG5ldyBjb21wb25lbnQgZmlsZSBpbiB0aGUgZm9sZGVyLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cblxudmFyIEFwcFJvdXRlcz1yZXF1aXJlKCcuL3JvdXRlcy5qc3gnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcblxuXG52YXIgaW5qZWN0VGFwRXZlbnRQbHVnaW4gPSByZXF1aXJlKFwicmVhY3QtdGFwLWV2ZW50LXBsdWdpblwiKTtcblxuLy9OZWVkZWQgZm9yIG9uVG91Y2hUYXBcbi8vQ2FuIGdvIGF3YXkgd2hlbiByZWFjdCAxLjAgcmVsZWFzZVxuLy9DaGVjayB0aGlzIHJlcG86XG4vL2h0dHBzOi8vZ2l0aHViLmNvbS96aWx2ZXJsaW5lL3JlYWN0LXRhcC1ldmVudC1wbHVnaW5cbmluamVjdFRhcEV2ZW50UGx1Z2luKCk7XG5cblxuXG5cblxuXG5Sb3V0ZXJcbiAgLy8gUnVucyB0aGUgcm91dGVyLCBzaW1pbGlhciB0byB0aGUgUm91dGVyLnJ1biBtZXRob2QuIFlvdSBjYW4gdGhpbmsgb2YgaXQgYXMgYW4gXG4gIC8vIGluaXRpYWxpemVyL2NvbnN0cnVjdG9yIG1ldGhvZC5cbiAgLmNyZWF0ZSh7XG4gICAgcm91dGVzOiBBcHBSb3V0ZXMsXG4gICAgc2Nyb2xsQmVoYXZpb3I6IFJvdXRlci5TY3JvbGxUb1RvcEJlaGF2aW9yXG4gIH0pXG4gIC8vIFRoaXMgaXMgb3VyIGNhbGxiYWNrIGZ1bmN0aW9uLCB3aGVuZXZlciB0aGUgdXJsIGNoYW5nZXMgaXQgd2lsbCBiZSBjYWxsZWQgYWdhaW4uIFxuICAvLyBIYW5kbGVyOiBUaGUgUmVhY3RDb21wb25lbnQgY2xhc3MgdGhhdCB3aWxsIGJlIHJlbmRlcmVkICBcbiAgLnJ1bihmdW5jdGlvbiAoSGFuZGxlcikge1xuICAgIFJlYWN0LnJlbmRlcihIYW5kbGVyKG51bGwpLCBkb2N1bWVudC5ib2R5KTtcbiAgfSk7XG4vLyBtb2R1bGUuZXhwb3J0cyA9IFJlYWN0LnJlbmRlcihyb3V0ZXMsIGRvY3VtZW50LmJvZHkpO1xuIiwiLypSZWFkTWU6XG4gIEFjdGlvbnMgYXJlIGRhdGEgcGFja2FnZWQgZnJvbSB1c2VyIGludGVyYWN0aW9ucyBvciB3ZWIgQVBJcy5cbiAgSXQgaXMgYW4gb2JqZWN0IGxpdGVyYWwgY29udGFpbmluZyB0aGUgbmV3IGZpZWxkcyBvZiBkYXRhIGFuZFxuICBzcGVjaWZpYyBhY3Rpb24gdHlwZXMuICBBY3Rpb25zIGFyZSBzZW50IHRvIHRoZSBkaXNwYXRjaGVyIGJlZm9yZVxuICB0aGUgc3RvcmUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXJzL0FwcERpc3BhdGNoZXInKTtcbnZhciBBcHBDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvQXBwQ29uc3RhbnRzJyk7XG5cbnZhciBBcHBBY3Rpb25zID0ge1xuICBwb3B1bGF0ZUFjdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUE9QVUxBVEVcbiAgICB9KTtcbiAgfSxcbiAgYWRkSXRlbUFjdGlvbjogZnVuY3Rpb24odGV4dCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuQURELFxuICAgICAgdGV4dDogdGV4dFxuICAgIH0pO1xuICB9LFxuICByZW1vdmVJdGVtQWN0aW9uOiBmdW5jdGlvbihpZCkge1xuICAgIEFwcERpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7XG4gICAgICBhY3Rpb25UeXBlOiBBcHBDb25zdGFudHMuUkVNT1ZFLFxuICAgICAgaWQ6IGlkXG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwQWN0aW9ucztcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBCQU5ORVIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdCQU5ORVInLFxuIFxuICBcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29udGFpbmVyLWZsdWlkIGJhbm5lclwifSwgXG4gICAgICAgIFJlYWN0LkRPTS5pbWcoe3NyYzogXCJodHRwOi8vczI4LnBvc3RpbWcub3JnL3VpcTR6eTNqMS9zbHVzaF9yZWFjdF9mdWxsc3RhY2sucG5nXCJ9KVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBCQU5ORVI7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEZPT1RFUiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0ZPT1RFUicsXG4gXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmb290ZXJcIn0sIFxuICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICBSZWFjdC5ET00ucCh7Y2xhc3NOYW1lOiBcInRleHQtbXV0ZWRcIn0sIFwiIEZvcmsgbWUgb24gR2l0aHViISBcIilcbiAgICAgICAgKVxuICAgICAgKVxuICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBGT09URVI7IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQXBwU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBBcHBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BcHBBY3Rpb25zJyk7XG5cbnZhciBOQVYgPSByZXF1aXJlKCcuL05hdkJhci5qc3gnKTtcbnZhciBCQU5ORVIgPSByZXF1aXJlKCcuL0Jhbm5lci5qc3gnKTtcbnZhciBUT0RPID0gcmVxdWlyZSgnLi9Ub0RvLmpzeCcpO1xuXG52YXIgUSA9IHJlcXVpcmUoJ3EnKTtcblxuZnVuY3Rpb24gZ2V0QXBwU3RhdGUoKXtcbiAgcmV0dXJuIEFwcFN0b3JlLmdldERhdGEoKTtcbn07XG5cbmZ1bmN0aW9uIGdldEluaXRpYWxBcHBTdGF0ZSgpe1xuICByZXR1cm4gQXBwU3RvcmUuZ2V0SW5pdGlhbERhdGEoKTtcbn1cblxudmFyIEFQUCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0FQUCcsXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZ2V0SW5pdGlhbEFwcFN0YXRlKCk7XG4gICAgLy8gcmV0dXJuIGdldEFwcFN0YXRlKCk7XG4gICAgLy8gcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgX29uQ2hhbmdlOiBmdW5jdGlvbigpe1xuICAgIC8vIHRoaXMuc2V0U3RhdGUoZ2V0QXBwU3RhdGUoKSk7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIFEoZ2V0QXBwU3RhdGUoKSkudGhlbihmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2UnKVxuICAgICAgY29uc29sZS5sb2cocHJvbWlzZSlcbiAgICAgIHRoYXQuc2V0U3RhdGUoe3RvZG9zOiBwcm9taXNlfSlcbiAgICB9KVxuXG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKDEpXG4gICAgQXBwU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5fb25DaGFuZ2UpO1xuICAgIC8vIFEoQXBwQWN0aW9ucy5wb3B1bGF0ZUFjdGlvbigpKS50aGVuKGZ1bmN0aW9uKHByb21pc2VkRGF0YSl7XG4gICAgLy8gICBjb25zb2xlLmxvZyhwcm9taXNlZERhdGEpO1xuICAgIC8vICAgdGhpcy5zZXRTdGF0ZShwcm9taXNlZERhdGEpO1xuICAgIC8vIH0pO1xuICAgIFEoZ2V0QXBwU3RhdGUoKSkudGhlbihmdW5jdGlvbihwcm9taXNlKXtcbiAgICAgIGNvbnNvbGUubG9nKDIpXG4gICAgICBjb25zb2xlLmxvZyhcInRoaXM6XCIsdGhhdClcbiAgICAgIGNvbnNvbGUubG9nKHByb21pc2UpXG4gICAgICAvLyB2YXIgZGF0YSA9IHt0b2RvczogcHJvbWlzZX1cbiAgICAgIHRoYXQuc2V0U3RhdGUoe3RvZG9zOiBwcm9taXNlfSlcbiAgICB9KVxuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpe1xuICAgIEFwcFN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uQ2hhbmdlKTtcbiAgfSxcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oKXtcbiAgICBBcHBBY3Rpb25zLmV4YW1wbGVBY3Rpb24oJ0RhdGEgZnJvbSBWaWV3Jyk7XG4gIH0sXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFRPRE8oe2FsbFRvZG9zOiB0aGlzLnN0YXRlLnRvZG9zfSlcbiAgICAgIClcbiAgICAgIClcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBBUFA7XG4iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbi8qanNoaW50IG5vZGU6dHJ1ZSovXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQXBwU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBBcHBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BcHBBY3Rpb25zJyk7XG5cblxudmFyIElURU0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdJVEVNJyxcblxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBBcHBBY3Rpb25zLnJlbW92ZUl0ZW1BY3Rpb24odGhpcy5wcm9wcy5pdGVtLmlkKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiAoXG4gICAgICBSZWFjdC5ET00ubGkoe2tleTogdGhpcy5wcm9wcy5rZXksIGNsYXNzTmFtZTogXCJsaXN0LWdyb3VwLWl0ZW1cIn0sIFxuICAgICAgICB0aGlzLnByb3BzLml0ZW0uaXRlbSwgXG4gICAgICAgIFJlYWN0LkRPTS5hKHtjbGFzc05hbWU6IFwiY2xvc2VcIiwgb25DbGljazogdGhpcy5oYW5kbGVDbGljaywgaHJlZjogXCIjXCJ9LCBcInhcIilcbiAgICAgICkgXG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSVRFTTsiLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBBcHBTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9BcHBTdG9yZScpO1xudmFyIEFwcEFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0FwcEFjdGlvbnMnKTtcblxudmFyIE5BViA9IHJlcXVpcmUoJy4vTmF2QmFyLmpzeCcpO1xudmFyIEJBTk5FUiA9IHJlcXVpcmUoJy4vQmFubmVyLmpzeCcpO1xuXG52YXIgTE9HSU4gID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTE9HSU4nLFxuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpe1xuICAgIGNvbnNvbGUubG9nKFwiYXQgaGFuZGxlQ2xpY2sgaW4gU2lnbnVwXCIpXG4gIH0sXG5cbiAgaGFuZGxlSW5wdXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcImF0IGhhbmRsZUlucHV0IGluIExvZ2luXCIpXG4gIH0sXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjb250YWluZXJcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5oMShudWxsLCBcIkxvZ2luXCIpLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5mb3JtKHtjbGFzc05hbWU6IFwiZm9ybS1ob3Jpem9udGFsXCIsIHJvbGU6IFwiZm9ybVwifSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoe2ZvcjogXCJpbnB1dEVtYWlsM1wiLCBjbGFzc05hbWU6IFwiY29udHJvbC1sYWJlbFwifSwgXCJFbWFpbFwiKSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwiZW1haWxcIiwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCBpZDogXCJpbnB1dEVtYWlsM1wiLCBwbGFjZWhvbGRlcjogXCJFbWFpbFwiLCBvbktleVByZXNzOiB0aGlzLmhhbmRsZUlucHV0fSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKHtmb3I6IFwiaW5wdXRQYXNzd29yZDNcIiwgY2xhc3NOYW1lOiBcImNvbnRyb2wtbGFiZWxcIn0sIFwiUGFzc3dvcmRcIiksIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjb250YWluZXJcIn0sIFxuICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInBhc3N3b3JkXCIsIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgaWQ6IFwiaW5wdXRQYXNzd29yZDNcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiwgb25LZXlQcmVzczogdGhpcy5oYW5kbGVJbnB1dH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY2hlY2tib3hcIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwobnVsbCwgXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcImNoZWNrYm94XCJ9KSwgXCIgUmVtZW1iZXIgbWVcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjb250cm9sLWJ1dHRvblwifSwgXG4gICAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHt0eXBlOiBcInN1Ym1pdFwiLCBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2t9LCBcIlNpZ24gaW5cIilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IExPR0lOO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQXBwU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBBcHBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BcHBBY3Rpb25zJyk7XG5cbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBMaW5rID0gUm91dGVyLkxpbms7XG5cbmZ1bmN0aW9uIGdldEFwcFN0YXRlKCl7XG4gIHJldHVybiBBcHBTdG9yZS5nZXREYXRhKCk7XG59O1xuXG52YXIgTkFWID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnTkFWJyxcbiAgXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuRE9NLm5hdih7Y2xhc3NOYW1lOiBcIm5hdmJhciBuYXZiYXItZGVmYXVsdFwiLCByb2xlOiBcIm5hdmlnYXRpb25cIn0sIFxuICAgICAgICBMaW5rKHtjbGFzc05hbWU6IFwibmF2YmFyLWJyYW5kXCIsIHRvOiBcImhvbWVcIn0sIFwiTXlEcml2ZTVcIiksIFxuICAgICAgICBSZWFjdC5ET00udWwoe2NsYXNzTmFtZTogXCJuYXYgbmF2YmFyLW5hdiBuYXZiYXItcmlnaHRcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5saShudWxsLCBMaW5rKHt0bzogXCJzaWdudXBcIn0sIFwiU2lnbnVwXCIpKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmxpKG51bGwsIExpbmsoe2NsYXNzTmFtZTogXCJsb2dpblwiLCB0bzogXCJsb2dpblwifSwgXCJMb2dpblwiKSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTkFWOyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIEFwcFN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0FwcFN0b3JlJyk7XG52YXIgQXBwQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvQXBwQWN0aW9ucycpO1xuXG52YXIgTkFWID0gcmVxdWlyZSgnLi9OYXZCYXIuanN4Jyk7XG52YXIgQkFOTkVSID0gcmVxdWlyZSgnLi9CYW5uZXIuanN4JylcblxuXG52YXIgU0lHTlVQICA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1NJR05VUCcsXG5cbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCl7XG4gICAgY29uc29sZS5sb2coXCJhdCBoYW5kbGVDbGljayBpbiBTaWdudXBcIilcbiAgfSxcblxuICBoYW5kbGVJbnB1dDogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFwiYXQgaGFuZGxlSW5wdXQgaW4gU2lnbnVwXCIpXG4gIH0sXG4gIFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjb250YWluZXJcIn0sIFxuICAgICAgICBSZWFjdC5ET00uaDEobnVsbCwgXCJTaWdudXBcIiksIFxuICAgICAgICBSZWFjdC5ET00uZm9ybSh7Y2xhc3NOYW1lOiBcImZvcm0taG9yaXpvbnRhbFwiLCByb2xlOiBcImZvcm1cIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImZvcm0tZ3JvdXBcIn0sIFxuICAgICAgICAgICAgICBSZWFjdC5ET00ubGFiZWwoe2ZvcjogXCJpbnB1dFBhc3N3b3JkM1wiLCBjbGFzc05hbWU6IFwiY29udHJvbC1sYWJlbFwifSwgXCJOYW1lXCIpLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInRleHRcIiwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCBwbGFjZWhvbGRlcjogXCJOYW1lXCIsIG9uS2V5UHJlc3M6IHRoaXMuaGFuZGxlSW5wdXR9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmxhYmVsKHtmb3I6IFwiaW5wdXRFbWFpbDNcIiwgY2xhc3NOYW1lOiBcImNvbnRyb2wtbGFiZWxcIn0sIFwiRW1haWxcIiksIFxuICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiY29udGFpbmVyXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoe3R5cGU6IFwiZW1haWxcIiwgY2xhc3NOYW1lOiBcImZvcm0tY29udHJvbFwiLCBpZDogXCJpbnB1dEVtYWlsM1wiLCBwbGFjZWhvbGRlcjogXCJFbWFpbFwiLCBvbktleVByZXNzOiB0aGlzLmhhbmRsZUlucHV0fSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtjbGFzc05hbWU6IFwiZm9ybS1ncm91cFwifSwgXG4gICAgICAgICAgICAgIFJlYWN0LkRPTS5sYWJlbCh7Zm9yOiBcImlucHV0UGFzc3dvcmQzXCIsIGNsYXNzTmFtZTogXCJjb250cm9sLWxhYmVsXCJ9LCBcIlBhc3N3b3JkXCIpLCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbnRhaW5lclwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KHt0eXBlOiBcInBhc3N3b3JkXCIsIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgaWQ6IFwiaW5wdXRQYXNzd29yZDNcIiwgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIiwgb25LZXlQcmVzczogdGhpcy5oYW5kbGVJbnB1dH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICksIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJmb3JtLWdyb3VwXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImNvbnRyb2wtYnV0dG9uXCJ9LCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKHt0eXBlOiBcInN1Ym1pdFwiLCBjbGFzc05hbWU6IFwiYnRuIGJ0bi1kZWZhdWx0XCIsIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2t9LCBcIlNpZ24gdXBcIilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKVxuXG4gICAgICApXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU0lHTlVQO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgQXBwU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvQXBwU3RvcmUnKTtcbnZhciBBcHBBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9BcHBBY3Rpb25zJyk7XG52YXIgSVRFTSA9IHJlcXVpcmUoJy4vSXRlbS5qc3gnKTtcblxuXG52YXIgVE9ETyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1RPRE8nLFxuXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciB0YXNrID0gdGhpcy5yZWZzLnRvZG8uZ2V0RE9NTm9kZSgpLnZhbHVlLnRyaW0oKTtcbiAgICBpZiAodGFzayAhPSAnJykge1xuICAgICAgQXBwQWN0aW9ucy5hZGRJdGVtQWN0aW9uKHRhc2spO1xuICAgIH1cbiAgICB0aGlzLnJlZnMudG9kby5nZXRET01Ob2RlKCkudmFsdWUgPSAnJztcbiAgfSxcblxuICBoYW5kbGVJbnB1dDogZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLm5hdGl2ZUV2ZW50LmNoYXJDb2RlID09PSAxMykge1xuICAgICAgdGhpcy5oYW5kbGVDbGljaygpO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGl0ZW1zID0gdGhpcy5wcm9wcy5hbGxUb2Rvcy5tYXAoZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgcmV0dXJuIElURU0oe2l0ZW06IGl0ZW0sIGtleTogaX0pXG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIFJlYWN0LkRPTS5kaXYoe2NsYXNzTmFtZTogXCJjb250YWluZXJcIn0sIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgUmVhY3QuRE9NLmgxKG51bGwsIFwiV2VsY29tZSBUbyBUaGUgUmVhY3QtRmx1eC1GdWxsc3RhY2sgU2x1c2ggR2VuZXJhdG9yXCIpKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLmRpdih7Y2xhc3NOYW1lOiBcImlucHV0LWdyb3VwXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCh7dHlwZTogXCJ0ZXh0XCIsIGNsYXNzTmFtZTogXCJmb3JtLWNvbnRyb2xcIiwgb25LZXlQcmVzczogdGhpcy5oYW5kbGVJbnB1dCwgcGxhY2Vob2xkZXI6IFwiTmV3IGl0ZW0uLi5cIiwgcmVmOiBcInRvZG9cIn0pLCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKHtjbGFzc05hbWU6IFwiaW5wdXQtZ3JvdXAtYnRuXCJ9LCBcbiAgICAgICAgICAgICAgUmVhY3QuRE9NLmJ1dHRvbih7Y2xhc3NOYW1lOiBcImJ0biBidG4tcHJpbWFyeVwiLCB0eXBlOiBcImJ1dHRvblwiLCBvbkNsaWNrOiB0aGlzLmhhbmRsZUNsaWNrfSwgXCJBZGRcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICksIFxuICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgUmVhY3QuRE9NLmgzKG51bGwsIFwiRmVhdHVyZXM6XCIpKSwgXG4gICAgICAgICAgUmVhY3QuRE9NLnVsKHtjbGFzc05hbWU6IFwibGlzdC1ncm91cFwifSwgXG4gICAgICAgICAgICBpdGVtc1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSAgICAgXG4gICAgKTtcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUT0RPOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleU1pcnJvciA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9rZXlNaXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3Ioe1xuICBQT1BVTEFURTogbnVsbCxcbiAgQUREOiBudWxsLFxuICBSRU1PVkU6IG51bGxcbn0pO1xuIiwiLypSZWFkTWU6XG4gIERpc3BhdGNoZXJzIG9wZXJhdGVzIGFzIHRoZSBjZW50cmFsIGh1YiBvZiBkYXRhIGZsb3cgaW4gYSBGbHV4IGFwcGxpY2F0aW9uLlxuICBUaGV5IG9yZ2FuaXplIGV2ZW50cyBpbnRvIGEgc2luZ2xlIGZsb3cgYW5kIGVuc3VyZSBkZXBlbmRlbmNpZXMgYXJlIHRha2VuIGNhcmVcbiAgb2YgYXQgdGhlIHJpZ2h0IHRpbWUgYmVmb3JlIGV2ZW50cyBjb250aW51ZSB0byBwcm9jZXNzLiAgRGlzcGF0Y2hlcnMgYWN0IGFzIGFcbiAgYnJpZGdlIGZ1bmN0aW9uIGJldHdlZW4gdXNlciBldmVudHMvIHdlYiBBUElzIGFuZCB0aGUgc3RvcmVzIHNvIHRoYXQgdGhlIGNvcnJlY3QgXG4gIGNoYW5nZXMgY2FuIGJlIG1hZGUuXG4qL1xuJ3VzZSBzdHJpY3QnO1xudmFyIERpc3BhdGNoZXIgPSByZXF1aXJlKCdmbHV4JykuRGlzcGF0Y2hlcjtcbnZhciBjb3B5UHJvcGVydGllcyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9jb3B5UHJvcGVydGllcycpO1xudmFyIEFwcERpc3BhdGNoZXIgPSBjb3B5UHJvcGVydGllcyhuZXcgRGlzcGF0Y2hlcigpLCB7XG5cbiAgLyoqXG4gICAqIEEgYnJpZGdlIGZ1bmN0aW9uIGJldHdlZW4gdGhlIHZpZXdzIGFuZCB0aGUgZGlzcGF0Y2hlciwgbWFya2luZyB0aGUgYWN0aW9uXG4gICAqIGFzIGEgdmlldyBhY3Rpb24uICBBbm90aGVyIHZhcmlhbnQgaGVyZSBjb3VsZCBiZSBoYW5kbGVTZXJ2ZXJBY3Rpb24uXG4gICAqIEBwYXJhbSAge29iamVjdH0gYWN0aW9uIFRoZSBkYXRhIGNvbWluZyBmcm9tIHRoZSB2aWV3LlxuICAgKi9cbiAgaGFuZGxlVmlld0FjdGlvbjogZnVuY3Rpb24oYWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2goe1xuICAgICAgc291cmNlOiAnVklFV19BQ1RJT04nLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9KTtcbiAgfVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcHBEaXNwYXRjaGVyO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovLypqc2hpbnQgbm9kZTp0cnVlKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJyk7XG52YXIgUm91dGUgPSBSb3V0ZXIuUm91dGU7XG52YXIgUm91dGVIYW5kbGVyID0gUm91dGVyLlJvdXRlSGFuZGxlcjtcbnZhciBSb3V0ZXMgPSBSb3V0ZXIuUm91dGVzO1xudmFyIE5vdEZvdW5kUm91dGUgPSBSb3V0ZXIuTm90Rm91bmRSb3V0ZTtcbnZhciBEZWZhdWx0Um91dGUgPSBSb3V0ZXIuRGVmYXVsdFJvdXRlO1xudmFyIExpbmsgPSBSb3V0ZXIuTGluaztcblxudmFyIExPR0lOID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0xvZ2luLmpzeCcpO1xudmFyIEhPTUUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvSG9tZS5qc3gnKTtcbnZhciBTSUdOVVAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvU2lnbnVwLmpzeCcpO1xudmFyIE5BViA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9OYXZCYXIuanN4Jyk7XG52YXIgQkFOTkVSID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0Jhbm5lci5qc3gnKTtcbnZhciBGT09URVIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvRm9vdGVyLmpzeCcpO1xuXG5cbnZhciBBUFAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdBUFAnLFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgIE5BVihudWxsKSwgXG4gICAgICAgIEJBTk5FUihudWxsKSwgXG4gICAgICAgIFJvdXRlSGFuZGxlcihudWxsKSwgXG4gICAgICAgIEZPT1RFUihudWxsKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICBSb3V0ZSh7aGFuZGxlcjogQVBQfSwgXG4gICAgUm91dGUoe25hbWU6IFwiaG9tZVwiLCBwYXRoOiBcIi9cIiwgaGFuZGxlcjogSE9NRX0pLCBcbiAgICBSb3V0ZSh7bmFtZTogXCJsb2dpblwiLCBwYXRoOiBcIi9sb2dpblwiLCBoYW5kbGVyOiBMT0dJTn0pLCBcbiAgICBSb3V0ZSh7bmFtZTogXCJzaWdudXBcIiwgcGF0aDogXCIvc2lnbnVwXCIsIGhhbmRsZXI6IFNJR05VUH0pLCBcbiAgICBEZWZhdWx0Um91dGUoe2hhbmRsZXI6IEFQUH0pXG4gIClcbik7XG5cblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXM7IiwiLypSZWFkTWU6XG4gIFN0b3JlcyBtYW5hZ2UgZGF0YSBhbmQgYnVzaW5lc3MgbG9naWMgaW4gYSBGbHV4IGFwcGxpY2F0aW9uLlxuICBFYWNoIHN0b3JlIGlzIHJlc3BvbnNpYmxlIGZvciBhIGRvbWFpbiBvZiB0aGUgYXBwbGljYXRvaW4sIFxuICBhbmQgdGhleSB1cGRhdGUgdGhlbXNlbHZlcyBpbiByZXNwb25zZSB0byBhY3Rpb25zLiAgV2hlbiB0aGV5XG4gIHVwZGF0ZSwgdGhleSBlbWl0IGFuIGV2ZW50IHRoYXQgc2lnbmFscyB0aGF0IHRoZWlyIGRhdGEgaGFzIGNoYW5nZWQsIFxuICBhbGxvd2luZyB0aGUgdmlld3MgdG8gZmV0Y2ggdGhlIG5ldyBkYXRhIGFuZCB1cGRhdGUgYWNjb3JkaW5nbHkuIFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXBwRGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2Rpc3BhdGNoZXJzL0FwcERpc3BhdGNoZXInKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgQXBwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzL0FwcENvbnN0YW50cycpO1xudmFyIG1lcmdlID0gcmVxdWlyZSgncmVhY3QvbGliL21lcmdlJyk7XG52YXIgUSA9IHJlcXVpcmUoJ3EnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5LWJyb3dzZXJpZnknKTtcblxudmFyIENIQU5HRV9FVkVOVCA9ICdjaGFuZ2UnO1xuXG52YXIgX2RhdGEgPSB7XG4gIHRvZG9zOiBbXVxufTtcblxuLy8ge2l0ZW06J1JlYWN0JywgaWQ6IDB9LFxuLy8gICAgIHtpdGVtOidGbHV4JywgaWQ6IDF9LFxuLy8gICAgIHtpdGVtOidHdWxwJywgaWQ6IDJ9LFxuLy8gICAgIHtpdGVtOidFeHByZXNzIFNlcnZlcicsIGlkOiAzfSxcbi8vICAgICB7aXRlbTogJ01vbmdvIERhdGFiYXNlJywgaWQ6IDR9XG52YXIgc3RhdGljUHJvbWlzZSA9IGZ1bmN0aW9uKHBhcmFtcyl7XG4gIHZhciBvdXRwdXQgPSBRLmRlZmVyKCk7XG4gIFEucmVzb2x2ZShwYXJhbXMpO1xuICByZXR1cm4gUS5wcm9taXNlO1xufVxuXG52YXIgaHR0cEdldCA9IGZ1bmN0aW9uKHVybCl7XG4gIHZhciBvdXRwdXQgPSBRLmRlZmVyKCk7XG4gICQuYWpheCh7XG4gICAgdHlwZTogJ0dFVCcsXG4gICAgdXJsOiB1cmxcbiAgfSkuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0uaWQgPSBpO1xuICAgIH07XG4gICAgX2RhdGEudG9kb3MgPSBkYXRhO1xuICAgIG91dHB1dC5yZXNvbHZlKGRhdGEpO1xuICB9KS5lcnJvcihmdW5jdGlvbihlcnJvcil7XG4gICAgb3V0cHV0LnJlamVjdChlcnJvcik7XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0LnByb21pc2U7XG59XG52YXIgQXBwU3RvcmUgPSBtZXJnZShFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG5cbiAgZ2V0SW5pdGlhbERhdGE6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIF9kYXRhO1xuICB9LFxuXG4gIGdldERhdGE6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGh0dHBHZXQoJy9hcGkvdGhpbmdzJyk7XG4gIH0sXG5cblxuICBlbWl0Q2hhbmdlOiBmdW5jdGlvbigpe1xuICAgIHRoaXMuZW1pdChDSEFOR0VfRVZFTlQpO1xuICB9LFxuXG4gIGFkZENoYW5nZUxpc3RlbmVyOiBmdW5jdGlvbihjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOR0VfRVZFTlQsIGNhbGxiYWNrKTtcbiAgfSxcblxuICByZW1vdmVDaGFuZ2VMaXN0ZW5lcjogZnVuY3Rpb24oY2FsbGJhY2spe1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoQ0hBTkdFX0VWRU5ULCBjYWxsYmFjayk7XG4gIH1cbn0pO1xuXG5BcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKGZ1bmN0aW9uKHBheWxvYWQpe1xuICB2YXIgYWN0aW9uID0gcGF5bG9hZC5hY3Rpb247XG5cbiAgaWYoYWN0aW9uLmFjdGlvblR5cGUgPT09IEFwcENvbnN0YW50cy5QT1BVTEFURSkge1xuICAgIHJldHVybiBBcHBTdG9yZS5nZXREYXRhKCk7XG4gIH1cblxuICBpZihhY3Rpb24uYWN0aW9uVHlwZSA9PT0gQXBwQ29uc3RhbnRzLkFERCl7XG5cbiAgICAvL0ZpbmQgb3V0IGhvdyBtYW55IGVsZW1lbnRzIGFyZSBpbiB0aGUgdG9kby5cbiAgICAvL01ha2UgbmV3IHRvZG8gLSBpZCA9IGhpZ2hlc3QgaWQgKzEsIG1lc3NhZ2UgPSBuYW1lXG4gICAgLy9TdWJtaXQgUG9zdCBSZXFcbiAgICAvL09uIFN1Y2Nlc3MsIGdldERhdGE/XG4gICAgdmFyIGlkO1xuICAgIGlmIChfZGF0YS50b2Rvcy5sZW5ndGggPiAwKSB7XG4gICAgICBpZCA9IF9kYXRhLnRvZG9zW19kYXRhLnRvZG9zLmxlbmd0aC0xXS5pZCArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gMDtcbiAgICB9XG4gICAgdmFyIHRlbXAgPSB7aXRlbTogYWN0aW9uLnRleHQsIGlkOiBpZH07XG4gICAgX2RhdGEudG9kb3MucHVzaCh0ZW1wKTtcbiAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHRlbXApLFxuICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIHVybDogJy9hcGkvdGhpbmdzLycsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkYiByZWNvbmNpbGVkIHdpdGggbWVtb3J5LiBhZGRlZDonLCBpdGVtKTtcbiAgICAgICAgQXBwU3RvcmUuZ2V0RGF0YSgpO1xuICAgICAgfSxcbiAgICAgIGZhaWx1cmU6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RiIGZhaWxlZCB0byByZWNvbmNpbGVkIHdpdGggbWVtb3J5LicpO1xuICAgICAgICBBcHBTdG9yZS5nZXREYXRhKCk7XG4gICAgICAgIC8vTWF5YmUgYWRkIHNvbWUgVmlzdWFsIFRvIGltcHJvdmUgdXNlciBleHBlcmllbmNlIGUuZy4gYSBzb3JyeSBtZXNzYWdlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG5cbiAgaWYoYWN0aW9uLmFjdGlvblR5cGUgPT09IEFwcENvbnN0YW50cy5SRU1PVkUpe1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbilcbiAgICBjb25zb2xlLmxvZyhfZGF0YS50b2RvcylcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX2RhdGEudG9kb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnNvbGUubG9nKGFjdGlvbi5pZCk7XG4gICAgICBpZiAoX2RhdGEudG9kb3NbaV0uaWQgPT09IGFjdGlvbi5pZCkge1xuICAgICAgICB2YXIgdGVtcCA9IF9kYXRhLnRvZG9zLnNwbGljZShpLCAxKTtcbiAgICAgICAgQXBwU3RvcmUuZW1pdENoYW5nZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wWzBdWydfaWQnXSlcbiAgICAgICAgLy9BSkFYIEdFVCBwYXNzaW5nIGluIG5cbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgdXJsOiAnL2FwaS90aGluZ3MvJyArIHRlbXBbMF1bJ19pZCddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0ZW0gcmVtb3ZlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXG4gICAgICAgICAgICBBcHBTdG9yZS5lbWl0Q2hhbmdlKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsdXJlOiBmdW5jdGlvbihmYWlsdXJlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVtIHJlbW92ZSBmYWlsZWQnLCBmYWlsdXJlKTtcbiAgICAgICAgICAgIEFwcFN0b3JlLmdldERhdGEoKTtcbiAgICAgICAgICAgIEFwcFN0b3JlLmVtaXRDaGFuZ2UoKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQXBwU3RvcmUuZW1pdENoYW5nZSgpO1xuXG59KTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gQXBwU3RvcmU7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBSZXNwb25kZXJFdmVudFBsdWdpblxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRXZlbnRDb25zdGFudHMgPSByZXF1aXJlKCdyZWFjdC9saWIvRXZlbnRDb25zdGFudHMnKTtcbnZhciBFdmVudFBsdWdpblV0aWxzID0gcmVxdWlyZSgncmVhY3QvbGliL0V2ZW50UGx1Z2luVXRpbHMnKTtcbnZhciBFdmVudFByb3BhZ2F0b3JzID0gcmVxdWlyZSgncmVhY3QvbGliL0V2ZW50UHJvcGFnYXRvcnMnKTtcbnZhciBTeW50aGV0aWNFdmVudCA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9TeW50aGV0aWNFdmVudCcpO1xuXG52YXIgYWNjdW11bGF0ZUludG8gPSByZXF1aXJlKCdyZWFjdC9saWIvYWNjdW11bGF0ZUludG8nKTtcbnZhciBrZXlPZiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9rZXlPZicpO1xuXG52YXIgaXNTdGFydGlzaCA9IEV2ZW50UGx1Z2luVXRpbHMuaXNTdGFydGlzaDtcbnZhciBpc01vdmVpc2ggPSBFdmVudFBsdWdpblV0aWxzLmlzTW92ZWlzaDtcbnZhciBpc0VuZGlzaCA9IEV2ZW50UGx1Z2luVXRpbHMuaXNFbmRpc2g7XG52YXIgZXhlY3V0ZURpcmVjdERpc3BhdGNoID0gRXZlbnRQbHVnaW5VdGlscy5leGVjdXRlRGlyZWN0RGlzcGF0Y2g7XG52YXIgaGFzRGlzcGF0Y2hlcyA9IEV2ZW50UGx1Z2luVXRpbHMuaGFzRGlzcGF0Y2hlcztcbnZhciBleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlID1cbiAgRXZlbnRQbHVnaW5VdGlscy5leGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlO1xuXG4vKipcbiAqIElEIG9mIGVsZW1lbnQgdGhhdCBzaG91bGQgcmVzcG9uZCB0byB0b3VjaC9tb3ZlIHR5cGVzIG9mIGludGVyYWN0aW9ucywgYXNcbiAqIGluZGljYXRlZCBleHBsaWNpdGx5IGJ5IHJlbGV2YW50IGNhbGxiYWNrcy5cbiAqL1xudmFyIHJlc3BvbmRlcklEID0gbnVsbDtcbnZhciBpc1ByZXNzaW5nID0gZmFsc2U7XG5cbnZhciBldmVudFR5cGVzID0ge1xuICAvKipcbiAgICogT24gYSBgdG91Y2hTdGFydGAvYG1vdXNlRG93bmAsIGlzIGl0IGRlc2lyZWQgdGhhdCB0aGlzIGVsZW1lbnQgYmVjb21lIHRoZVxuICAgKiByZXNwb25kZXI/XG4gICAqL1xuICBzdGFydFNob3VsZFNldFJlc3BvbmRlcjoge1xuICAgIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzOiB7XG4gICAgICBidWJibGVkOiBrZXlPZih7b25TdGFydFNob3VsZFNldFJlc3BvbmRlcjogbnVsbH0pLFxuICAgICAgY2FwdHVyZWQ6IGtleU9mKHtvblN0YXJ0U2hvdWxkU2V0UmVzcG9uZGVyQ2FwdHVyZTogbnVsbH0pXG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBPbiBhIGBzY3JvbGxgLCBpcyBpdCBkZXNpcmVkIHRoYXQgdGhpcyBlbGVtZW50IGJlY29tZSB0aGUgcmVzcG9uZGVyPyBUaGlzXG4gICAqIGlzIHVzdWFsbHkgbm90IG5lZWRlZCwgYnV0IHNob3VsZCBiZSB1c2VkIHRvIHJldHJvYWN0aXZlbHkgaW5mZXIgdGhhdCBhXG4gICAqIGB0b3VjaFN0YXJ0YCBoYWQgb2NjdXJlZCBkdXJpbmcgbW9tZW50dW0gc2Nyb2xsLiBEdXJpbmcgYSBtb21lbnR1bSBzY3JvbGwsXG4gICAqIGEgdG91Y2ggc3RhcnQgd2lsbCBiZSBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBhIHNjcm9sbCBldmVudCBpZiB0aGUgdmlldyBpc1xuICAgKiBjdXJyZW50bHkgc2Nyb2xsaW5nLlxuICAgKi9cbiAgc2Nyb2xsU2hvdWxkU2V0UmVzcG9uZGVyOiB7XG4gICAgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXM6IHtcbiAgICAgIGJ1YmJsZWQ6IGtleU9mKHtvblNjcm9sbFNob3VsZFNldFJlc3BvbmRlcjogbnVsbH0pLFxuICAgICAgY2FwdHVyZWQ6IGtleU9mKHtvblNjcm9sbFNob3VsZFNldFJlc3BvbmRlckNhcHR1cmU6IG51bGx9KVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogT24gYSBgdG91Y2hNb3ZlYC9gbW91c2VNb3ZlYCwgaXMgaXQgZGVzaXJlZCB0aGF0IHRoaXMgZWxlbWVudCBiZWNvbWUgdGhlXG4gICAqIHJlc3BvbmRlcj9cbiAgICovXG4gIG1vdmVTaG91bGRTZXRSZXNwb25kZXI6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDoga2V5T2Yoe29uTW92ZVNob3VsZFNldFJlc3BvbmRlcjogbnVsbH0pLFxuICAgICAgY2FwdHVyZWQ6IGtleU9mKHtvbk1vdmVTaG91bGRTZXRSZXNwb25kZXJDYXB0dXJlOiBudWxsfSlcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIERpcmVjdCByZXNwb25kZXIgZXZlbnRzIGRpc3BhdGNoZWQgZGlyZWN0bHkgdG8gcmVzcG9uZGVyLiBEbyBub3QgYnViYmxlLlxuICAgKi9cbiAgcmVzcG9uZGVyTW92ZToge3JlZ2lzdHJhdGlvbk5hbWU6IGtleU9mKHtvblJlc3BvbmRlck1vdmU6IG51bGx9KX0sXG4gIHJlc3BvbmRlclJlbGVhc2U6IHtyZWdpc3RyYXRpb25OYW1lOiBrZXlPZih7b25SZXNwb25kZXJSZWxlYXNlOiBudWxsfSl9LFxuICByZXNwb25kZXJUZXJtaW5hdGlvblJlcXVlc3Q6IHtcbiAgICByZWdpc3RyYXRpb25OYW1lOiBrZXlPZih7b25SZXNwb25kZXJUZXJtaW5hdGlvblJlcXVlc3Q6IG51bGx9KVxuICB9LFxuICByZXNwb25kZXJHcmFudDoge3JlZ2lzdHJhdGlvbk5hbWU6IGtleU9mKHtvblJlc3BvbmRlckdyYW50OiBudWxsfSl9LFxuICByZXNwb25kZXJSZWplY3Q6IHtyZWdpc3RyYXRpb25OYW1lOiBrZXlPZih7b25SZXNwb25kZXJSZWplY3Q6IG51bGx9KX0sXG4gIHJlc3BvbmRlclRlcm1pbmF0ZToge3JlZ2lzdHJhdGlvbk5hbWU6IGtleU9mKHtvblJlc3BvbmRlclRlcm1pbmF0ZTogbnVsbH0pfVxufTtcblxuLyoqXG4gKiBQZXJmb3JtcyBuZWdvdGlhdGlvbiBiZXR3ZWVuIGFueSBleGlzdGluZy9jdXJyZW50IHJlc3BvbmRlciwgY2hlY2tzIHRvIHNlZSBpZlxuICogYW55IG5ldyBlbnRpdHkgaXMgaW50ZXJlc3RlZCBpbiBiZWNvbWluZyByZXNwb25kZXIsIHBlcmZvcm1zIHRoYXQgaGFuZHNoYWtlXG4gKiBhbmQgcmV0dXJucyBhbnkgZXZlbnRzIHRoYXQgbXVzdCBiZSBlbWl0dGVkIHRvIG5vdGlmeSB0aGUgcmVsZXZhbnQgcGFydGllcy5cbiAqXG4gKiBBIG5vdGUgYWJvdXQgZXZlbnQgb3JkZXJpbmcgaW4gdGhlIGBFdmVudFBsdWdpbkh1YmAuXG4gKlxuICogU3VwcG9zZSBwbHVnaW5zIGFyZSBpbmplY3RlZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxuICpcbiAqIGBbUiwgUywgQ11gXG4gKlxuICogVG8gaGVscCBpbGx1c3RyYXRlIHRoZSBleGFtcGxlLCBhc3N1bWUgYFNgIGlzIGBTaW1wbGVFdmVudFBsdWdpbmAgKGZvclxuICogYG9uQ2xpY2tgIGV0YykgYW5kIGBSYCBpcyBgUmVzcG9uZGVyRXZlbnRQbHVnaW5gLlxuICpcbiAqIFwiRGVmZXJyZWQtRGlzcGF0Y2hlZCBFdmVudHNcIjpcbiAqXG4gKiAtIFRoZSBjdXJyZW50IGV2ZW50IHBsdWdpbiBzeXN0ZW0gd2lsbCB0cmF2ZXJzZSB0aGUgbGlzdCBvZiBpbmplY3RlZCBwbHVnaW5zLFxuICogICBpbiBvcmRlciwgYW5kIGV4dHJhY3QgZXZlbnRzIGJ5IGNvbGxlY3RpbmcgdGhlIHBsdWdpbidzIHJldHVybiB2YWx1ZSBvZlxuICogICBgZXh0cmFjdEV2ZW50cygpYC5cbiAqIC0gVGhlc2UgZXZlbnRzIHRoYXQgYXJlIHJldHVybmVkIGZyb20gYGV4dHJhY3RFdmVudHNgIGFyZSBcImRlZmVycmVkXG4gKiAgIGRpc3BhdGNoZWQgZXZlbnRzXCIuXG4gKiAtIFdoZW4gcmV0dXJuZWQgZnJvbSBgZXh0cmFjdEV2ZW50c2AsIGRlZmVycmVkLWRpc3BhdGNoZWQgZXZlbnRzIGNvbnRhaW4gYW5cbiAqICAgXCJhY2N1bXVsYXRpb25cIiBvZiBkZWZlcnJlZCBkaXNwYXRjaGVzLlxuICogLSBUaGVzZSBkZWZlcnJlZCBkaXNwYXRjaGVzIGFyZSBhY2N1bXVsYXRlZC9jb2xsZWN0ZWQgYmVmb3JlIHRoZXkgYXJlXG4gKiAgIHJldHVybmVkLCBidXQgcHJvY2Vzc2VkIGF0IGEgbGF0ZXIgdGltZSBieSB0aGUgYEV2ZW50UGx1Z2luSHViYCAoaGVuY2UgdGhlXG4gKiAgIG5hbWUgZGVmZXJyZWQpLlxuICpcbiAqIEluIHRoZSBwcm9jZXNzIG9mIHJldHVybmluZyB0aGVpciBkZWZlcnJlZC1kaXNwYXRjaGVkIGV2ZW50cywgZXZlbnQgcGx1Z2luc1xuICogdGhlbXNlbHZlcyBjYW4gZGlzcGF0Y2ggZXZlbnRzIG9uLWRlbWFuZCB3aXRob3V0IHJldHVybmluZyB0aGVtIGZyb21cbiAqIGBleHRyYWN0RXZlbnRzYC4gUGx1Z2lucyBtaWdodCB3YW50IHRvIGRvIHRoaXMsIHNvIHRoYXQgdGhleSBjYW4gdXNlIGV2ZW50XG4gKiBkaXNwYXRjaGluZyBhcyBhIHRvb2wgdGhhdCBoZWxwcyB0aGVtIGRlY2lkZSB3aGljaCBldmVudHMgc2hvdWxkIGJlIGV4dHJhY3RlZFxuICogaW4gdGhlIGZpcnN0IHBsYWNlLlxuICpcbiAqIFwiT24tRGVtYW5kLURpc3BhdGNoZWQgRXZlbnRzXCI6XG4gKlxuICogLSBPbi1kZW1hbmQtZGlzcGF0Y2hlZCBldmVudHMgYXJlIG5vdCByZXR1cm5lZCBmcm9tIGBleHRyYWN0RXZlbnRzYC5cbiAqIC0gT24tZGVtYW5kLWRpc3BhdGNoZWQgZXZlbnRzIGFyZSBkaXNwYXRjaGVkIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXR1cm5pbmdcbiAqICAgdGhlIGRlZmVycmVkLWRpc3BhdGNoZWQgZXZlbnRzLlxuICogLSBUaGV5IHNob3VsZCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gKiAtIFRoZXkgc2hvdWxkIGJlIGF2b2lkZWQsIGFuZC9vciBldmVudHVhbGx5IGJlIHJlcGxhY2VkIHdpdGggYW5vdGhlclxuICogICBhYnN0cmFjdGlvbiB0aGF0IGFsbG93cyBldmVudCBwbHVnaW5zIHRvIHBlcmZvcm0gbXVsdGlwbGUgXCJyb3VuZHNcIiBvZiBldmVudFxuICogICBleHRyYWN0aW9uLlxuICpcbiAqIFRoZXJlZm9yZSwgdGhlIHNlcXVlbmNlIG9mIGV2ZW50IGRpc3BhdGNoZXMgYmVjb21lczpcbiAqXG4gKiAtIGBSYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBSYCBvbi1kZW1hbmQpXG4gKiAtIGBTYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBTYCBvbi1kZW1hbmQpXG4gKiAtIGBDYHMgb24tZGVtYW5kIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBDYCBvbi1kZW1hbmQpXG4gKiAtIGBSYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKiAtIGBTYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKiAtIGBDYHMgZXh0cmFjdGVkIGV2ZW50cyAoaWYgYW55KSAgIChkaXNwYXRjaGVkIGJ5IGBFdmVudFBsdWdpbkh1YmApXG4gKlxuICogSW4gdGhlIGNhc2Ugb2YgYFJlc3BvbmRlckV2ZW50UGx1Z2luYDogSWYgdGhlIGBzdGFydFNob3VsZFNldFJlc3BvbmRlcmBcbiAqIG9uLWRlbWFuZCBkaXNwYXRjaCByZXR1cm5zIGB0cnVlYCAoYW5kIHNvbWUgb3RoZXIgZGV0YWlscyBhcmUgc2F0aXNmaWVkKSB0aGVcbiAqIGBvblJlc3BvbmRlckdyYW50YCBkZWZlcnJlZCBkaXNwYXRjaGVkIGV2ZW50IGlzIHJldHVybmVkIGZyb21cbiAqIGBleHRyYWN0RXZlbnRzYC4gVGhlIHNlcXVlbmNlIG9mIGRpc3BhdGNoIGV4ZWN1dGlvbnMgaW4gdGhpcyBjYXNlXG4gKiB3aWxsIGFwcGVhciBhcyBmb2xsb3dzOlxuICpcbiAqIC0gYHN0YXJ0U2hvdWxkU2V0UmVzcG9uZGVyYCAoYFJlc3BvbmRlckV2ZW50UGx1Z2luYCBkaXNwYXRjaGVzIG9uLWRlbWFuZClcbiAqIC0gYHRvdWNoU3RhcnRDYXB0dXJlYCAgICAgICAoYEV2ZW50UGx1Z2luSHViYCBkaXNwYXRjaGVzIGFzIHVzdWFsKVxuICogLSBgdG91Y2hTdGFydGAgICAgICAgICAgICAgIChgRXZlbnRQbHVnaW5IdWJgIGRpc3BhdGNoZXMgYXMgdXN1YWwpXG4gKiAtIGByZXNwb25kZXJHcmFudC9SZWplY3RgICAgKGBFdmVudFBsdWdpbkh1YmAgZGlzcGF0Y2hlcyBhcyB1c3VhbClcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9wTGV2ZWxUeXBlIFJlY29yZCBmcm9tIGBFdmVudENvbnN0YW50c2AuXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9wTGV2ZWxUYXJnZXRJRCBJRCBvZiBkZWVwZXN0IFJlYWN0IHJlbmRlcmVkIGVsZW1lbnQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKiBAcmV0dXJuIHsqfSBBbiBhY2N1bXVsYXRpb24gb2Ygc3ludGhldGljIGV2ZW50cy5cbiAqL1xuZnVuY3Rpb24gc2V0UmVzcG9uZGVyQW5kRXh0cmFjdFRyYW5zZmVyKFxuICAgIHRvcExldmVsVHlwZSxcbiAgICB0b3BMZXZlbFRhcmdldElELFxuICAgIG5hdGl2ZUV2ZW50KSB7XG4gIHZhciBzaG91bGRTZXRFdmVudFR5cGUgPVxuICAgIGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSA/IGV2ZW50VHlwZXMuc3RhcnRTaG91bGRTZXRSZXNwb25kZXIgOlxuICAgIGlzTW92ZWlzaCh0b3BMZXZlbFR5cGUpID8gZXZlbnRUeXBlcy5tb3ZlU2hvdWxkU2V0UmVzcG9uZGVyIDpcbiAgICBldmVudFR5cGVzLnNjcm9sbFNob3VsZFNldFJlc3BvbmRlcjtcblxuICB2YXIgYnViYmxlU2hvdWxkU2V0RnJvbSA9IHJlc3BvbmRlcklEIHx8IHRvcExldmVsVGFyZ2V0SUQ7XG4gIHZhciBzaG91bGRTZXRFdmVudCA9IFN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZChcbiAgICBzaG91bGRTZXRFdmVudFR5cGUsXG4gICAgYnViYmxlU2hvdWxkU2V0RnJvbSxcbiAgICBuYXRpdmVFdmVudFxuICApO1xuICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVUd29QaGFzZURpc3BhdGNoZXMoc2hvdWxkU2V0RXZlbnQpO1xuICB2YXIgd2FudHNSZXNwb25kZXJJRCA9IGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlclN0b3BBdFRydWUoc2hvdWxkU2V0RXZlbnQpO1xuICBpZiAoIXNob3VsZFNldEV2ZW50LmlzUGVyc2lzdGVudCgpKSB7XG4gICAgc2hvdWxkU2V0RXZlbnQuY29uc3RydWN0b3IucmVsZWFzZShzaG91bGRTZXRFdmVudCk7XG4gIH1cblxuICBpZiAoIXdhbnRzUmVzcG9uZGVySUQgfHwgd2FudHNSZXNwb25kZXJJRCA9PT0gcmVzcG9uZGVySUQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgZXh0cmFjdGVkO1xuICB2YXIgZ3JhbnRFdmVudCA9IFN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZChcbiAgICBldmVudFR5cGVzLnJlc3BvbmRlckdyYW50LFxuICAgIHdhbnRzUmVzcG9uZGVySUQsXG4gICAgbmF0aXZlRXZlbnRcbiAgKTtcblxuICBFdmVudFByb3BhZ2F0b3JzLmFjY3VtdWxhdGVEaXJlY3REaXNwYXRjaGVzKGdyYW50RXZlbnQpO1xuICBpZiAocmVzcG9uZGVySUQpIHtcbiAgICB2YXIgdGVybWluYXRpb25SZXF1ZXN0RXZlbnQgPSBTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoXG4gICAgICBldmVudFR5cGVzLnJlc3BvbmRlclRlcm1pbmF0aW9uUmVxdWVzdCxcbiAgICAgIHJlc3BvbmRlcklELFxuICAgICAgbmF0aXZlRXZlbnRcbiAgICApO1xuICAgIEV2ZW50UHJvcGFnYXRvcnMuYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXModGVybWluYXRpb25SZXF1ZXN0RXZlbnQpO1xuICAgIHZhciBzaG91bGRTd2l0Y2ggPSAhaGFzRGlzcGF0Y2hlcyh0ZXJtaW5hdGlvblJlcXVlc3RFdmVudCkgfHxcbiAgICAgIGV4ZWN1dGVEaXJlY3REaXNwYXRjaCh0ZXJtaW5hdGlvblJlcXVlc3RFdmVudCk7XG4gICAgaWYgKCF0ZXJtaW5hdGlvblJlcXVlc3RFdmVudC5pc1BlcnNpc3RlbnQoKSkge1xuICAgICAgdGVybWluYXRpb25SZXF1ZXN0RXZlbnQuY29uc3RydWN0b3IucmVsZWFzZSh0ZXJtaW5hdGlvblJlcXVlc3RFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFN3aXRjaCkge1xuICAgICAgdmFyIHRlcm1pbmF0ZVR5cGUgPSBldmVudFR5cGVzLnJlc3BvbmRlclRlcm1pbmF0ZTtcbiAgICAgIHZhciB0ZXJtaW5hdGVFdmVudCA9IFN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZChcbiAgICAgICAgdGVybWluYXRlVHlwZSxcbiAgICAgICAgcmVzcG9uZGVySUQsXG4gICAgICAgIG5hdGl2ZUV2ZW50XG4gICAgICApO1xuICAgICAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlcyh0ZXJtaW5hdGVFdmVudCk7XG4gICAgICBleHRyYWN0ZWQgPSBhY2N1bXVsYXRlSW50byhleHRyYWN0ZWQsIFtncmFudEV2ZW50LCB0ZXJtaW5hdGVFdmVudF0pO1xuICAgICAgcmVzcG9uZGVySUQgPSB3YW50c1Jlc3BvbmRlcklEO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVqZWN0RXZlbnQgPSBTeW50aGV0aWNFdmVudC5nZXRQb29sZWQoXG4gICAgICAgIGV2ZW50VHlwZXMucmVzcG9uZGVyUmVqZWN0LFxuICAgICAgICB3YW50c1Jlc3BvbmRlcklELFxuICAgICAgICBuYXRpdmVFdmVudFxuICAgICAgKTtcbiAgICAgIEV2ZW50UHJvcGFnYXRvcnMuYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXMocmVqZWN0RXZlbnQpO1xuICAgICAgZXh0cmFjdGVkID0gYWNjdW11bGF0ZUludG8oZXh0cmFjdGVkLCByZWplY3RFdmVudCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGV4dHJhY3RlZCA9IGFjY3VtdWxhdGVJbnRvKGV4dHJhY3RlZCwgZ3JhbnRFdmVudCk7XG4gICAgcmVzcG9uZGVySUQgPSB3YW50c1Jlc3BvbmRlcklEO1xuICB9XG4gIHJldHVybiBleHRyYWN0ZWQ7XG59XG5cbi8qKlxuICogQSB0cmFuc2ZlciBpcyBhIG5lZ290aWF0aW9uIGJldHdlZW4gYSBjdXJyZW50bHkgc2V0IHJlc3BvbmRlciBhbmQgdGhlIG5leHRcbiAqIGVsZW1lbnQgdG8gY2xhaW0gcmVzcG9uZGVyIHN0YXR1cy4gQW55IHN0YXJ0IGV2ZW50IGNvdWxkIHRyaWdnZXIgYSB0cmFuc2ZlclxuICogb2YgcmVzcG9uZGVySUQuIEFueSBtb3ZlIGV2ZW50IGNvdWxkIHRyaWdnZXIgYSB0cmFuc2Zlciwgc28gbG9uZyBhcyB0aGVyZSBpc1xuICogY3VycmVudGx5IGEgcmVzcG9uZGVyIHNldCAoaW4gb3RoZXIgd29yZHMgYXMgbG9uZyBhcyB0aGUgdXNlciBpcyBwcmVzc2luZ1xuICogZG93bikuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcExldmVsVHlwZSBSZWNvcmQgZnJvbSBgRXZlbnRDb25zdGFudHNgLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBhIHRyYW5zZmVyIG9mIHJlc3BvbmRlciBjb3VsZCBwb3NzaWJseSBvY2N1ci5cbiAqL1xuZnVuY3Rpb24gY2FuVHJpZ2dlclRyYW5zZmVyKHRvcExldmVsVHlwZSkge1xuICByZXR1cm4gdG9wTGV2ZWxUeXBlID09PSBFdmVudENvbnN0YW50cy50b3BMZXZlbFR5cGVzLnRvcFNjcm9sbCB8fFxuICAgICAgICAgaXNTdGFydGlzaCh0b3BMZXZlbFR5cGUpIHx8XG4gICAgICAgICAoaXNQcmVzc2luZyAmJiBpc01vdmVpc2godG9wTGV2ZWxUeXBlKSk7XG59XG5cbi8qKlxuICogRXZlbnQgcGx1Z2luIGZvciBmb3JtYWxpemluZyB0aGUgbmVnb3RpYXRpb24gYmV0d2VlbiBjbGFpbWluZyBsb2NrcyBvblxuICogcmVjZWl2aW5nIHRvdWNoZXMuXG4gKi9cbnZhciBSZXNwb25kZXJFdmVudFBsdWdpbiA9IHtcblxuICBnZXRSZXNwb25kZXJJRDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHJlc3BvbmRlcklEO1xuICB9LFxuXG4gIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFR5cGUgUmVjb3JkIGZyb20gYEV2ZW50Q29uc3RhbnRzYC5cbiAgICogQHBhcmFtIHtET01FdmVudFRhcmdldH0gdG9wTGV2ZWxUYXJnZXQgVGhlIGxpc3RlbmluZyBjb21wb25lbnQgcm9vdCBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9wTGV2ZWxUYXJnZXRJRCBJRCBvZiBgdG9wTGV2ZWxUYXJnZXRgLlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gICAqIEByZXR1cm4geyp9IEFuIGFjY3VtdWxhdGlvbiBvZiBzeW50aGV0aWMgZXZlbnRzLlxuICAgKiBAc2VlIHtFdmVudFBsdWdpbkh1Yi5leHRyYWN0RXZlbnRzfVxuICAgKi9cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24oXG4gICAgICB0b3BMZXZlbFR5cGUsXG4gICAgICB0b3BMZXZlbFRhcmdldCxcbiAgICAgIHRvcExldmVsVGFyZ2V0SUQsXG4gICAgICBuYXRpdmVFdmVudCkge1xuICAgIHZhciBleHRyYWN0ZWQ7XG4gICAgLy8gTXVzdCBoYXZlIG1pc3NlZCBhbiBlbmQgZXZlbnQgLSByZXNldCB0aGUgc3RhdGUgaGVyZS5cbiAgICBpZiAocmVzcG9uZGVySUQgJiYgaXNTdGFydGlzaCh0b3BMZXZlbFR5cGUpKSB7XG4gICAgICByZXNwb25kZXJJRCA9IG51bGw7XG4gICAgfVxuICAgIGlmIChpc1N0YXJ0aXNoKHRvcExldmVsVHlwZSkpIHtcbiAgICAgIGlzUHJlc3NpbmcgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXNFbmRpc2godG9wTGV2ZWxUeXBlKSkge1xuICAgICAgaXNQcmVzc2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY2FuVHJpZ2dlclRyYW5zZmVyKHRvcExldmVsVHlwZSkpIHtcbiAgICAgIHZhciB0cmFuc2ZlciA9IHNldFJlc3BvbmRlckFuZEV4dHJhY3RUcmFuc2ZlcihcbiAgICAgICAgdG9wTGV2ZWxUeXBlLFxuICAgICAgICB0b3BMZXZlbFRhcmdldElELFxuICAgICAgICBuYXRpdmVFdmVudFxuICAgICAgKTtcbiAgICAgIGlmICh0cmFuc2Zlcikge1xuICAgICAgICBleHRyYWN0ZWQgPSBhY2N1bXVsYXRlSW50byhleHRyYWN0ZWQsIHRyYW5zZmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm93IHRoYXQgd2Uga25vdyB0aGUgcmVzcG9uZGVyIGlzIHNldCBjb3JyZWN0bHksIHdlIGNhbiBkaXNwYXRjaFxuICAgIC8vIHJlc3BvbmRlciB0eXBlIGV2ZW50cyAoZGlyZWN0bHkgdG8gdGhlIHJlc3BvbmRlcikuXG4gICAgdmFyIHR5cGUgPSBpc01vdmVpc2godG9wTGV2ZWxUeXBlKSA/IGV2ZW50VHlwZXMucmVzcG9uZGVyTW92ZSA6XG4gICAgICBpc0VuZGlzaCh0b3BMZXZlbFR5cGUpID8gZXZlbnRUeXBlcy5yZXNwb25kZXJSZWxlYXNlIDpcbiAgICAgIGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSA/IGV2ZW50VHlwZXMucmVzcG9uZGVyU3RhcnQgOiBudWxsO1xuICAgIGlmICh0eXBlKSB7XG4gICAgICB2YXIgZ2VzdHVyZSA9IFN5bnRoZXRpY0V2ZW50LmdldFBvb2xlZChcbiAgICAgICAgdHlwZSxcbiAgICAgICAgcmVzcG9uZGVySUQgfHwgJycsXG4gICAgICAgIG5hdGl2ZUV2ZW50XG4gICAgICApO1xuICAgICAgRXZlbnRQcm9wYWdhdG9ycy5hY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlcyhnZXN0dXJlKTtcbiAgICAgIGV4dHJhY3RlZCA9IGFjY3VtdWxhdGVJbnRvKGV4dHJhY3RlZCwgZ2VzdHVyZSk7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSBldmVudFR5cGVzLnJlc3BvbmRlclJlbGVhc2UpIHtcbiAgICAgIHJlc3BvbmRlcklEID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGV4dHJhY3RlZDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbmRlckV2ZW50UGx1Z2luO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0IEZhY2Vib29rLCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFRhcEV2ZW50UGx1Z2luXG4gKiBAdHlwZWNoZWNrcyBzdGF0aWMtb25seVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRXZlbnRDb25zdGFudHMgPSByZXF1aXJlKCdyZWFjdC9saWIvRXZlbnRDb25zdGFudHMnKTtcbnZhciBFdmVudFBsdWdpblV0aWxzID0gcmVxdWlyZSgncmVhY3QvbGliL0V2ZW50UGx1Z2luVXRpbHMnKTtcbnZhciBFdmVudFByb3BhZ2F0b3JzID0gcmVxdWlyZSgncmVhY3QvbGliL0V2ZW50UHJvcGFnYXRvcnMnKTtcbnZhciBTeW50aGV0aWNVSUV2ZW50ID0gcmVxdWlyZSgncmVhY3QvbGliL1N5bnRoZXRpY1VJRXZlbnQnKTtcbnZhciBUb3VjaEV2ZW50VXRpbHMgPSByZXF1aXJlKCcuL1RvdWNoRXZlbnRVdGlscycpO1xudmFyIFZpZXdwb3J0TWV0cmljcyA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9WaWV3cG9ydE1ldHJpY3MnKTtcblxudmFyIGtleU9mID0gcmVxdWlyZSgncmVhY3QvbGliL2tleU9mJyk7XG52YXIgdG9wTGV2ZWxUeXBlcyA9IEV2ZW50Q29uc3RhbnRzLnRvcExldmVsVHlwZXM7XG5cbnZhciBpc1N0YXJ0aXNoID0gRXZlbnRQbHVnaW5VdGlscy5pc1N0YXJ0aXNoO1xudmFyIGlzRW5kaXNoID0gRXZlbnRQbHVnaW5VdGlscy5pc0VuZGlzaDtcblxudmFyIGlzVG91Y2ggPSBmdW5jdGlvbih0b3BMZXZlbFR5cGUpIHtcbiAgdmFyIHRvdWNoVHlwZXMgPSBbXG4gICAgdG9wTGV2ZWxUeXBlcy50b3BUb3VjaENhbmNlbCxcbiAgICB0b3BMZXZlbFR5cGVzLnRvcFRvdWNoRW5kLFxuICAgIHRvcExldmVsVHlwZXMudG9wVG91Y2hTdGFydCxcbiAgICB0b3BMZXZlbFR5cGVzLnRvcFRvdWNoTW92ZVxuICBdO1xuICByZXR1cm4gdG91Y2hUeXBlcy5pbmRleE9mKHRvcExldmVsVHlwZSkgPj0gMDtcbn1cblxuLyoqXG4gKiBOdW1iZXIgb2YgcGl4ZWxzIHRoYXQgYXJlIHRvbGVyYXRlZCBpbiBiZXR3ZWVuIGEgYHRvdWNoU3RhcnRgIGFuZCBgdG91Y2hFbmRgXG4gKiBpbiBvcmRlciB0byBzdGlsbCBiZSBjb25zaWRlcmVkIGEgJ3RhcCcgZXZlbnQuXG4gKi9cbnZhciB0YXBNb3ZlVGhyZXNob2xkID0gMTA7XG52YXIgaWdub3JlTW91c2VUaHJlc2hvbGQgPSA3NTA7XG52YXIgc3RhcnRDb29yZHMgPSB7eDogbnVsbCwgeTogbnVsbH07XG52YXIgbGFzdFRvdWNoRXZlbnQgPSBudWxsO1xuXG52YXIgQXhpcyA9IHtcbiAgeDoge3BhZ2U6ICdwYWdlWCcsIGNsaWVudDogJ2NsaWVudFgnLCBlbnZTY3JvbGw6ICdjdXJyZW50UGFnZVNjcm9sbExlZnQnfSxcbiAgeToge3BhZ2U6ICdwYWdlWScsIGNsaWVudDogJ2NsaWVudFknLCBlbnZTY3JvbGw6ICdjdXJyZW50UGFnZVNjcm9sbFRvcCd9XG59O1xuXG5mdW5jdGlvbiBnZXRBeGlzQ29vcmRPZkV2ZW50KGF4aXMsIG5hdGl2ZUV2ZW50KSB7XG4gIHZhciBzaW5nbGVUb3VjaCA9IFRvdWNoRXZlbnRVdGlscy5leHRyYWN0U2luZ2xlVG91Y2gobmF0aXZlRXZlbnQpO1xuICBpZiAoc2luZ2xlVG91Y2gpIHtcbiAgICByZXR1cm4gc2luZ2xlVG91Y2hbYXhpcy5wYWdlXTtcbiAgfVxuICByZXR1cm4gYXhpcy5wYWdlIGluIG5hdGl2ZUV2ZW50ID9cbiAgICBuYXRpdmVFdmVudFtheGlzLnBhZ2VdIDpcbiAgICBuYXRpdmVFdmVudFtheGlzLmNsaWVudF0gKyBWaWV3cG9ydE1ldHJpY3NbYXhpcy5lbnZTY3JvbGxdO1xufVxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZShjb29yZHMsIG5hdGl2ZUV2ZW50KSB7XG4gIHZhciBwYWdlWCA9IGdldEF4aXNDb29yZE9mRXZlbnQoQXhpcy54LCBuYXRpdmVFdmVudCk7XG4gIHZhciBwYWdlWSA9IGdldEF4aXNDb29yZE9mRXZlbnQoQXhpcy55LCBuYXRpdmVFdmVudCk7XG4gIHJldHVybiBNYXRoLnBvdyhcbiAgICBNYXRoLnBvdyhwYWdlWCAtIGNvb3Jkcy54LCAyKSArIE1hdGgucG93KHBhZ2VZIC0gY29vcmRzLnksIDIpLFxuICAgIDAuNVxuICApO1xufVxuXG52YXIgZGVwZW5kZW5jaWVzID0gW1xuICB0b3BMZXZlbFR5cGVzLnRvcE1vdXNlRG93bixcbiAgdG9wTGV2ZWxUeXBlcy50b3BNb3VzZU1vdmUsXG4gIHRvcExldmVsVHlwZXMudG9wTW91c2VVcFxuXTtcblxuaWYgKEV2ZW50UGx1Z2luVXRpbHMudXNlVG91Y2hFdmVudHMpIHtcbiAgZGVwZW5kZW5jaWVzLnB1c2goXG4gICAgdG9wTGV2ZWxUeXBlcy50b3BUb3VjaENhbmNlbCxcbiAgICB0b3BMZXZlbFR5cGVzLnRvcFRvdWNoRW5kLFxuICAgIHRvcExldmVsVHlwZXMudG9wVG91Y2hTdGFydCxcbiAgICB0b3BMZXZlbFR5cGVzLnRvcFRvdWNoTW92ZVxuICApO1xufVxuXG52YXIgZXZlbnRUeXBlcyA9IHtcbiAgdG91Y2hUYXA6IHtcbiAgICBwaGFzZWRSZWdpc3RyYXRpb25OYW1lczoge1xuICAgICAgYnViYmxlZDoga2V5T2Yoe29uVG91Y2hUYXA6IG51bGx9KSxcbiAgICAgIGNhcHR1cmVkOiBrZXlPZih7b25Ub3VjaFRhcENhcHR1cmU6IG51bGx9KVxuICAgIH0sXG4gICAgZGVwZW5kZW5jaWVzOiBkZXBlbmRlbmNpZXNcbiAgfVxufTtcblxudmFyIFRhcEV2ZW50UGx1Z2luID0ge1xuXG4gIHRhcE1vdmVUaHJlc2hvbGQ6IHRhcE1vdmVUaHJlc2hvbGQsXG5cbiAgaWdub3JlTW91c2VUaHJlc2hvbGQ6IGlnbm9yZU1vdXNlVGhyZXNob2xkLFxuXG4gIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFR5cGUgUmVjb3JkIGZyb20gYEV2ZW50Q29uc3RhbnRzYC5cbiAgICogQHBhcmFtIHtET01FdmVudFRhcmdldH0gdG9wTGV2ZWxUYXJnZXQgVGhlIGxpc3RlbmluZyBjb21wb25lbnQgcm9vdCBub2RlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9wTGV2ZWxUYXJnZXRJRCBJRCBvZiBgdG9wTGV2ZWxUYXJnZXRgLlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gICAqIEByZXR1cm4geyp9IEFuIGFjY3VtdWxhdGlvbiBvZiBzeW50aGV0aWMgZXZlbnRzLlxuICAgKiBAc2VlIHtFdmVudFBsdWdpbkh1Yi5leHRyYWN0RXZlbnRzfVxuICAgKi9cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24oXG4gICAgICB0b3BMZXZlbFR5cGUsXG4gICAgICB0b3BMZXZlbFRhcmdldCxcbiAgICAgIHRvcExldmVsVGFyZ2V0SUQsXG4gICAgICBuYXRpdmVFdmVudCkge1xuXG4gICAgaWYgKGlzVG91Y2godG9wTGV2ZWxUeXBlKSkge1xuICAgICAgbGFzdFRvdWNoRXZlbnQgPSBuYXRpdmVFdmVudC50aW1lU3RhbXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsYXN0VG91Y2hFdmVudCAmJiAobmF0aXZlRXZlbnQudGltZVN0YW1wIC0gbGFzdFRvdWNoRXZlbnQpIDwgaWdub3JlTW91c2VUaHJlc2hvbGQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc1N0YXJ0aXNoKHRvcExldmVsVHlwZSkgJiYgIWlzRW5kaXNoKHRvcExldmVsVHlwZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZXZlbnQgPSBudWxsO1xuICAgIHZhciBkaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0Q29vcmRzLCBuYXRpdmVFdmVudCk7XG4gICAgaWYgKGlzRW5kaXNoKHRvcExldmVsVHlwZSkgJiYgZGlzdGFuY2UgPCB0YXBNb3ZlVGhyZXNob2xkKSB7XG4gICAgICBldmVudCA9IFN5bnRoZXRpY1VJRXZlbnQuZ2V0UG9vbGVkKFxuICAgICAgICBldmVudFR5cGVzLnRvdWNoVGFwLFxuICAgICAgICB0b3BMZXZlbFRhcmdldElELFxuICAgICAgICBuYXRpdmVFdmVudFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSkge1xuICAgICAgc3RhcnRDb29yZHMueCA9IGdldEF4aXNDb29yZE9mRXZlbnQoQXhpcy54LCBuYXRpdmVFdmVudCk7XG4gICAgICBzdGFydENvb3Jkcy55ID0gZ2V0QXhpc0Nvb3JkT2ZFdmVudChBeGlzLnksIG5hdGl2ZUV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzRW5kaXNoKHRvcExldmVsVHlwZSkpIHtcbiAgICAgIHN0YXJ0Q29vcmRzLnggPSAwO1xuICAgICAgc3RhcnRDb29yZHMueSA9IDA7XG4gICAgfVxuICAgIEV2ZW50UHJvcGFnYXRvcnMuYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyhldmVudCk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVGFwRXZlbnRQbHVnaW47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0IEZhY2Vib29rLCBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFRvdWNoRXZlbnRVdGlsc1xuICovXG5cbnZhciBUb3VjaEV2ZW50VXRpbHMgPSB7XG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciBjb21tb24gY2FzZSBvZiBleHRyYWN0aW5nIG91dCB0aGUgcHJpbWFyeSB0b3VjaCBmcm9tIGFcbiAgICogdG91Y2ggZXZlbnQuXG4gICAqIC0gYHRvdWNoRW5kYCBldmVudHMgdXN1YWxseSBkbyBub3QgaGF2ZSB0aGUgYHRvdWNoZXNgIHByb3BlcnR5LlxuICAgKiAgIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzY2NjkyOS9cbiAgICogICBtb2JpbGUtc2FyYWktdG91Y2hlbmQtZXZlbnQtbm90LWZpcmluZy13aGVuLWxhc3QtdG91Y2gtaXMtcmVtb3ZlZFxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBuYXRpdmVFdmVudCBOYXRpdmUgZXZlbnQgdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSBhIHRvdWNoLlxuICAgKiBAcmV0dXJuIHtUb3VjaGVzT2JqZWN0P30gYW4gb2JqZWN0IHdpdGggcGFnZVggYW5kIHBhZ2VZIG9yIG51bGwuXG4gICAqL1xuICBleHRyYWN0U2luZ2xlVG91Y2g6IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50KSB7XG4gICAgdmFyIHRvdWNoZXMgPSBuYXRpdmVFdmVudC50b3VjaGVzO1xuICAgIHZhciBjaGFuZ2VkVG91Y2hlcyA9IG5hdGl2ZUV2ZW50LmNoYW5nZWRUb3VjaGVzO1xuICAgIHZhciBoYXNUb3VjaGVzID0gdG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCA+IDA7XG4gICAgdmFyIGhhc0NoYW5nZWRUb3VjaGVzID0gY2hhbmdlZFRvdWNoZXMgJiYgY2hhbmdlZFRvdWNoZXMubGVuZ3RoID4gMDtcblxuICAgIHJldHVybiAhaGFzVG91Y2hlcyAmJiBoYXNDaGFuZ2VkVG91Y2hlcyA/IGNoYW5nZWRUb3VjaGVzWzBdIDpcbiAgICAgICAgICAgaGFzVG91Y2hlcyA/IHRvdWNoZXNbMF0gOlxuICAgICAgICAgICBuYXRpdmVFdmVudDtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb3VjaEV2ZW50VXRpbHM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluamVjdFRhcEV2ZW50UGx1Z2luICgpIHtcbiAgdmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuICBSZWFjdC5pbml0aWFsaXplVG91Y2hFdmVudHModHJ1ZSk7XG5cbiAgcmVxdWlyZSgncmVhY3QvbGliL0V2ZW50UGx1Z2luSHViJykuaW5qZWN0aW9uLmluamVjdEV2ZW50UGx1Z2luc0J5TmFtZSh7XG4gICAgXCJSZXNwb25kZXJFdmVudFBsdWdpblwiOiByZXF1aXJlKCcuL1Jlc3BvbmRlckV2ZW50UGx1Z2luLmpzJyksXG4gICAgXCJUYXBFdmVudFBsdWdpblwiOiAgICAgICByZXF1aXJlKCcuL1RhcEV2ZW50UGx1Z2luLmpzJylcbiAgfSk7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV2ZW50Q29uc3RhbnRzXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlNaXJyb3IgPSByZXF1aXJlKFwiLi9rZXlNaXJyb3JcIik7XG5cbnZhciBQcm9wYWdhdGlvblBoYXNlcyA9IGtleU1pcnJvcih7YnViYmxlZDogbnVsbCwgY2FwdHVyZWQ6IG51bGx9KTtcblxuLyoqXG4gKiBUeXBlcyBvZiByYXcgc2lnbmFscyBmcm9tIHRoZSBicm93c2VyIGNhdWdodCBhdCB0aGUgdG9wIGxldmVsLlxuICovXG52YXIgdG9wTGV2ZWxUeXBlcyA9IGtleU1pcnJvcih7XG4gIHRvcEJsdXI6IG51bGwsXG4gIHRvcENoYW5nZTogbnVsbCxcbiAgdG9wQ2xpY2s6IG51bGwsXG4gIHRvcENvbXBvc2l0aW9uRW5kOiBudWxsLFxuICB0b3BDb21wb3NpdGlvblN0YXJ0OiBudWxsLFxuICB0b3BDb21wb3NpdGlvblVwZGF0ZTogbnVsbCxcbiAgdG9wQ29udGV4dE1lbnU6IG51bGwsXG4gIHRvcENvcHk6IG51bGwsXG4gIHRvcEN1dDogbnVsbCxcbiAgdG9wRG91YmxlQ2xpY2s6IG51bGwsXG4gIHRvcERyYWc6IG51bGwsXG4gIHRvcERyYWdFbmQ6IG51bGwsXG4gIHRvcERyYWdFbnRlcjogbnVsbCxcbiAgdG9wRHJhZ0V4aXQ6IG51bGwsXG4gIHRvcERyYWdMZWF2ZTogbnVsbCxcbiAgdG9wRHJhZ092ZXI6IG51bGwsXG4gIHRvcERyYWdTdGFydDogbnVsbCxcbiAgdG9wRHJvcDogbnVsbCxcbiAgdG9wRXJyb3I6IG51bGwsXG4gIHRvcEZvY3VzOiBudWxsLFxuICB0b3BJbnB1dDogbnVsbCxcbiAgdG9wS2V5RG93bjogbnVsbCxcbiAgdG9wS2V5UHJlc3M6IG51bGwsXG4gIHRvcEtleVVwOiBudWxsLFxuICB0b3BMb2FkOiBudWxsLFxuICB0b3BNb3VzZURvd246IG51bGwsXG4gIHRvcE1vdXNlTW92ZTogbnVsbCxcbiAgdG9wTW91c2VPdXQ6IG51bGwsXG4gIHRvcE1vdXNlT3ZlcjogbnVsbCxcbiAgdG9wTW91c2VVcDogbnVsbCxcbiAgdG9wUGFzdGU6IG51bGwsXG4gIHRvcFJlc2V0OiBudWxsLFxuICB0b3BTY3JvbGw6IG51bGwsXG4gIHRvcFNlbGVjdGlvbkNoYW5nZTogbnVsbCxcbiAgdG9wU3VibWl0OiBudWxsLFxuICB0b3BUZXh0SW5wdXQ6IG51bGwsXG4gIHRvcFRvdWNoQ2FuY2VsOiBudWxsLFxuICB0b3BUb3VjaEVuZDogbnVsbCxcbiAgdG9wVG91Y2hNb3ZlOiBudWxsLFxuICB0b3BUb3VjaFN0YXJ0OiBudWxsLFxuICB0b3BXaGVlbDogbnVsbFxufSk7XG5cbnZhciBFdmVudENvbnN0YW50cyA9IHtcbiAgdG9wTGV2ZWxUeXBlczogdG9wTGV2ZWxUeXBlcyxcbiAgUHJvcGFnYXRpb25QaGFzZXM6IFByb3BhZ2F0aW9uUGhhc2VzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50Q29uc3RhbnRzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV2ZW50UGx1Z2luSHViXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFdmVudFBsdWdpblJlZ2lzdHJ5ID0gcmVxdWlyZShcIi4vRXZlbnRQbHVnaW5SZWdpc3RyeVwiKTtcbnZhciBFdmVudFBsdWdpblV0aWxzID0gcmVxdWlyZShcIi4vRXZlbnRQbHVnaW5VdGlsc1wiKTtcblxudmFyIGFjY3VtdWxhdGVJbnRvID0gcmVxdWlyZShcIi4vYWNjdW11bGF0ZUludG9cIik7XG52YXIgZm9yRWFjaEFjY3VtdWxhdGVkID0gcmVxdWlyZShcIi4vZm9yRWFjaEFjY3VtdWxhdGVkXCIpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBzdG9yZSBmb3IgZXZlbnQgbGlzdGVuZXJzXG4gKi9cbnZhciBsaXN0ZW5lckJhbmsgPSB7fTtcblxuLyoqXG4gKiBJbnRlcm5hbCBxdWV1ZSBvZiBldmVudHMgdGhhdCBoYXZlIGFjY3VtdWxhdGVkIHRoZWlyIGRpc3BhdGNoZXMgYW5kIGFyZVxuICogd2FpdGluZyB0byBoYXZlIHRoZWlyIGRpc3BhdGNoZXMgZXhlY3V0ZWQuXG4gKi9cbnZhciBldmVudFF1ZXVlID0gbnVsbDtcblxuLyoqXG4gKiBEaXNwYXRjaGVzIGFuIGV2ZW50IGFuZCByZWxlYXNlcyBpdCBiYWNrIGludG8gdGhlIHBvb2wsIHVubGVzcyBwZXJzaXN0ZW50LlxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gZXZlbnQgU3ludGhldGljIGV2ZW50IHRvIGJlIGRpc3BhdGNoZWQuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgZXhlY3V0ZURpc3BhdGNoZXNBbmRSZWxlYXNlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgaWYgKGV2ZW50KSB7XG4gICAgdmFyIGV4ZWN1dGVEaXNwYXRjaCA9IEV2ZW50UGx1Z2luVXRpbHMuZXhlY3V0ZURpc3BhdGNoO1xuICAgIC8vIFBsdWdpbnMgY2FuIHByb3ZpZGUgY3VzdG9tIGJlaGF2aW9yIHdoZW4gZGlzcGF0Y2hpbmcgZXZlbnRzLlxuICAgIHZhciBQbHVnaW5Nb2R1bGUgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LmdldFBsdWdpbk1vZHVsZUZvckV2ZW50KGV2ZW50KTtcbiAgICBpZiAoUGx1Z2luTW9kdWxlICYmIFBsdWdpbk1vZHVsZS5leGVjdXRlRGlzcGF0Y2gpIHtcbiAgICAgIGV4ZWN1dGVEaXNwYXRjaCA9IFBsdWdpbk1vZHVsZS5leGVjdXRlRGlzcGF0Y2g7XG4gICAgfVxuICAgIEV2ZW50UGx1Z2luVXRpbHMuZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyKGV2ZW50LCBleGVjdXRlRGlzcGF0Y2gpO1xuXG4gICAgaWYgKCFldmVudC5pc1BlcnNpc3RlbnQoKSkge1xuICAgICAgZXZlbnQuY29uc3RydWN0b3IucmVsZWFzZShldmVudCk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIC0gYEluc3RhbmNlSGFuZGxlYDogW3JlcXVpcmVkXSBNb2R1bGUgdGhhdCBwZXJmb3JtcyBsb2dpY2FsIHRyYXZlcnNhbHMgb2YgRE9NXG4gKiAgIGhpZXJhcmNoeSBnaXZlbiBpZHMgb2YgdGhlIGxvZ2ljYWwgRE9NIGVsZW1lbnRzIGludm9sdmVkLlxuICovXG52YXIgSW5zdGFuY2VIYW5kbGUgPSBudWxsO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUluc3RhbmNlSGFuZGxlKCkge1xuICB2YXIgaW52YWxpZCA9ICFJbnN0YW5jZUhhbmRsZXx8XG4gICAgIUluc3RhbmNlSGFuZGxlLnRyYXZlcnNlVHdvUGhhc2UgfHxcbiAgICAhSW5zdGFuY2VIYW5kbGUudHJhdmVyc2VFbnRlckxlYXZlO1xuICBpZiAoaW52YWxpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW5zdGFuY2VIYW5kbGUgbm90IGluamVjdGVkIGJlZm9yZSB1c2UhJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgdW5pZmllZCBpbnRlcmZhY2UgZm9yIGV2ZW50IHBsdWdpbnMgdG8gYmUgaW5zdGFsbGVkIGFuZCBjb25maWd1cmVkLlxuICpcbiAqIEV2ZW50IHBsdWdpbnMgY2FuIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKlxuICogICBgZXh0cmFjdEV2ZW50c2Age2Z1bmN0aW9uKHN0cmluZywgRE9NRXZlbnRUYXJnZXQsIHN0cmluZywgb2JqZWN0KTogKn1cbiAqICAgICBSZXF1aXJlZC4gV2hlbiBhIHRvcC1sZXZlbCBldmVudCBpcyBmaXJlZCwgdGhpcyBtZXRob2QgaXMgZXhwZWN0ZWQgdG9cbiAqICAgICBleHRyYWN0IHN5bnRoZXRpYyBldmVudHMgdGhhdCB3aWxsIGluIHR1cm4gYmUgcXVldWVkIGFuZCBkaXNwYXRjaGVkLlxuICpcbiAqICAgYGV2ZW50VHlwZXNgIHtvYmplY3R9XG4gKiAgICAgT3B0aW9uYWwsIHBsdWdpbnMgdGhhdCBmaXJlIGV2ZW50cyBtdXN0IHB1Ymxpc2ggYSBtYXBwaW5nIG9mIHJlZ2lzdHJhdGlvblxuICogICAgIG5hbWVzIHRoYXQgYXJlIHVzZWQgdG8gcmVnaXN0ZXIgbGlzdGVuZXJzLiBWYWx1ZXMgb2YgdGhpcyBtYXBwaW5nIG11c3RcbiAqICAgICBiZSBvYmplY3RzIHRoYXQgY29udGFpbiBgcmVnaXN0cmF0aW9uTmFtZWAgb3IgYHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzYC5cbiAqXG4gKiAgIGBleGVjdXRlRGlzcGF0Y2hgIHtmdW5jdGlvbihvYmplY3QsIGZ1bmN0aW9uLCBzdHJpbmcpfVxuICogICAgIE9wdGlvbmFsLCBhbGxvd3MgcGx1Z2lucyB0byBvdmVycmlkZSBob3cgYW4gZXZlbnQgZ2V0cyBkaXNwYXRjaGVkLiBCeVxuICogICAgIGRlZmF1bHQsIHRoZSBsaXN0ZW5lciBpcyBzaW1wbHkgaW52b2tlZC5cbiAqXG4gKiBFYWNoIHBsdWdpbiB0aGF0IGlzIGluamVjdGVkIGludG8gYEV2ZW50c1BsdWdpbkh1YmAgaXMgaW1tZWRpYXRlbHkgb3BlcmFibGUuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgRXZlbnRQbHVnaW5IdWIgPSB7XG5cbiAgLyoqXG4gICAqIE1ldGhvZHMgZm9yIGluamVjdGluZyBkZXBlbmRlbmNpZXMuXG4gICAqL1xuICBpbmplY3Rpb246IHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBJbmplY3RlZE1vdW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluamVjdE1vdW50OiBFdmVudFBsdWdpblV0aWxzLmluamVjdGlvbi5pbmplY3RNb3VudCxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBJbmplY3RlZEluc3RhbmNlSGFuZGxlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGluamVjdEluc3RhbmNlSGFuZGxlOiBmdW5jdGlvbihJbmplY3RlZEluc3RhbmNlSGFuZGxlKSB7XG4gICAgICBJbnN0YW5jZUhhbmRsZSA9IEluamVjdGVkSW5zdGFuY2VIYW5kbGU7XG4gICAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIHZhbGlkYXRlSW5zdGFuY2VIYW5kbGUoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0SW5zdGFuY2VIYW5kbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICB2YWxpZGF0ZUluc3RhbmNlSGFuZGxlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gSW5zdGFuY2VIYW5kbGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IEluamVjdGVkRXZlbnRQbHVnaW5PcmRlclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBpbmplY3RFdmVudFBsdWdpbk9yZGVyOiBFdmVudFBsdWdpblJlZ2lzdHJ5LmluamVjdEV2ZW50UGx1Z2luT3JkZXIsXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gaW5qZWN0ZWROYW1lc1RvUGx1Z2lucyBNYXAgZnJvbSBuYW1lcyB0byBwbHVnaW4gbW9kdWxlcy5cbiAgICAgKi9cbiAgICBpbmplY3RFdmVudFBsdWdpbnNCeU5hbWU6IEV2ZW50UGx1Z2luUmVnaXN0cnkuaW5qZWN0RXZlbnRQbHVnaW5zQnlOYW1lXG5cbiAgfSxcblxuICBldmVudE5hbWVEaXNwYXRjaENvbmZpZ3M6IEV2ZW50UGx1Z2luUmVnaXN0cnkuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzLFxuXG4gIHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzOiBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzLFxuXG4gIC8qKlxuICAgKiBTdG9yZXMgYGxpc3RlbmVyYCBhdCBgbGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdW2lkXWAuIElzIGlkZW1wb3RlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJRCBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWdpc3RyYXRpb25OYW1lIE5hbWUgb2YgbGlzdGVuZXIgKGUuZy4gYG9uQ2xpY2tgKS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGxpc3RlbmVyIFRoZSBjYWxsYmFjayB0byBzdG9yZS5cbiAgICovXG4gIHB1dExpc3RlbmVyOiBmdW5jdGlvbihpZCwgcmVnaXN0cmF0aW9uTmFtZSwgbGlzdGVuZXIpIHtcbiAgICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgICAgIWxpc3RlbmVyIHx8IHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyxcbiAgICAgICdFeHBlY3RlZCAlcyBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLCBpbnN0ZWFkIGdvdCB0eXBlICVzJyxcbiAgICAgIHJlZ2lzdHJhdGlvbk5hbWUsIHR5cGVvZiBsaXN0ZW5lclxuICAgICkgOiBpbnZhcmlhbnQoIWxpc3RlbmVyIHx8IHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykpO1xuXG4gICAgdmFyIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lID1cbiAgICAgIGxpc3RlbmVyQmFua1tyZWdpc3RyYXRpb25OYW1lXSB8fCAobGlzdGVuZXJCYW5rW3JlZ2lzdHJhdGlvbk5hbWVdID0ge30pO1xuICAgIGJhbmtGb3JSZWdpc3RyYXRpb25OYW1lW2lkXSA9IGxpc3RlbmVyO1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgSUQgb2YgdGhlIERPTSBlbGVtZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBOYW1lIG9mIGxpc3RlbmVyIChlLmcuIGBvbkNsaWNrYCkuXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn0gVGhlIHN0b3JlZCBjYWxsYmFjay5cbiAgICovXG4gIGdldExpc3RlbmVyOiBmdW5jdGlvbihpZCwgcmVnaXN0cmF0aW9uTmFtZSkge1xuICAgIHZhciBiYW5rRm9yUmVnaXN0cmF0aW9uTmFtZSA9IGxpc3RlbmVyQmFua1tyZWdpc3RyYXRpb25OYW1lXTtcbiAgICByZXR1cm4gYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWUgJiYgYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWVbaWRdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgbGlzdGVuZXIgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIGJhbmsuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBJRCBvZiB0aGUgRE9NIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWdpc3RyYXRpb25OYW1lIE5hbWUgb2YgbGlzdGVuZXIgKGUuZy4gYG9uQ2xpY2tgKS5cbiAgICovXG4gIGRlbGV0ZUxpc3RlbmVyOiBmdW5jdGlvbihpZCwgcmVnaXN0cmF0aW9uTmFtZSkge1xuICAgIHZhciBiYW5rRm9yUmVnaXN0cmF0aW9uTmFtZSA9IGxpc3RlbmVyQmFua1tyZWdpc3RyYXRpb25OYW1lXTtcbiAgICBpZiAoYmFua0ZvclJlZ2lzdHJhdGlvbk5hbWUpIHtcbiAgICAgIGRlbGV0ZSBiYW5rRm9yUmVnaXN0cmF0aW9uTmFtZVtpZF07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBET00gZWxlbWVudCB3aXRoIHRoZSBzdXBwbGllZCBJRC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIElEIG9mIHRoZSBET00gZWxlbWVudC5cbiAgICovXG4gIGRlbGV0ZUFsbExpc3RlbmVyczogZnVuY3Rpb24oaWQpIHtcbiAgICBmb3IgKHZhciByZWdpc3RyYXRpb25OYW1lIGluIGxpc3RlbmVyQmFuaykge1xuICAgICAgZGVsZXRlIGxpc3RlbmVyQmFua1tyZWdpc3RyYXRpb25OYW1lXVtpZF07XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgcmVnaXN0ZXJlZCBwbHVnaW5zIGFuIG9wcG9ydHVuaXR5IHRvIGV4dHJhY3QgZXZlbnRzIGZyb20gdG9wLWxldmVsXG4gICAqIG5hdGl2ZSBicm93c2VyIGV2ZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcExldmVsVHlwZSBSZWNvcmQgZnJvbSBgRXZlbnRDb25zdGFudHNgLlxuICAgKiBAcGFyYW0ge0RPTUV2ZW50VGFyZ2V0fSB0b3BMZXZlbFRhcmdldCBUaGUgbGlzdGVuaW5nIGNvbXBvbmVudCByb290IG5vZGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BMZXZlbFRhcmdldElEIElEIG9mIGB0b3BMZXZlbFRhcmdldGAuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuYXRpdmVFdmVudCBOYXRpdmUgYnJvd3NlciBldmVudC5cbiAgICogQHJldHVybiB7Kn0gQW4gYWNjdW11bGF0aW9uIG9mIHN5bnRoZXRpYyBldmVudHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZXh0cmFjdEV2ZW50czogZnVuY3Rpb24oXG4gICAgICB0b3BMZXZlbFR5cGUsXG4gICAgICB0b3BMZXZlbFRhcmdldCxcbiAgICAgIHRvcExldmVsVGFyZ2V0SUQsXG4gICAgICBuYXRpdmVFdmVudCkge1xuICAgIHZhciBldmVudHM7XG4gICAgdmFyIHBsdWdpbnMgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnBsdWdpbnM7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwbHVnaW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgLy8gTm90IGV2ZXJ5IHBsdWdpbiBpbiB0aGUgb3JkZXJpbmcgbWF5IGJlIGxvYWRlZCBhdCBydW50aW1lLlxuICAgICAgdmFyIHBvc3NpYmxlUGx1Z2luID0gcGx1Z2luc1tpXTtcbiAgICAgIGlmIChwb3NzaWJsZVBsdWdpbikge1xuICAgICAgICB2YXIgZXh0cmFjdGVkRXZlbnRzID0gcG9zc2libGVQbHVnaW4uZXh0cmFjdEV2ZW50cyhcbiAgICAgICAgICB0b3BMZXZlbFR5cGUsXG4gICAgICAgICAgdG9wTGV2ZWxUYXJnZXQsXG4gICAgICAgICAgdG9wTGV2ZWxUYXJnZXRJRCxcbiAgICAgICAgICBuYXRpdmVFdmVudFxuICAgICAgICApO1xuICAgICAgICBpZiAoZXh0cmFjdGVkRXZlbnRzKSB7XG4gICAgICAgICAgZXZlbnRzID0gYWNjdW11bGF0ZUludG8oZXZlbnRzLCBleHRyYWN0ZWRFdmVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBldmVudHM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWVzIGEgc3ludGhldGljIGV2ZW50IHRoYXQgc2hvdWxkIGJlIGRpc3BhdGNoZWQgd2hlblxuICAgKiBgcHJvY2Vzc0V2ZW50UXVldWVgIGlzIGludm9rZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZXZlbnRzIEFuIGFjY3VtdWxhdGlvbiBvZiBzeW50aGV0aWMgZXZlbnRzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVFdmVudHM6IGZ1bmN0aW9uKGV2ZW50cykge1xuICAgIGlmIChldmVudHMpIHtcbiAgICAgIGV2ZW50UXVldWUgPSBhY2N1bXVsYXRlSW50byhldmVudFF1ZXVlLCBldmVudHMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbGwgc3ludGhldGljIGV2ZW50cyBvbiB0aGUgZXZlbnQgcXVldWUuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcHJvY2Vzc0V2ZW50UXVldWU6IGZ1bmN0aW9uKCkge1xuICAgIC8vIFNldCBgZXZlbnRRdWV1ZWAgdG8gbnVsbCBiZWZvcmUgcHJvY2Vzc2luZyBpdCBzbyB0aGF0IHdlIGNhbiB0ZWxsIGlmIG1vcmVcbiAgICAvLyBldmVudHMgZ2V0IGVucXVldWVkIHdoaWxlIHByb2Nlc3NpbmcuXG4gICAgdmFyIHByb2Nlc3NpbmdFdmVudFF1ZXVlID0gZXZlbnRRdWV1ZTtcbiAgICBldmVudFF1ZXVlID0gbnVsbDtcbiAgICBmb3JFYWNoQWNjdW11bGF0ZWQocHJvY2Vzc2luZ0V2ZW50UXVldWUsIGV4ZWN1dGVEaXNwYXRjaGVzQW5kUmVsZWFzZSk7XG4gICAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICAgICFldmVudFF1ZXVlLFxuICAgICAgJ3Byb2Nlc3NFdmVudFF1ZXVlKCk6IEFkZGl0aW9uYWwgZXZlbnRzIHdlcmUgZW5xdWV1ZWQgd2hpbGUgcHJvY2Vzc2luZyAnICtcbiAgICAgICdhbiBldmVudCBxdWV1ZS4gU3VwcG9ydCBmb3IgdGhpcyBoYXMgbm90IHlldCBiZWVuIGltcGxlbWVudGVkLidcbiAgICApIDogaW52YXJpYW50KCFldmVudFF1ZXVlKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoZXNlIGFyZSBuZWVkZWQgZm9yIHRlc3RzIG9ubHkuIERvIG5vdCB1c2UhXG4gICAqL1xuICBfX3B1cmdlOiBmdW5jdGlvbigpIHtcbiAgICBsaXN0ZW5lckJhbmsgPSB7fTtcbiAgfSxcblxuICBfX2dldExpc3RlbmVyQmFuazogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQmFuaztcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50UGx1Z2luSHViO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV2ZW50UGx1Z2luUmVnaXN0cnlcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogSW5qZWN0YWJsZSBvcmRlcmluZyBvZiBldmVudCBwbHVnaW5zLlxuICovXG52YXIgRXZlbnRQbHVnaW5PcmRlciA9IG51bGw7XG5cbi8qKlxuICogSW5qZWN0YWJsZSBtYXBwaW5nIGZyb20gbmFtZXMgdG8gZXZlbnQgcGx1Z2luIG1vZHVsZXMuXG4gKi9cbnZhciBuYW1lc1RvUGx1Z2lucyA9IHt9O1xuXG4vKipcbiAqIFJlY29tcHV0ZXMgdGhlIHBsdWdpbiBsaXN0IHVzaW5nIHRoZSBpbmplY3RlZCBwbHVnaW5zIGFuZCBwbHVnaW4gb3JkZXJpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjb21wdXRlUGx1Z2luT3JkZXJpbmcoKSB7XG4gIGlmICghRXZlbnRQbHVnaW5PcmRlcikge1xuICAgIC8vIFdhaXQgdW50aWwgYW4gYEV2ZW50UGx1Z2luT3JkZXJgIGlzIGluamVjdGVkLlxuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBwbHVnaW5OYW1lIGluIG5hbWVzVG9QbHVnaW5zKSB7XG4gICAgdmFyIFBsdWdpbk1vZHVsZSA9IG5hbWVzVG9QbHVnaW5zW3BsdWdpbk5hbWVdO1xuICAgIHZhciBwbHVnaW5JbmRleCA9IEV2ZW50UGx1Z2luT3JkZXIuaW5kZXhPZihwbHVnaW5OYW1lKTtcbiAgICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgICAgcGx1Z2luSW5kZXggPiAtMSxcbiAgICAgICdFdmVudFBsdWdpblJlZ2lzdHJ5OiBDYW5ub3QgaW5qZWN0IGV2ZW50IHBsdWdpbnMgdGhhdCBkbyBub3QgZXhpc3QgaW4gJyArXG4gICAgICAndGhlIHBsdWdpbiBvcmRlcmluZywgYCVzYC4nLFxuICAgICAgcGx1Z2luTmFtZVxuICAgICkgOiBpbnZhcmlhbnQocGx1Z2luSW5kZXggPiAtMSkpO1xuICAgIGlmIChFdmVudFBsdWdpblJlZ2lzdHJ5LnBsdWdpbnNbcGx1Z2luSW5kZXhdKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICAgIFBsdWdpbk1vZHVsZS5leHRyYWN0RXZlbnRzLFxuICAgICAgJ0V2ZW50UGx1Z2luUmVnaXN0cnk6IEV2ZW50IHBsdWdpbnMgbXVzdCBpbXBsZW1lbnQgYW4gYGV4dHJhY3RFdmVudHNgICcgK1xuICAgICAgJ21ldGhvZCwgYnV0IGAlc2AgZG9lcyBub3QuJyxcbiAgICAgIHBsdWdpbk5hbWVcbiAgICApIDogaW52YXJpYW50KFBsdWdpbk1vZHVsZS5leHRyYWN0RXZlbnRzKSk7XG4gICAgRXZlbnRQbHVnaW5SZWdpc3RyeS5wbHVnaW5zW3BsdWdpbkluZGV4XSA9IFBsdWdpbk1vZHVsZTtcbiAgICB2YXIgcHVibGlzaGVkRXZlbnRzID0gUGx1Z2luTW9kdWxlLmV2ZW50VHlwZXM7XG4gICAgZm9yICh2YXIgZXZlbnROYW1lIGluIHB1Ymxpc2hlZEV2ZW50cykge1xuICAgICAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICAgICAgcHVibGlzaEV2ZW50Rm9yUGx1Z2luKFxuICAgICAgICAgIHB1Ymxpc2hlZEV2ZW50c1tldmVudE5hbWVdLFxuICAgICAgICAgIFBsdWdpbk1vZHVsZSxcbiAgICAgICAgICBldmVudE5hbWVcbiAgICAgICAgKSxcbiAgICAgICAgJ0V2ZW50UGx1Z2luUmVnaXN0cnk6IEZhaWxlZCB0byBwdWJsaXNoIGV2ZW50IGAlc2AgZm9yIHBsdWdpbiBgJXNgLicsXG4gICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgcGx1Z2luTmFtZVxuICAgICAgKSA6IGludmFyaWFudChwdWJsaXNoRXZlbnRGb3JQbHVnaW4oXG4gICAgICAgIHB1Ymxpc2hlZEV2ZW50c1tldmVudE5hbWVdLFxuICAgICAgICBQbHVnaW5Nb2R1bGUsXG4gICAgICAgIGV2ZW50TmFtZVxuICAgICAgKSkpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFB1Ymxpc2hlcyBhbiBldmVudCBzbyB0aGF0IGl0IGNhbiBiZSBkaXNwYXRjaGVkIGJ5IHRoZSBzdXBwbGllZCBwbHVnaW4uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRpc3BhdGNoQ29uZmlnIERpc3BhdGNoIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBQbHVnaW5Nb2R1bGUgUGx1Z2luIHB1Ymxpc2hpbmcgdGhlIGV2ZW50LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwdWJsaXNoRXZlbnRGb3JQbHVnaW4oZGlzcGF0Y2hDb25maWcsIFBsdWdpbk1vZHVsZSwgZXZlbnROYW1lKSB7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgIUV2ZW50UGx1Z2luUmVnaXN0cnkuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSksXG4gICAgJ0V2ZW50UGx1Z2luSHViOiBNb3JlIHRoYW4gb25lIHBsdWdpbiBhdHRlbXB0ZWQgdG8gcHVibGlzaCB0aGUgc2FtZSAnICtcbiAgICAnZXZlbnQgbmFtZSwgYCVzYC4nLFxuICAgIGV2ZW50TmFtZVxuICApIDogaW52YXJpYW50KCFFdmVudFBsdWdpblJlZ2lzdHJ5LmV2ZW50TmFtZURpc3BhdGNoQ29uZmlncy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSk7XG4gIEV2ZW50UGx1Z2luUmVnaXN0cnkuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzW2V2ZW50TmFtZV0gPSBkaXNwYXRjaENvbmZpZztcblxuICB2YXIgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMgPSBkaXNwYXRjaENvbmZpZy5waGFzZWRSZWdpc3RyYXRpb25OYW1lcztcbiAgaWYgKHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKSB7XG4gICAgZm9yICh2YXIgcGhhc2VOYW1lIGluIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKSB7XG4gICAgICBpZiAocGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkocGhhc2VOYW1lKSkge1xuICAgICAgICB2YXIgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZSA9IHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzW3BoYXNlTmFtZV07XG4gICAgICAgIHB1Ymxpc2hSZWdpc3RyYXRpb25OYW1lKFxuICAgICAgICAgIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWUsXG4gICAgICAgICAgUGx1Z2luTW9kdWxlLFxuICAgICAgICAgIGV2ZW50TmFtZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChkaXNwYXRjaENvbmZpZy5yZWdpc3RyYXRpb25OYW1lKSB7XG4gICAgcHVibGlzaFJlZ2lzdHJhdGlvbk5hbWUoXG4gICAgICBkaXNwYXRjaENvbmZpZy5yZWdpc3RyYXRpb25OYW1lLFxuICAgICAgUGx1Z2luTW9kdWxlLFxuICAgICAgZXZlbnROYW1lXG4gICAgKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogUHVibGlzaGVzIGEgcmVnaXN0cmF0aW9uIG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IGRpc3BhdGNoZWQgZXZlbnRzIGFuZFxuICogY2FuIGJlIHVzZWQgd2l0aCBgRXZlbnRQbHVnaW5IdWIucHV0TGlzdGVuZXJgIHRvIHJlZ2lzdGVyIGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnaXN0cmF0aW9uTmFtZSBSZWdpc3RyYXRpb24gbmFtZSB0byBhZGQuXG4gKiBAcGFyYW0ge29iamVjdH0gUGx1Z2luTW9kdWxlIFBsdWdpbiBwdWJsaXNoaW5nIHRoZSBldmVudC5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHB1Ymxpc2hSZWdpc3RyYXRpb25OYW1lKHJlZ2lzdHJhdGlvbk5hbWUsIFBsdWdpbk1vZHVsZSwgZXZlbnROYW1lKSB7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgIUV2ZW50UGx1Z2luUmVnaXN0cnkucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbcmVnaXN0cmF0aW9uTmFtZV0sXG4gICAgJ0V2ZW50UGx1Z2luSHViOiBNb3JlIHRoYW4gb25lIHBsdWdpbiBhdHRlbXB0ZWQgdG8gcHVibGlzaCB0aGUgc2FtZSAnICtcbiAgICAncmVnaXN0cmF0aW9uIG5hbWUsIGAlc2AuJyxcbiAgICByZWdpc3RyYXRpb25OYW1lXG4gICkgOiBpbnZhcmlhbnQoIUV2ZW50UGx1Z2luUmVnaXN0cnkucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbcmVnaXN0cmF0aW9uTmFtZV0pKTtcbiAgRXZlbnRQbHVnaW5SZWdpc3RyeS5yZWdpc3RyYXRpb25OYW1lTW9kdWxlc1tyZWdpc3RyYXRpb25OYW1lXSA9IFBsdWdpbk1vZHVsZTtcbiAgRXZlbnRQbHVnaW5SZWdpc3RyeS5yZWdpc3RyYXRpb25OYW1lRGVwZW5kZW5jaWVzW3JlZ2lzdHJhdGlvbk5hbWVdID1cbiAgICBQbHVnaW5Nb2R1bGUuZXZlbnRUeXBlc1tldmVudE5hbWVdLmRlcGVuZGVuY2llcztcbn1cblxuLyoqXG4gKiBSZWdpc3RlcnMgcGx1Z2lucyBzbyB0aGF0IHRoZXkgY2FuIGV4dHJhY3QgYW5kIGRpc3BhdGNoIGV2ZW50cy5cbiAqXG4gKiBAc2VlIHtFdmVudFBsdWdpbkh1Yn1cbiAqL1xudmFyIEV2ZW50UGx1Z2luUmVnaXN0cnkgPSB7XG5cbiAgLyoqXG4gICAqIE9yZGVyZWQgbGlzdCBvZiBpbmplY3RlZCBwbHVnaW5zLlxuICAgKi9cbiAgcGx1Z2luczogW10sXG5cbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBldmVudCBuYW1lIHRvIGRpc3BhdGNoIGNvbmZpZ1xuICAgKi9cbiAgZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzOiB7fSxcblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIHJlZ2lzdHJhdGlvbiBuYW1lIHRvIHBsdWdpbiBtb2R1bGVcbiAgICovXG4gIHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzOiB7fSxcblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIHJlZ2lzdHJhdGlvbiBuYW1lIHRvIGV2ZW50IG5hbWVcbiAgICovXG4gIHJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBJbmplY3RzIGFuIG9yZGVyaW5nIG9mIHBsdWdpbnMgKGJ5IHBsdWdpbiBuYW1lKS4gVGhpcyBhbGxvd3MgdGhlIG9yZGVyaW5nXG4gICAqIHRvIGJlIGRlY291cGxlZCBmcm9tIGluamVjdGlvbiBvZiB0aGUgYWN0dWFsIHBsdWdpbnMgc28gdGhhdCBvcmRlcmluZyBpc1xuICAgKiBhbHdheXMgZGV0ZXJtaW5pc3RpYyByZWdhcmRsZXNzIG9mIHBhY2thZ2luZywgb24tdGhlLWZseSBpbmplY3Rpb24sIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gSW5qZWN0ZWRFdmVudFBsdWdpbk9yZGVyXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAc2VlIHtFdmVudFBsdWdpbkh1Yi5pbmplY3Rpb24uaW5qZWN0RXZlbnRQbHVnaW5PcmRlcn1cbiAgICovXG4gIGluamVjdEV2ZW50UGx1Z2luT3JkZXI6IGZ1bmN0aW9uKEluamVjdGVkRXZlbnRQbHVnaW5PcmRlcikge1xuICAgIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgICAhRXZlbnRQbHVnaW5PcmRlcixcbiAgICAgICdFdmVudFBsdWdpblJlZ2lzdHJ5OiBDYW5ub3QgaW5qZWN0IGV2ZW50IHBsdWdpbiBvcmRlcmluZyBtb3JlIHRoYW4gJyArXG4gICAgICAnb25jZS4gWW91IGFyZSBsaWtlbHkgdHJ5aW5nIHRvIGxvYWQgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0LidcbiAgICApIDogaW52YXJpYW50KCFFdmVudFBsdWdpbk9yZGVyKSk7XG4gICAgLy8gQ2xvbmUgdGhlIG9yZGVyaW5nIHNvIGl0IGNhbm5vdCBiZSBkeW5hbWljYWxseSBtdXRhdGVkLlxuICAgIEV2ZW50UGx1Z2luT3JkZXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChJbmplY3RlZEV2ZW50UGx1Z2luT3JkZXIpO1xuICAgIHJlY29tcHV0ZVBsdWdpbk9yZGVyaW5nKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEluamVjdHMgcGx1Z2lucyB0byBiZSB1c2VkIGJ5IGBFdmVudFBsdWdpbkh1YmAuIFRoZSBwbHVnaW4gbmFtZXMgbXVzdCBiZVxuICAgKiBpbiB0aGUgb3JkZXJpbmcgaW5qZWN0ZWQgYnkgYGluamVjdEV2ZW50UGx1Z2luT3JkZXJgLlxuICAgKlxuICAgKiBQbHVnaW5zIGNhbiBiZSBpbmplY3RlZCBhcyBwYXJ0IG9mIHBhZ2UgaW5pdGlhbGl6YXRpb24gb3Igb24tdGhlLWZseS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGluamVjdGVkTmFtZXNUb1BsdWdpbnMgTWFwIGZyb20gbmFtZXMgdG8gcGx1Z2luIG1vZHVsZXMuXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAc2VlIHtFdmVudFBsdWdpbkh1Yi5pbmplY3Rpb24uaW5qZWN0RXZlbnRQbHVnaW5zQnlOYW1lfVxuICAgKi9cbiAgaW5qZWN0RXZlbnRQbHVnaW5zQnlOYW1lOiBmdW5jdGlvbihpbmplY3RlZE5hbWVzVG9QbHVnaW5zKSB7XG4gICAgdmFyIGlzT3JkZXJpbmdEaXJ0eSA9IGZhbHNlO1xuICAgIGZvciAodmFyIHBsdWdpbk5hbWUgaW4gaW5qZWN0ZWROYW1lc1RvUGx1Z2lucykge1xuICAgICAgaWYgKCFpbmplY3RlZE5hbWVzVG9QbHVnaW5zLmhhc093blByb3BlcnR5KHBsdWdpbk5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIFBsdWdpbk1vZHVsZSA9IGluamVjdGVkTmFtZXNUb1BsdWdpbnNbcGx1Z2luTmFtZV07XG4gICAgICBpZiAoIW5hbWVzVG9QbHVnaW5zLmhhc093blByb3BlcnR5KHBsdWdpbk5hbWUpIHx8XG4gICAgICAgICAgbmFtZXNUb1BsdWdpbnNbcGx1Z2luTmFtZV0gIT09IFBsdWdpbk1vZHVsZSkge1xuICAgICAgICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgICAgICAgICFuYW1lc1RvUGx1Z2luc1twbHVnaW5OYW1lXSxcbiAgICAgICAgICAnRXZlbnRQbHVnaW5SZWdpc3RyeTogQ2Fubm90IGluamVjdCB0d28gZGlmZmVyZW50IGV2ZW50IHBsdWdpbnMgJyArXG4gICAgICAgICAgJ3VzaW5nIHRoZSBzYW1lIG5hbWUsIGAlc2AuJyxcbiAgICAgICAgICBwbHVnaW5OYW1lXG4gICAgICAgICkgOiBpbnZhcmlhbnQoIW5hbWVzVG9QbHVnaW5zW3BsdWdpbk5hbWVdKSk7XG4gICAgICAgIG5hbWVzVG9QbHVnaW5zW3BsdWdpbk5hbWVdID0gUGx1Z2luTW9kdWxlO1xuICAgICAgICBpc09yZGVyaW5nRGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNPcmRlcmluZ0RpcnR5KSB7XG4gICAgICByZWNvbXB1dGVQbHVnaW5PcmRlcmluZygpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogTG9va3MgdXAgdGhlIHBsdWdpbiBmb3IgdGhlIHN1cHBsaWVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gZXZlbnQgQSBzeW50aGV0aWMgZXZlbnQuXG4gICAqIEByZXR1cm4gez9vYmplY3R9IFRoZSBwbHVnaW4gdGhhdCBjcmVhdGVkIHRoZSBzdXBwbGllZCBldmVudC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBnZXRQbHVnaW5Nb2R1bGVGb3JFdmVudDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZGlzcGF0Y2hDb25maWcgPSBldmVudC5kaXNwYXRjaENvbmZpZztcbiAgICBpZiAoZGlzcGF0Y2hDb25maWcucmVnaXN0cmF0aW9uTmFtZSkge1xuICAgICAgcmV0dXJuIEV2ZW50UGx1Z2luUmVnaXN0cnkucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbXG4gICAgICAgIGRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWVcbiAgICAgIF0gfHwgbnVsbDtcbiAgICB9XG4gICAgZm9yICh2YXIgcGhhc2UgaW4gZGlzcGF0Y2hDb25maWcucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMpIHtcbiAgICAgIGlmICghZGlzcGF0Y2hDb25maWcucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkocGhhc2UpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIFBsdWdpbk1vZHVsZSA9IEV2ZW50UGx1Z2luUmVnaXN0cnkucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbXG4gICAgICAgIGRpc3BhdGNoQ29uZmlnLnBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzW3BoYXNlXVxuICAgICAgXTtcbiAgICAgIGlmIChQbHVnaW5Nb2R1bGUpIHtcbiAgICAgICAgcmV0dXJuIFBsdWdpbk1vZHVsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEV4cG9zZWQgZm9yIHVuaXQgdGVzdGluZy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9yZXNldEV2ZW50UGx1Z2luczogZnVuY3Rpb24oKSB7XG4gICAgRXZlbnRQbHVnaW5PcmRlciA9IG51bGw7XG4gICAgZm9yICh2YXIgcGx1Z2luTmFtZSBpbiBuYW1lc1RvUGx1Z2lucykge1xuICAgICAgaWYgKG5hbWVzVG9QbHVnaW5zLmhhc093blByb3BlcnR5KHBsdWdpbk5hbWUpKSB7XG4gICAgICAgIGRlbGV0ZSBuYW1lc1RvUGx1Z2luc1twbHVnaW5OYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gICAgRXZlbnRQbHVnaW5SZWdpc3RyeS5wbHVnaW5zLmxlbmd0aCA9IDA7XG5cbiAgICB2YXIgZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzID0gRXZlbnRQbHVnaW5SZWdpc3RyeS5ldmVudE5hbWVEaXNwYXRjaENvbmZpZ3M7XG4gICAgZm9yICh2YXIgZXZlbnROYW1lIGluIGV2ZW50TmFtZURpc3BhdGNoQ29uZmlncykge1xuICAgICAgaWYgKGV2ZW50TmFtZURpc3BhdGNoQ29uZmlncy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKSB7XG4gICAgICAgIGRlbGV0ZSBldmVudE5hbWVEaXNwYXRjaENvbmZpZ3NbZXZlbnROYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMgPSBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzO1xuICAgIGZvciAodmFyIHJlZ2lzdHJhdGlvbk5hbWUgaW4gcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMpIHtcbiAgICAgIGlmIChyZWdpc3RyYXRpb25OYW1lTW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShyZWdpc3RyYXRpb25OYW1lKSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0cmF0aW9uTmFtZU1vZHVsZXNbcmVnaXN0cmF0aW9uTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRQbHVnaW5SZWdpc3RyeTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFdmVudFBsdWdpblV0aWxzXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFdmVudENvbnN0YW50cyA9IHJlcXVpcmUoXCIuL0V2ZW50Q29uc3RhbnRzXCIpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqIEluamVjdGVkIGRlcGVuZGVuY2llczpcbiAqL1xuXG4vKipcbiAqIC0gYE1vdW50YDogW3JlcXVpcmVkXSBNb2R1bGUgdGhhdCBjYW4gY29udmVydCBiZXR3ZWVuIFJlYWN0IGRvbSBJRHMgYW5kXG4gKiAgIGFjdHVhbCBub2RlIHJlZmVyZW5jZXMuXG4gKi9cbnZhciBpbmplY3Rpb24gPSB7XG4gIE1vdW50OiBudWxsLFxuICBpbmplY3RNb3VudDogZnVuY3Rpb24oSW5qZWN0ZWRNb3VudCkge1xuICAgIGluamVjdGlvbi5Nb3VudCA9IEluamVjdGVkTW91bnQ7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICAgICAgSW5qZWN0ZWRNb3VudCAmJiBJbmplY3RlZE1vdW50LmdldE5vZGUsXG4gICAgICAgICdFdmVudFBsdWdpblV0aWxzLmluamVjdGlvbi5pbmplY3RNb3VudCguLi4pOiBJbmplY3RlZCBNb3VudCBtb2R1bGUgJyArXG4gICAgICAgICdpcyBtaXNzaW5nIGdldE5vZGUuJ1xuICAgICAgKSA6IGludmFyaWFudChJbmplY3RlZE1vdW50ICYmIEluamVjdGVkTW91bnQuZ2V0Tm9kZSkpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIHRvcExldmVsVHlwZXMgPSBFdmVudENvbnN0YW50cy50b3BMZXZlbFR5cGVzO1xuXG5mdW5jdGlvbiBpc0VuZGlzaCh0b3BMZXZlbFR5cGUpIHtcbiAgcmV0dXJuIHRvcExldmVsVHlwZSA9PT0gdG9wTGV2ZWxUeXBlcy50b3BNb3VzZVVwIHx8XG4gICAgICAgICB0b3BMZXZlbFR5cGUgPT09IHRvcExldmVsVHlwZXMudG9wVG91Y2hFbmQgfHxcbiAgICAgICAgIHRvcExldmVsVHlwZSA9PT0gdG9wTGV2ZWxUeXBlcy50b3BUb3VjaENhbmNlbDtcbn1cblxuZnVuY3Rpb24gaXNNb3ZlaXNoKHRvcExldmVsVHlwZSkge1xuICByZXR1cm4gdG9wTGV2ZWxUeXBlID09PSB0b3BMZXZlbFR5cGVzLnRvcE1vdXNlTW92ZSB8fFxuICAgICAgICAgdG9wTGV2ZWxUeXBlID09PSB0b3BMZXZlbFR5cGVzLnRvcFRvdWNoTW92ZTtcbn1cbmZ1bmN0aW9uIGlzU3RhcnRpc2godG9wTGV2ZWxUeXBlKSB7XG4gIHJldHVybiB0b3BMZXZlbFR5cGUgPT09IHRvcExldmVsVHlwZXMudG9wTW91c2VEb3duIHx8XG4gICAgICAgICB0b3BMZXZlbFR5cGUgPT09IHRvcExldmVsVHlwZXMudG9wVG91Y2hTdGFydDtcbn1cblxuXG52YXIgdmFsaWRhdGVFdmVudERpc3BhdGNoZXM7XG5pZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gIHZhbGlkYXRlRXZlbnREaXNwYXRjaGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZGlzcGF0Y2hMaXN0ZW5lcnMgPSBldmVudC5fZGlzcGF0Y2hMaXN0ZW5lcnM7XG4gICAgdmFyIGRpc3BhdGNoSURzID0gZXZlbnQuX2Rpc3BhdGNoSURzO1xuXG4gICAgdmFyIGxpc3RlbmVyc0lzQXJyID0gQXJyYXkuaXNBcnJheShkaXNwYXRjaExpc3RlbmVycyk7XG4gICAgdmFyIGlkc0lzQXJyID0gQXJyYXkuaXNBcnJheShkaXNwYXRjaElEcyk7XG4gICAgdmFyIElEc0xlbiA9IGlkc0lzQXJyID8gZGlzcGF0Y2hJRHMubGVuZ3RoIDogZGlzcGF0Y2hJRHMgPyAxIDogMDtcbiAgICB2YXIgbGlzdGVuZXJzTGVuID0gbGlzdGVuZXJzSXNBcnIgP1xuICAgICAgZGlzcGF0Y2hMaXN0ZW5lcnMubGVuZ3RoIDpcbiAgICAgIGRpc3BhdGNoTGlzdGVuZXJzID8gMSA6IDA7XG5cbiAgICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgICAgaWRzSXNBcnIgPT09IGxpc3RlbmVyc0lzQXJyICYmIElEc0xlbiA9PT0gbGlzdGVuZXJzTGVuLFxuICAgICAgJ0V2ZW50UGx1Z2luVXRpbHM6IEludmFsaWQgYGV2ZW50YC4nXG4gICAgKSA6IGludmFyaWFudChpZHNJc0FyciA9PT0gbGlzdGVuZXJzSXNBcnIgJiYgSURzTGVuID09PSBsaXN0ZW5lcnNMZW4pKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjYihldmVudCwgbGlzdGVuZXIsIGlkKWAuIEF2b2lkcyB1c2luZyBjYWxsIGlmIG5vIHNjb3BlIGlzXG4gKiBwcm92aWRlZC4gVGhlIGAobGlzdGVuZXIsaWQpYCBwYWlyIGVmZmVjdGl2ZWx5IGZvcm1zIHRoZSBcImRpc3BhdGNoXCIgYnV0IGFyZVxuICoga2VwdCBzZXBhcmF0ZSB0byBjb25zZXJ2ZSBtZW1vcnkuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hFdmVudERpc3BhdGNoKGV2ZW50LCBjYikge1xuICB2YXIgZGlzcGF0Y2hMaXN0ZW5lcnMgPSBldmVudC5fZGlzcGF0Y2hMaXN0ZW5lcnM7XG4gIHZhciBkaXNwYXRjaElEcyA9IGV2ZW50Ll9kaXNwYXRjaElEcztcbiAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgIHZhbGlkYXRlRXZlbnREaXNwYXRjaGVzKGV2ZW50KTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShkaXNwYXRjaExpc3RlbmVycykpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BhdGNoTGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIExpc3RlbmVycyBhbmQgSURzIGFyZSB0d28gcGFyYWxsZWwgYXJyYXlzIHRoYXQgYXJlIGFsd2F5cyBpbiBzeW5jLlxuICAgICAgY2IoZXZlbnQsIGRpc3BhdGNoTGlzdGVuZXJzW2ldLCBkaXNwYXRjaElEc1tpXSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGRpc3BhdGNoTGlzdGVuZXJzKSB7XG4gICAgY2IoZXZlbnQsIGRpc3BhdGNoTGlzdGVuZXJzLCBkaXNwYXRjaElEcyk7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIFBsdWdpbk1vZHVsZS5leGVjdXRlRGlzcGF0Y2goKS5cbiAqIEBwYXJhbSB7U3ludGhldGljRXZlbnR9IFN5bnRoZXRpY0V2ZW50IHRvIGhhbmRsZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gQXBwbGljYXRpb24tbGV2ZWwgY2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBkb21JRCBET00gaWQgdG8gcGFzcyB0byB0aGUgY2FsbGJhY2suXG4gKi9cbmZ1bmN0aW9uIGV4ZWN1dGVEaXNwYXRjaChldmVudCwgbGlzdGVuZXIsIGRvbUlEKSB7XG4gIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBpbmplY3Rpb24uTW91bnQuZ2V0Tm9kZShkb21JRCk7XG4gIHZhciByZXR1cm5WYWx1ZSA9IGxpc3RlbmVyKGV2ZW50LCBkb21JRCk7XG4gIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuICByZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbi8qKlxuICogU3RhbmRhcmQvc2ltcGxlIGl0ZXJhdGlvbiB0aHJvdWdoIGFuIGV2ZW50J3MgY29sbGVjdGVkIGRpc3BhdGNoZXMuXG4gKi9cbmZ1bmN0aW9uIGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlcihldmVudCwgZXhlY3V0ZURpc3BhdGNoKSB7XG4gIGZvckVhY2hFdmVudERpc3BhdGNoKGV2ZW50LCBleGVjdXRlRGlzcGF0Y2gpO1xuICBldmVudC5fZGlzcGF0Y2hMaXN0ZW5lcnMgPSBudWxsO1xuICBldmVudC5fZGlzcGF0Y2hJRHMgPSBudWxsO1xufVxuXG4vKipcbiAqIFN0YW5kYXJkL3NpbXBsZSBpdGVyYXRpb24gdGhyb3VnaCBhbiBldmVudCdzIGNvbGxlY3RlZCBkaXNwYXRjaGVzLCBidXQgc3RvcHNcbiAqIGF0IHRoZSBmaXJzdCBkaXNwYXRjaCBleGVjdXRpb24gcmV0dXJuaW5nIHRydWUsIGFuZCByZXR1cm5zIHRoYXQgaWQuXG4gKlxuICogQHJldHVybiBpZCBvZiB0aGUgZmlyc3QgZGlzcGF0Y2ggZXhlY3V0aW9uIHdobydzIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSwgb3JcbiAqIG51bGwgaWYgbm8gbGlzdGVuZXIgcmV0dXJuZWQgdHJ1ZS5cbiAqL1xuZnVuY3Rpb24gZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyU3RvcEF0VHJ1ZUltcGwoZXZlbnQpIHtcbiAgdmFyIGRpc3BhdGNoTGlzdGVuZXJzID0gZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzO1xuICB2YXIgZGlzcGF0Y2hJRHMgPSBldmVudC5fZGlzcGF0Y2hJRHM7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICB2YWxpZGF0ZUV2ZW50RGlzcGF0Y2hlcyhldmVudCk7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoZGlzcGF0Y2hMaXN0ZW5lcnMpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXNwYXRjaExpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAvLyBMaXN0ZW5lcnMgYW5kIElEcyBhcmUgdHdvIHBhcmFsbGVsIGFycmF5cyB0aGF0IGFyZSBhbHdheXMgaW4gc3luYy5cbiAgICAgIGlmIChkaXNwYXRjaExpc3RlbmVyc1tpXShldmVudCwgZGlzcGF0Y2hJRHNbaV0pKSB7XG4gICAgICAgIHJldHVybiBkaXNwYXRjaElEc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZGlzcGF0Y2hMaXN0ZW5lcnMpIHtcbiAgICBpZiAoZGlzcGF0Y2hMaXN0ZW5lcnMoZXZlbnQsIGRpc3BhdGNoSURzKSkge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoSURzO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBAc2VlIGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlclN0b3BBdFRydWVJbXBsXG4gKi9cbmZ1bmN0aW9uIGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlclN0b3BBdFRydWUoZXZlbnQpIHtcbiAgdmFyIHJldCA9IGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlclN0b3BBdFRydWVJbXBsKGV2ZW50KTtcbiAgZXZlbnQuX2Rpc3BhdGNoSURzID0gbnVsbDtcbiAgZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzID0gbnVsbDtcbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBFeGVjdXRpb24gb2YgYSBcImRpcmVjdFwiIGRpc3BhdGNoIC0gdGhlcmUgbXVzdCBiZSBhdCBtb3N0IG9uZSBkaXNwYXRjaFxuICogYWNjdW11bGF0ZWQgb24gdGhlIGV2ZW50IG9yIGl0IGlzIGNvbnNpZGVyZWQgYW4gZXJyb3IuIEl0IGRvZXNuJ3QgcmVhbGx5IG1ha2VcbiAqIHNlbnNlIGZvciBhbiBldmVudCB3aXRoIG11bHRpcGxlIGRpc3BhdGNoZXMgKGJ1YmJsZWQpIHRvIGtlZXAgdHJhY2sgb2YgdGhlXG4gKiByZXR1cm4gdmFsdWVzIGF0IGVhY2ggZGlzcGF0Y2ggZXhlY3V0aW9uLCBidXQgaXQgZG9lcyB0ZW5kIHRvIG1ha2Ugc2Vuc2Ugd2hlblxuICogZGVhbGluZyB3aXRoIFwiZGlyZWN0XCIgZGlzcGF0Y2hlcy5cbiAqXG4gKiBAcmV0dXJuIFRoZSByZXR1cm4gdmFsdWUgb2YgZXhlY3V0aW5nIHRoZSBzaW5nbGUgZGlzcGF0Y2guXG4gKi9cbmZ1bmN0aW9uIGV4ZWN1dGVEaXJlY3REaXNwYXRjaChldmVudCkge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgdmFsaWRhdGVFdmVudERpc3BhdGNoZXMoZXZlbnQpO1xuICB9XG4gIHZhciBkaXNwYXRjaExpc3RlbmVyID0gZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzO1xuICB2YXIgZGlzcGF0Y2hJRCA9IGV2ZW50Ll9kaXNwYXRjaElEcztcbiAgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOViA/IGludmFyaWFudChcbiAgICAhQXJyYXkuaXNBcnJheShkaXNwYXRjaExpc3RlbmVyKSxcbiAgICAnZXhlY3V0ZURpcmVjdERpc3BhdGNoKC4uLik6IEludmFsaWQgYGV2ZW50YC4nXG4gICkgOiBpbnZhcmlhbnQoIUFycmF5LmlzQXJyYXkoZGlzcGF0Y2hMaXN0ZW5lcikpKTtcbiAgdmFyIHJlcyA9IGRpc3BhdGNoTGlzdGVuZXIgP1xuICAgIGRpc3BhdGNoTGlzdGVuZXIoZXZlbnQsIGRpc3BhdGNoSUQpIDpcbiAgICBudWxsO1xuICBldmVudC5fZGlzcGF0Y2hMaXN0ZW5lcnMgPSBudWxsO1xuICBldmVudC5fZGlzcGF0Y2hJRHMgPSBudWxsO1xuICByZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7U3ludGhldGljRXZlbnR9IGV2ZW50XG4gKiBAcmV0dXJuIHtib29sfSBUcnVlIGlmZiBudW1iZXIgb2YgZGlzcGF0Y2hlcyBhY2N1bXVsYXRlZCBpcyBncmVhdGVyIHRoYW4gMC5cbiAqL1xuZnVuY3Rpb24gaGFzRGlzcGF0Y2hlcyhldmVudCkge1xuICByZXR1cm4gISFldmVudC5fZGlzcGF0Y2hMaXN0ZW5lcnM7XG59XG5cbi8qKlxuICogR2VuZXJhbCB1dGlsaXRpZXMgdGhhdCBhcmUgdXNlZnVsIGluIGNyZWF0aW5nIGN1c3RvbSBFdmVudCBQbHVnaW5zLlxuICovXG52YXIgRXZlbnRQbHVnaW5VdGlscyA9IHtcbiAgaXNFbmRpc2g6IGlzRW5kaXNoLFxuICBpc01vdmVpc2g6IGlzTW92ZWlzaCxcbiAgaXNTdGFydGlzaDogaXNTdGFydGlzaCxcblxuICBleGVjdXRlRGlyZWN0RGlzcGF0Y2g6IGV4ZWN1dGVEaXJlY3REaXNwYXRjaCxcbiAgZXhlY3V0ZURpc3BhdGNoOiBleGVjdXRlRGlzcGF0Y2gsXG4gIGV4ZWN1dGVEaXNwYXRjaGVzSW5PcmRlcjogZXhlY3V0ZURpc3BhdGNoZXNJbk9yZGVyLFxuICBleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlOiBleGVjdXRlRGlzcGF0Y2hlc0luT3JkZXJTdG9wQXRUcnVlLFxuICBoYXNEaXNwYXRjaGVzOiBoYXNEaXNwYXRjaGVzLFxuICBpbmplY3Rpb246IGluamVjdGlvbixcbiAgdXNlVG91Y2hFdmVudHM6IGZhbHNlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50UGx1Z2luVXRpbHM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXZlbnRQcm9wYWdhdG9yc1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgRXZlbnRDb25zdGFudHMgPSByZXF1aXJlKFwiLi9FdmVudENvbnN0YW50c1wiKTtcbnZhciBFdmVudFBsdWdpbkh1YiA9IHJlcXVpcmUoXCIuL0V2ZW50UGx1Z2luSHViXCIpO1xuXG52YXIgYWNjdW11bGF0ZUludG8gPSByZXF1aXJlKFwiLi9hY2N1bXVsYXRlSW50b1wiKTtcbnZhciBmb3JFYWNoQWNjdW11bGF0ZWQgPSByZXF1aXJlKFwiLi9mb3JFYWNoQWNjdW11bGF0ZWRcIik7XG5cbnZhciBQcm9wYWdhdGlvblBoYXNlcyA9IEV2ZW50Q29uc3RhbnRzLlByb3BhZ2F0aW9uUGhhc2VzO1xudmFyIGdldExpc3RlbmVyID0gRXZlbnRQbHVnaW5IdWIuZ2V0TGlzdGVuZXI7XG5cbi8qKlxuICogU29tZSBldmVudCB0eXBlcyBoYXZlIGEgbm90aW9uIG9mIGRpZmZlcmVudCByZWdpc3RyYXRpb24gbmFtZXMgZm9yIGRpZmZlcmVudFxuICogXCJwaGFzZXNcIiBvZiBwcm9wYWdhdGlvbi4gVGhpcyBmaW5kcyBsaXN0ZW5lcnMgYnkgYSBnaXZlbiBwaGFzZS5cbiAqL1xuZnVuY3Rpb24gbGlzdGVuZXJBdFBoYXNlKGlkLCBldmVudCwgcHJvcGFnYXRpb25QaGFzZSkge1xuICB2YXIgcmVnaXN0cmF0aW9uTmFtZSA9XG4gICAgZXZlbnQuZGlzcGF0Y2hDb25maWcucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXNbcHJvcGFnYXRpb25QaGFzZV07XG4gIHJldHVybiBnZXRMaXN0ZW5lcihpZCwgcmVnaXN0cmF0aW9uTmFtZSk7XG59XG5cbi8qKlxuICogVGFncyBhIGBTeW50aGV0aWNFdmVudGAgd2l0aCBkaXNwYXRjaGVkIGxpc3RlbmVycy4gQ3JlYXRpbmcgdGhpcyBmdW5jdGlvblxuICogaGVyZSwgYWxsb3dzIHVzIHRvIG5vdCBoYXZlIHRvIGJpbmQgb3IgY3JlYXRlIGZ1bmN0aW9ucyBmb3IgZWFjaCBldmVudC5cbiAqIE11dGF0aW5nIHRoZSBldmVudCdzIG1lbWJlcnMgYWxsb3dzIHVzIHRvIG5vdCBoYXZlIHRvIGNyZWF0ZSBhIHdyYXBwaW5nXG4gKiBcImRpc3BhdGNoXCIgb2JqZWN0IHRoYXQgcGFpcnMgdGhlIGV2ZW50IHdpdGggdGhlIGxpc3RlbmVyLlxuICovXG5mdW5jdGlvbiBhY2N1bXVsYXRlRGlyZWN0aW9uYWxEaXNwYXRjaGVzKGRvbUlELCB1cHdhcmRzLCBldmVudCkge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKCFkb21JRCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXNwYXRjaGluZyBpZCBtdXN0IG5vdCBiZSBudWxsJyk7XG4gICAgfVxuICB9XG4gIHZhciBwaGFzZSA9IHVwd2FyZHMgPyBQcm9wYWdhdGlvblBoYXNlcy5idWJibGVkIDogUHJvcGFnYXRpb25QaGFzZXMuY2FwdHVyZWQ7XG4gIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyQXRQaGFzZShkb21JRCwgZXZlbnQsIHBoYXNlKTtcbiAgaWYgKGxpc3RlbmVyKSB7XG4gICAgZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzID1cbiAgICAgIGFjY3VtdWxhdGVJbnRvKGV2ZW50Ll9kaXNwYXRjaExpc3RlbmVycywgbGlzdGVuZXIpO1xuICAgIGV2ZW50Ll9kaXNwYXRjaElEcyA9IGFjY3VtdWxhdGVJbnRvKGV2ZW50Ll9kaXNwYXRjaElEcywgZG9tSUQpO1xuICB9XG59XG5cbi8qKlxuICogQ29sbGVjdCBkaXNwYXRjaGVzIChtdXN0IGJlIGVudGlyZWx5IGNvbGxlY3RlZCBiZWZvcmUgZGlzcGF0Y2hpbmcgLSBzZWUgdW5pdFxuICogdGVzdHMpLiBMYXppbHkgYWxsb2NhdGUgdGhlIGFycmF5IHRvIGNvbnNlcnZlIG1lbW9yeS4gIFdlIG11c3QgbG9vcCB0aHJvdWdoXG4gKiBlYWNoIGV2ZW50IGFuZCBwZXJmb3JtIHRoZSB0cmF2ZXJzYWwgZm9yIGVhY2ggb25lLiBXZSBjYW4gbm90IHBlcmZvcm0gYVxuICogc2luZ2xlIHRyYXZlcnNhbCBmb3IgdGhlIGVudGlyZSBjb2xsZWN0aW9uIG9mIGV2ZW50cyBiZWNhdXNlIGVhY2ggZXZlbnQgbWF5XG4gKiBoYXZlIGEgZGlmZmVyZW50IHRhcmdldC5cbiAqL1xuZnVuY3Rpb24gYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlc1NpbmdsZShldmVudCkge1xuICBpZiAoZXZlbnQgJiYgZXZlbnQuZGlzcGF0Y2hDb25maWcucGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMpIHtcbiAgICBFdmVudFBsdWdpbkh1Yi5pbmplY3Rpb24uZ2V0SW5zdGFuY2VIYW5kbGUoKS50cmF2ZXJzZVR3b1BoYXNlKFxuICAgICAgZXZlbnQuZGlzcGF0Y2hNYXJrZXIsXG4gICAgICBhY2N1bXVsYXRlRGlyZWN0aW9uYWxEaXNwYXRjaGVzLFxuICAgICAgZXZlbnRcbiAgICApO1xuICB9XG59XG5cblxuLyoqXG4gKiBBY2N1bXVsYXRlcyB3aXRob3V0IHJlZ2FyZCB0byBkaXJlY3Rpb24sIGRvZXMgbm90IGxvb2sgZm9yIHBoYXNlZFxuICogcmVnaXN0cmF0aW9uIG5hbWVzLiBTYW1lIGFzIGBhY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlc1NpbmdsZWAgYnV0IHdpdGhvdXRcbiAqIHJlcXVpcmluZyB0aGF0IHRoZSBgZGlzcGF0Y2hNYXJrZXJgIGJlIHRoZSBzYW1lIGFzIHRoZSBkaXNwYXRjaGVkIElELlxuICovXG5mdW5jdGlvbiBhY2N1bXVsYXRlRGlzcGF0Y2hlcyhpZCwgaWdub3JlZERpcmVjdGlvbiwgZXZlbnQpIHtcbiAgaWYgKGV2ZW50ICYmIGV2ZW50LmRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWUpIHtcbiAgICB2YXIgcmVnaXN0cmF0aW9uTmFtZSA9IGV2ZW50LmRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWU7XG4gICAgdmFyIGxpc3RlbmVyID0gZ2V0TGlzdGVuZXIoaWQsIHJlZ2lzdHJhdGlvbk5hbWUpO1xuICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzID1cbiAgICAgICAgYWNjdW11bGF0ZUludG8oZXZlbnQuX2Rpc3BhdGNoTGlzdGVuZXJzLCBsaXN0ZW5lcik7XG4gICAgICBldmVudC5fZGlzcGF0Y2hJRHMgPSBhY2N1bXVsYXRlSW50byhldmVudC5fZGlzcGF0Y2hJRHMsIGlkKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2N1bXVsYXRlcyBkaXNwYXRjaGVzIG9uIGFuIGBTeW50aGV0aWNFdmVudGAsIGJ1dCBvbmx5IGZvciB0aGVcbiAqIGBkaXNwYXRjaE1hcmtlcmAuXG4gKiBAcGFyYW0ge1N5bnRoZXRpY0V2ZW50fSBldmVudFxuICovXG5mdW5jdGlvbiBhY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlc1NpbmdsZShldmVudCkge1xuICBpZiAoZXZlbnQgJiYgZXZlbnQuZGlzcGF0Y2hDb25maWcucmVnaXN0cmF0aW9uTmFtZSkge1xuICAgIGFjY3VtdWxhdGVEaXNwYXRjaGVzKGV2ZW50LmRpc3BhdGNoTWFya2VyLCBudWxsLCBldmVudCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlcyhldmVudHMpIHtcbiAgZm9yRWFjaEFjY3VtdWxhdGVkKGV2ZW50cywgYWNjdW11bGF0ZVR3b1BoYXNlRGlzcGF0Y2hlc1NpbmdsZSk7XG59XG5cbmZ1bmN0aW9uIGFjY3VtdWxhdGVFbnRlckxlYXZlRGlzcGF0Y2hlcyhsZWF2ZSwgZW50ZXIsIGZyb21JRCwgdG9JRCkge1xuICBFdmVudFBsdWdpbkh1Yi5pbmplY3Rpb24uZ2V0SW5zdGFuY2VIYW5kbGUoKS50cmF2ZXJzZUVudGVyTGVhdmUoXG4gICAgZnJvbUlELFxuICAgIHRvSUQsXG4gICAgYWNjdW11bGF0ZURpc3BhdGNoZXMsXG4gICAgbGVhdmUsXG4gICAgZW50ZXJcbiAgKTtcbn1cblxuXG5mdW5jdGlvbiBhY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlcyhldmVudHMpIHtcbiAgZm9yRWFjaEFjY3VtdWxhdGVkKGV2ZW50cywgYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXNTaW5nbGUpO1xufVxuXG5cblxuLyoqXG4gKiBBIHNtYWxsIHNldCBvZiBwcm9wYWdhdGlvbiBwYXR0ZXJucywgZWFjaCBvZiB3aGljaCB3aWxsIGFjY2VwdCBhIHNtYWxsIGFtb3VudFxuICogb2YgaW5mb3JtYXRpb24sIGFuZCBnZW5lcmF0ZSBhIHNldCBvZiBcImRpc3BhdGNoIHJlYWR5IGV2ZW50IG9iamVjdHNcIiAtIHdoaWNoXG4gKiBhcmUgc2V0cyBvZiBldmVudHMgdGhhdCBoYXZlIGFscmVhZHkgYmVlbiBhbm5vdGF0ZWQgd2l0aCBhIHNldCBvZiBkaXNwYXRjaGVkXG4gKiBsaXN0ZW5lciBmdW5jdGlvbnMvaWRzLiBUaGUgQVBJIGlzIGRlc2lnbmVkIHRoaXMgd2F5IHRvIGRpc2NvdXJhZ2UgdGhlc2VcbiAqIHByb3BhZ2F0aW9uIHN0cmF0ZWdpZXMgZnJvbSBhY3R1YWxseSBleGVjdXRpbmcgdGhlIGRpc3BhdGNoZXMsIHNpbmNlIHdlXG4gKiBhbHdheXMgd2FudCB0byBjb2xsZWN0IHRoZSBlbnRpcmUgc2V0IG9mIGRpc3BhdGNoZXMgYmVmb3JlIGV4ZWN1dGluZyBldmVudCBhXG4gKiBzaW5nbGUgb25lLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBFdmVudFByb3BhZ2F0b3JzXG4gKi9cbnZhciBFdmVudFByb3BhZ2F0b3JzID0ge1xuICBhY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzOiBhY2N1bXVsYXRlVHdvUGhhc2VEaXNwYXRjaGVzLFxuICBhY2N1bXVsYXRlRGlyZWN0RGlzcGF0Y2hlczogYWNjdW11bGF0ZURpcmVjdERpc3BhdGNoZXMsXG4gIGFjY3VtdWxhdGVFbnRlckxlYXZlRGlzcGF0Y2hlczogYWNjdW11bGF0ZUVudGVyTGVhdmVEaXNwYXRjaGVzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50UHJvcGFnYXRvcnM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIE9iamVjdC5hc3NpZ25cbiAqL1xuXG4vLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtb2JqZWN0LmFzc2lnblxuXG5mdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2VzKSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gdGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgbmV4dEluZGV4ID0gMTsgbmV4dEluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgbmV4dEluZGV4KyspIHtcbiAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3VtZW50c1tuZXh0SW5kZXhdO1xuICAgIGlmIChuZXh0U291cmNlID09IG51bGwpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBmcm9tID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgLy8gV2UgZG9uJ3QgY3VycmVudGx5IHN1cHBvcnQgYWNjZXNzb3JzIG5vciBwcm94aWVzLiBUaGVyZWZvcmUgdGhpc1xuICAgIC8vIGNvcHkgY2Fubm90IHRocm93LiBJZiB3ZSBldmVyIHN1cHBvcnRlZCB0aGlzIHRoZW4gd2UgbXVzdCBoYW5kbGVcbiAgICAvLyBleGNlcHRpb25zIGFuZCBzaWRlLWVmZmVjdHMuIFdlIGRvbid0IHN1cHBvcnQgc3ltYm9scyBzbyB0aGV5IHdvbid0XG4gICAgLy8gYmUgdHJhbnNmZXJyZWQuXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzaWduO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFBvb2xlZENsYXNzXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwiLi9pbnZhcmlhbnRcIik7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24oY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24oYTEsIGEyKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMik7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyKTtcbiAgfVxufTtcblxudmFyIHRocmVlQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbihhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZml2ZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24oYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMywgYTQsIGE1KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbihpbnN0YW5jZSkge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgIGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MsXG4gICAgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJ1xuICApIDogaW52YXJpYW50KGluc3RhbmNlIGluc3RhbmNlb2YgS2xhc3MpKTtcbiAgaWYgKGluc3RhbmNlLmRlc3RydWN0b3IpIHtcbiAgICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIH1cbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGggPCBLbGFzcy5wb29sU2l6ZSkge1xuICAgIEtsYXNzLmluc3RhbmNlUG9vbC5wdXNoKGluc3RhbmNlKTtcbiAgfVxufTtcblxudmFyIERFRkFVTFRfUE9PTF9TSVpFID0gMTA7XG52YXIgREVGQVVMVF9QT09MRVIgPSBvbmVBcmd1bWVudFBvb2xlcjtcblxuLyoqXG4gKiBBdWdtZW50cyBgQ29weUNvbnN0cnVjdG9yYCB0byBiZSBhIHBvb2xhYmxlIGNsYXNzLCBhdWdtZW50aW5nIG9ubHkgdGhlIGNsYXNzXG4gKiBpdHNlbGYgKHN0YXRpY2FsbHkpIG5vdCBhZGRpbmcgYW55IHByb3RvdHlwaWNhbCBmaWVsZHMuIEFueSBDb3B5Q29uc3RydWN0b3JcbiAqIHlvdSBnaXZlIHRoaXMgbWF5IGhhdmUgYSBgcG9vbFNpemVgIHByb3BlcnR5LCBhbmQgd2lsbCBsb29rIGZvciBhXG4gKiBwcm90b3R5cGljYWwgYGRlc3RydWN0b3JgIG9uIGluc3RhbmNlcyAob3B0aW9uYWwpLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbihDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICB2YXIgTmV3S2xhc3MgPSBDb3B5Q29uc3RydWN0b3I7XG4gIE5ld0tsYXNzLmluc3RhbmNlUG9vbCA9IFtdO1xuICBOZXdLbGFzcy5nZXRQb29sZWQgPSBwb29sZXIgfHwgREVGQVVMVF9QT09MRVI7XG4gIGlmICghTmV3S2xhc3MucG9vbFNpemUpIHtcbiAgICBOZXdLbGFzcy5wb29sU2l6ZSA9IERFRkFVTFRfUE9PTF9TSVpFO1xuICB9XG4gIE5ld0tsYXNzLnJlbGVhc2UgPSBzdGFuZGFyZFJlbGVhc2VyO1xuICByZXR1cm4gTmV3S2xhc3M7XG59O1xuXG52YXIgUG9vbGVkQ2xhc3MgPSB7XG4gIGFkZFBvb2xpbmdUbzogYWRkUG9vbGluZ1RvLFxuICBvbmVBcmd1bWVudFBvb2xlcjogb25lQXJndW1lbnRQb29sZXIsXG4gIHR3b0FyZ3VtZW50UG9vbGVyOiB0d29Bcmd1bWVudFBvb2xlcixcbiAgdGhyZWVBcmd1bWVudFBvb2xlcjogdGhyZWVBcmd1bWVudFBvb2xlcixcbiAgZml2ZUFyZ3VtZW50UG9vbGVyOiBmaXZlQXJndW1lbnRQb29sZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUG9vbGVkQ2xhc3M7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgU3ludGhldGljRXZlbnRcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBQb29sZWRDbGFzcyA9IHJlcXVpcmUoXCIuL1Bvb2xlZENsYXNzXCIpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZShcIi4vT2JqZWN0LmFzc2lnblwiKTtcbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZShcIi4vZW1wdHlGdW5jdGlvblwiKTtcbnZhciBnZXRFdmVudFRhcmdldCA9IHJlcXVpcmUoXCIuL2dldEV2ZW50VGFyZ2V0XCIpO1xuXG4vKipcbiAqIEBpbnRlcmZhY2UgRXZlbnRcbiAqIEBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzL1xuICovXG52YXIgRXZlbnRJbnRlcmZhY2UgPSB7XG4gIHR5cGU6IG51bGwsXG4gIHRhcmdldDogZ2V0RXZlbnRUYXJnZXQsXG4gIC8vIGN1cnJlbnRUYXJnZXQgaXMgc2V0IHdoZW4gZGlzcGF0Y2hpbmc7IG5vIHVzZSBpbiBjb3B5aW5nIGl0IGhlcmVcbiAgY3VycmVudFRhcmdldDogZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwsXG4gIGV2ZW50UGhhc2U6IG51bGwsXG4gIGJ1YmJsZXM6IG51bGwsXG4gIGNhbmNlbGFibGU6IG51bGwsXG4gIHRpbWVTdGFtcDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnQudGltZVN0YW1wIHx8IERhdGUubm93KCk7XG4gIH0sXG4gIGRlZmF1bHRQcmV2ZW50ZWQ6IG51bGwsXG4gIGlzVHJ1c3RlZDogbnVsbFxufTtcblxuLyoqXG4gKiBTeW50aGV0aWMgZXZlbnRzIGFyZSBkaXNwYXRjaGVkIGJ5IGV2ZW50IHBsdWdpbnMsIHR5cGljYWxseSBpbiByZXNwb25zZSB0byBhXG4gKiB0b3AtbGV2ZWwgZXZlbnQgZGVsZWdhdGlvbiBoYW5kbGVyLlxuICpcbiAqIFRoZXNlIHN5c3RlbXMgc2hvdWxkIGdlbmVyYWxseSB1c2UgcG9vbGluZyB0byByZWR1Y2UgdGhlIGZyZXF1ZW5jeSBvZiBnYXJiYWdlXG4gKiBjb2xsZWN0aW9uLiBUaGUgc3lzdGVtIHNob3VsZCBjaGVjayBgaXNQZXJzaXN0ZW50YCB0byBkZXRlcm1pbmUgd2hldGhlciB0aGVcbiAqIGV2ZW50IHNob3VsZCBiZSByZWxlYXNlZCBpbnRvIHRoZSBwb29sIGFmdGVyIGJlaW5nIGRpc3BhdGNoZWQuIFVzZXJzIHRoYXRcbiAqIG5lZWQgYSBwZXJzaXN0ZWQgZXZlbnQgc2hvdWxkIGludm9rZSBgcGVyc2lzdGAuXG4gKlxuICogU3ludGhldGljIGV2ZW50cyAoYW5kIHN1YmNsYXNzZXMpIGltcGxlbWVudCB0aGUgRE9NIExldmVsIDMgRXZlbnRzIEFQSSBieVxuICogbm9ybWFsaXppbmcgYnJvd3NlciBxdWlya3MuIFN1YmNsYXNzZXMgZG8gbm90IG5lY2Vzc2FyaWx5IGhhdmUgdG8gaW1wbGVtZW50IGFcbiAqIERPTSBpbnRlcmZhY2U7IGN1c3RvbSBhcHBsaWNhdGlvbi1zcGVjaWZpYyBldmVudHMgY2FuIGFsc28gc3ViY2xhc3MgdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGlzcGF0Y2hDb25maWcgQ29uZmlndXJhdGlvbiB1c2VkIHRvIGRpc3BhdGNoIHRoaXMgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hNYXJrZXIgTWFya2VyIGlkZW50aWZ5aW5nIHRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKi9cbmZ1bmN0aW9uIFN5bnRoZXRpY0V2ZW50KGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQpIHtcbiAgdGhpcy5kaXNwYXRjaENvbmZpZyA9IGRpc3BhdGNoQ29uZmlnO1xuICB0aGlzLmRpc3BhdGNoTWFya2VyID0gZGlzcGF0Y2hNYXJrZXI7XG4gIHRoaXMubmF0aXZlRXZlbnQgPSBuYXRpdmVFdmVudDtcblxuICB2YXIgSW50ZXJmYWNlID0gdGhpcy5jb25zdHJ1Y3Rvci5JbnRlcmZhY2U7XG4gIGZvciAodmFyIHByb3BOYW1lIGluIEludGVyZmFjZSkge1xuICAgIGlmICghSW50ZXJmYWNlLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBub3JtYWxpemUgPSBJbnRlcmZhY2VbcHJvcE5hbWVdO1xuICAgIGlmIChub3JtYWxpemUpIHtcbiAgICAgIHRoaXNbcHJvcE5hbWVdID0gbm9ybWFsaXplKG5hdGl2ZUV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpc1twcm9wTmFtZV0gPSBuYXRpdmVFdmVudFtwcm9wTmFtZV07XG4gICAgfVxuICB9XG5cbiAgdmFyIGRlZmF1bHRQcmV2ZW50ZWQgPSBuYXRpdmVFdmVudC5kZWZhdWx0UHJldmVudGVkICE9IG51bGwgP1xuICAgIG5hdGl2ZUV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQgOlxuICAgIG5hdGl2ZUV2ZW50LnJldHVyblZhbHVlID09PSBmYWxzZTtcbiAgaWYgKGRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICB0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlO1xuICB9XG4gIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2U7XG59XG5cbmFzc2lnbihTeW50aGV0aWNFdmVudC5wcm90b3R5cGUsIHtcblxuICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kZWZhdWx0UHJldmVudGVkID0gdHJ1ZTtcbiAgICB2YXIgZXZlbnQgPSB0aGlzLm5hdGl2ZUV2ZW50O1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID8gZXZlbnQucHJldmVudERlZmF1bHQoKSA6IGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQgPSBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZTtcbiAgfSxcblxuICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IHRoaXMubmF0aXZlRXZlbnQ7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCkgOiBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogV2UgcmVsZWFzZSBhbGwgZGlzcGF0Y2hlZCBgU3ludGhldGljRXZlbnRgcyBhZnRlciBlYWNoIGV2ZW50IGxvb3AsIGFkZGluZ1xuICAgKiB0aGVtIGJhY2sgaW50byB0aGUgcG9vbC4gVGhpcyBhbGxvd3MgYSB3YXkgdG8gaG9sZCBvbnRvIGEgcmVmZXJlbmNlIHRoYXRcbiAgICogd29uJ3QgYmUgYWRkZWQgYmFjayBpbnRvIHRoZSBwb29sLlxuICAgKi9cbiAgcGVyc2lzdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pc1BlcnNpc3RlbnQgPSBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoaXMgZXZlbnQgc2hvdWxkIGJlIHJlbGVhc2VkIGJhY2sgaW50byB0aGUgcG9vbC5cbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGlzIHNob3VsZCBub3QgYmUgcmVsZWFzZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIGlzUGVyc2lzdGVudDogZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlLFxuXG4gIC8qKlxuICAgKiBgUG9vbGVkQ2xhc3NgIGxvb2tzIGZvciBgZGVzdHJ1Y3RvcmAgb24gZWFjaCBpbnN0YW5jZSBpdCByZWxlYXNlcy5cbiAgICovXG4gIGRlc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBJbnRlcmZhY2UgPSB0aGlzLmNvbnN0cnVjdG9yLkludGVyZmFjZTtcbiAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBJbnRlcmZhY2UpIHtcbiAgICAgIHRoaXNbcHJvcE5hbWVdID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaENvbmZpZyA9IG51bGw7XG4gICAgdGhpcy5kaXNwYXRjaE1hcmtlciA9IG51bGw7XG4gICAgdGhpcy5uYXRpdmVFdmVudCA9IG51bGw7XG4gIH1cblxufSk7XG5cblN5bnRoZXRpY0V2ZW50LkludGVyZmFjZSA9IEV2ZW50SW50ZXJmYWNlO1xuXG4vKipcbiAqIEhlbHBlciB0byByZWR1Y2UgYm9pbGVycGxhdGUgd2hlbiBjcmVhdGluZyBzdWJjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IENsYXNzXG4gKiBAcGFyYW0gez9vYmplY3R9IEludGVyZmFjZVxuICovXG5TeW50aGV0aWNFdmVudC5hdWdtZW50Q2xhc3MgPSBmdW5jdGlvbihDbGFzcywgSW50ZXJmYWNlKSB7XG4gIHZhciBTdXBlciA9IHRoaXM7XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgYXNzaWduKHByb3RvdHlwZSwgQ2xhc3MucHJvdG90eXBlKTtcbiAgQ2xhc3MucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDbGFzcztcblxuICBDbGFzcy5JbnRlcmZhY2UgPSBhc3NpZ24oe30sIFN1cGVyLkludGVyZmFjZSwgSW50ZXJmYWNlKTtcbiAgQ2xhc3MuYXVnbWVudENsYXNzID0gU3VwZXIuYXVnbWVudENsYXNzO1xuXG4gIFBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhDbGFzcywgUG9vbGVkQ2xhc3MudGhyZWVBcmd1bWVudFBvb2xlcik7XG59O1xuXG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oU3ludGhldGljRXZlbnQsIFBvb2xlZENsYXNzLnRocmVlQXJndW1lbnRQb29sZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bnRoZXRpY0V2ZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFN5bnRoZXRpY1VJRXZlbnRcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBTeW50aGV0aWNFdmVudCA9IHJlcXVpcmUoXCIuL1N5bnRoZXRpY0V2ZW50XCIpO1xuXG52YXIgZ2V0RXZlbnRUYXJnZXQgPSByZXF1aXJlKFwiLi9nZXRFdmVudFRhcmdldFwiKTtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIFVJRXZlbnRcbiAqIEBzZWUgaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzL1xuICovXG52YXIgVUlFdmVudEludGVyZmFjZSA9IHtcbiAgdmlldzogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudmlldykge1xuICAgICAgcmV0dXJuIGV2ZW50LnZpZXc7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldCA9IGdldEV2ZW50VGFyZ2V0KGV2ZW50KTtcbiAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgdGFyZ2V0LndpbmRvdyA9PT0gdGFyZ2V0KSB7XG4gICAgICAvLyB0YXJnZXQgaXMgYSB3aW5kb3cgb2JqZWN0XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHZhciBkb2MgPSB0YXJnZXQub3duZXJEb2N1bWVudDtcbiAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IHdoeSBgb3duZXJEb2N1bWVudGAgaXMgc29tZXRpbWVzIHVuZGVmaW5lZCBpbiBJRTguXG4gICAgaWYgKGRvYykge1xuICAgICAgcmV0dXJuIGRvYy5kZWZhdWx0VmlldyB8fCBkb2MucGFyZW50V2luZG93O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgfSxcbiAgZGV0YWlsOiBmdW5jdGlvbihldmVudCkge1xuICAgIHJldHVybiBldmVudC5kZXRhaWwgfHwgMDtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gZGlzcGF0Y2hDb25maWcgQ29uZmlndXJhdGlvbiB1c2VkIHRvIGRpc3BhdGNoIHRoaXMgZXZlbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGF0Y2hNYXJrZXIgTWFya2VyIGlkZW50aWZ5aW5nIHRoZSBldmVudCB0YXJnZXQuXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKiBAZXh0ZW5kcyB7U3ludGhldGljRXZlbnR9XG4gKi9cbmZ1bmN0aW9uIFN5bnRoZXRpY1VJRXZlbnQoZGlzcGF0Y2hDb25maWcsIGRpc3BhdGNoTWFya2VyLCBuYXRpdmVFdmVudCkge1xuICBTeW50aGV0aWNFdmVudC5jYWxsKHRoaXMsIGRpc3BhdGNoQ29uZmlnLCBkaXNwYXRjaE1hcmtlciwgbmF0aXZlRXZlbnQpO1xufVxuXG5TeW50aGV0aWNFdmVudC5hdWdtZW50Q2xhc3MoU3ludGhldGljVUlFdmVudCwgVUlFdmVudEludGVyZmFjZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ludGhldGljVUlFdmVudDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBWaWV3cG9ydE1ldHJpY3NcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGdldFVuYm91bmRlZFNjcm9sbFBvc2l0aW9uID0gcmVxdWlyZShcIi4vZ2V0VW5ib3VuZGVkU2Nyb2xsUG9zaXRpb25cIik7XG5cbnZhciBWaWV3cG9ydE1ldHJpY3MgPSB7XG5cbiAgY3VycmVudFNjcm9sbExlZnQ6IDAsXG5cbiAgY3VycmVudFNjcm9sbFRvcDogMCxcblxuICByZWZyZXNoU2Nyb2xsVmFsdWVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2Nyb2xsUG9zaXRpb24gPSBnZXRVbmJvdW5kZWRTY3JvbGxQb3NpdGlvbih3aW5kb3cpO1xuICAgIFZpZXdwb3J0TWV0cmljcy5jdXJyZW50U2Nyb2xsTGVmdCA9IHNjcm9sbFBvc2l0aW9uLng7XG4gICAgVmlld3BvcnRNZXRyaWNzLmN1cnJlbnRTY3JvbGxUb3AgPSBzY3JvbGxQb3NpdGlvbi55O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVmlld3BvcnRNZXRyaWNzO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBhY2N1bXVsYXRlSW50b1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZShcIi4vaW52YXJpYW50XCIpO1xuXG4vKipcbiAqXG4gKiBBY2N1bXVsYXRlcyBpdGVtcyB0aGF0IG11c3Qgbm90IGJlIG51bGwgb3IgdW5kZWZpbmVkIGludG8gdGhlIGZpcnN0IG9uZS4gVGhpc1xuICogaXMgdXNlZCB0byBjb25zZXJ2ZSBtZW1vcnkgYnkgYXZvaWRpbmcgYXJyYXkgYWxsb2NhdGlvbnMsIGFuZCB0aHVzIHNhY3JpZmljZXNcbiAqIEFQSSBjbGVhbm5lc3MuIFNpbmNlIGBjdXJyZW50YCBjYW4gYmUgbnVsbCBiZWZvcmUgYmVpbmcgcGFzc2VkIGluIGFuZCBub3RcbiAqIG51bGwgYWZ0ZXIgdGhpcyBmdW5jdGlvbiwgbWFrZSBzdXJlIHRvIGFzc2lnbiBpdCBiYWNrIHRvIGBjdXJyZW50YDpcbiAqXG4gKiBgYSA9IGFjY3VtdWxhdGVJbnRvKGEsIGIpO2BcbiAqXG4gKiBUaGlzIEFQSSBzaG91bGQgYmUgc3BhcmluZ2x5IHVzZWQuIFRyeSBgYWNjdW11bGF0ZWAgZm9yIHNvbWV0aGluZyBjbGVhbmVyLlxuICpcbiAqIEByZXR1cm4geyp8YXJyYXk8Kj59IEFuIGFjY3VtdWxhdGlvbiBvZiBpdGVtcy5cbiAqL1xuXG5mdW5jdGlvbiBhY2N1bXVsYXRlSW50byhjdXJyZW50LCBuZXh0KSB7XG4gIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPyBpbnZhcmlhbnQoXG4gICAgbmV4dCAhPSBudWxsLFxuICAgICdhY2N1bXVsYXRlSW50byguLi4pOiBBY2N1bXVsYXRlZCBpdGVtcyBtdXN0IG5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC4nXG4gICkgOiBpbnZhcmlhbnQobmV4dCAhPSBudWxsKSk7XG4gIGlmIChjdXJyZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuXG4gIC8vIEJvdGggYXJlIG5vdCBlbXB0eS4gV2FybmluZzogTmV2ZXIgY2FsbCB4LmNvbmNhdCh5KSB3aGVuIHlvdSBhcmUgbm90XG4gIC8vIGNlcnRhaW4gdGhhdCB4IGlzIGFuIEFycmF5ICh4IGNvdWxkIGJlIGEgc3RyaW5nIHdpdGggY29uY2F0IG1ldGhvZCkuXG4gIHZhciBjdXJyZW50SXNBcnJheSA9IEFycmF5LmlzQXJyYXkoY3VycmVudCk7XG4gIHZhciBuZXh0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkobmV4dCk7XG5cbiAgaWYgKGN1cnJlbnRJc0FycmF5ICYmIG5leHRJc0FycmF5KSB7XG4gICAgY3VycmVudC5wdXNoLmFwcGx5KGN1cnJlbnQsIG5leHQpO1xuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgaWYgKGN1cnJlbnRJc0FycmF5KSB7XG4gICAgY3VycmVudC5wdXNoKG5leHQpO1xuICAgIHJldHVybiBjdXJyZW50O1xuICB9XG5cbiAgaWYgKG5leHRJc0FycmF5KSB7XG4gICAgLy8gQSBiaXQgdG9vIGRhbmdlcm91cyB0byBtdXRhdGUgYG5leHRgLlxuICAgIHJldHVybiBbY3VycmVudF0uY29uY2F0KG5leHQpO1xuICB9XG5cbiAgcmV0dXJuIFtjdXJyZW50LCBuZXh0XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhY2N1bXVsYXRlSW50bztcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjb3B5UHJvcGVydGllc1xuICovXG5cbi8qKlxuICogQ29weSBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgb2JqZWN0cyAodXAgdG8gNSkgaW50byB0aGUgZmlyc3Qgb2JqZWN0LlxuICogVGhpcyBpcyBhIHNoYWxsb3cgY29weS4gSXQgbXV0YXRlcyB0aGUgZmlyc3Qgb2JqZWN0IGFuZCBhbHNvIHJldHVybnMgaXQuXG4gKlxuICogTk9URTogYGFyZ3VtZW50c2AgaGFzIGEgdmVyeSBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBwZW5hbHR5LCB3aGljaCBpcyB3aHlcbiAqIHdlIGRvbid0IHN1cHBvcnQgdW5saW1pdGVkIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gY29weVByb3BlcnRpZXMob2JqLCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIG9iaiA9IG9iaiB8fCB7fTtcblxuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKGYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVG9vIG1hbnkgYXJndW1lbnRzIHBhc3NlZCB0byBjb3B5UHJvcGVydGllcycpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGVdO1xuICB2YXIgaWkgPSAwLCB2O1xuICB3aGlsZSAoYXJnc1tpaV0pIHtcbiAgICB2ID0gYXJnc1tpaSsrXTtcbiAgICBmb3IgKHZhciBrIGluIHYpIHtcbiAgICAgIG9ialtrXSA9IHZba107XG4gICAgfVxuXG4gICAgLy8gSUUgaWdub3JlcyB0b1N0cmluZyBpbiBvYmplY3QgaXRlcmF0aW9uLi4gU2VlOlxuICAgIC8vIHdlYnJlZmxlY3Rpb24uYmxvZ3Nwb3QuY29tLzIwMDcvMDcvcXVpY2stZml4LWludGVybmV0LWV4cGxvcmVyLWFuZC5odG1sXG4gICAgaWYgKHYuaGFzT3duUHJvcGVydHkgJiYgdi5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSAmJlxuICAgICAgICAodHlwZW9mIHYudG9TdHJpbmcgIT0gJ3VuZGVmaW5lZCcpICYmIChvYmoudG9TdHJpbmcgIT09IHYudG9TdHJpbmcpKSB7XG4gICAgICBvYmoudG9TdHJpbmcgPSB2LnRvU3RyaW5nO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29weVByb3BlcnRpZXM7XG5cbi8vIGRlcHJlY2F0aW9uIG5vdGljZVxuY29uc29sZS53YXJuKFxuICAncmVhY3QvbGliL2NvcHlQcm9wZXJ0aWVzIGhhcyBiZWVuIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgJyArXG4gICduZXh0IHZlcnNpb24gb2YgUmVhY3QuIEFsbCB1c2VzIGNhbiBiZSByZXBsYWNlZCB3aXRoICcgK1xuICAnT2JqZWN0LmFzc2lnbihvYmosIGEsIGIsIC4uLikgb3IgXy5leHRlbmQob2JqLCBhLCBiLCAuLi4pLidcbik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZW1wdHlGdW5jdGlvblxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fVxuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmc7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBmb3JFYWNoQWNjdW11bGF0ZWRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBAcGFyYW0ge2FycmF5fSBhbiBcImFjY3VtdWxhdGlvblwiIG9mIGl0ZW1zIHdoaWNoIGlzIGVpdGhlciBhbiBBcnJheSBvclxuICogYSBzaW5nbGUgaXRlbS4gVXNlZnVsIHdoZW4gcGFpcmVkIHdpdGggdGhlIGBhY2N1bXVsYXRlYCBtb2R1bGUuIFRoaXMgaXMgYVxuICogc2ltcGxlIHV0aWxpdHkgdGhhdCBhbGxvd3MgdXMgdG8gcmVhc29uIGFib3V0IGEgY29sbGVjdGlvbiBvZiBpdGVtcywgYnV0XG4gKiBoYW5kbGluZyB0aGUgY2FzZSB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgb25lIGl0ZW0gKGFuZCB3ZSBkbyBub3QgbmVlZCB0b1xuICogYWxsb2NhdGUgYW4gYXJyYXkpLlxuICovXG52YXIgZm9yRWFjaEFjY3VtdWxhdGVkID0gZnVuY3Rpb24oYXJyLCBjYiwgc2NvcGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGFyci5mb3JFYWNoKGNiLCBzY29wZSk7XG4gIH0gZWxzZSBpZiAoYXJyKSB7XG4gICAgY2IuY2FsbChzY29wZSwgYXJyKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoQWNjdW11bGF0ZWQ7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgZ2V0RXZlbnRUYXJnZXRcbiAqIEB0eXBlY2hlY2tzIHN0YXRpYy1vbmx5XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogR2V0cyB0aGUgdGFyZ2V0IG5vZGUgZnJvbSBhIG5hdGl2ZSBicm93c2VyIGV2ZW50IGJ5IGFjY291bnRpbmcgZm9yXG4gKiBpbmNvbnNpc3RlbmNpZXMgaW4gYnJvd3NlciBET00gQVBJcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gbmF0aXZlRXZlbnQgTmF0aXZlIGJyb3dzZXIgZXZlbnQuXG4gKiBAcmV0dXJuIHtET01FdmVudFRhcmdldH0gVGFyZ2V0IG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldEV2ZW50VGFyZ2V0KG5hdGl2ZUV2ZW50KSB7XG4gIHZhciB0YXJnZXQgPSBuYXRpdmVFdmVudC50YXJnZXQgfHwgbmF0aXZlRXZlbnQuc3JjRWxlbWVudCB8fCB3aW5kb3c7XG4gIC8vIFNhZmFyaSBtYXkgZmlyZSBldmVudHMgb24gdGV4dCBub2RlcyAoTm9kZS5URVhUX05PREUgaXMgMykuXG4gIC8vIEBzZWUgaHR0cDovL3d3dy5xdWlya3Ntb2RlLm9yZy9qcy9ldmVudHNfcHJvcGVydGllcy5odG1sXG4gIHJldHVybiB0YXJnZXQubm9kZVR5cGUgPT09IDMgPyB0YXJnZXQucGFyZW50Tm9kZSA6IHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRFdmVudFRhcmdldDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRVbmJvdW5kZWRTY3JvbGxQb3NpdGlvblxuICogQHR5cGVjaGVja3NcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBHZXRzIHRoZSBzY3JvbGwgcG9zaXRpb24gb2YgdGhlIHN1cHBsaWVkIGVsZW1lbnQgb3Igd2luZG93LlxuICpcbiAqIFRoZSByZXR1cm4gdmFsdWVzIGFyZSB1bmJvdW5kZWQsIHVubGlrZSBgZ2V0U2Nyb2xsUG9zaXRpb25gLiBUaGlzIG1lYW5zIHRoZXlcbiAqIG1heSBiZSBuZWdhdGl2ZSBvciBleGNlZWQgdGhlIGVsZW1lbnQgYm91bmRhcmllcyAod2hpY2ggaXMgcG9zc2libGUgdXNpbmdcbiAqIGluZXJ0aWFsIHNjcm9sbGluZykuXG4gKlxuICogQHBhcmFtIHtET01XaW5kb3d8RE9NRWxlbWVudH0gc2Nyb2xsYWJsZVxuICogQHJldHVybiB7b2JqZWN0fSBNYXAgd2l0aCBgeGAgYW5kIGB5YCBrZXlzLlxuICovXG5mdW5jdGlvbiBnZXRVbmJvdW5kZWRTY3JvbGxQb3NpdGlvbihzY3JvbGxhYmxlKSB7XG4gIGlmIChzY3JvbGxhYmxlID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9O1xuICB9XG4gIHJldHVybiB7XG4gICAgeDogc2Nyb2xsYWJsZS5zY3JvbGxMZWZ0LFxuICAgIHk6IHNjcm9sbGFibGUuc2Nyb2xsVG9wXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VW5ib3VuZGVkU2Nyb2xsUG9zaXRpb247XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgaW52YXJpYW50XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ0ludmFyaWFudCBWaW9sYXRpb246ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGtleU1pcnJvclxuICogQHR5cGVjaGVja3Mgc3RhdGljLW9ubHlcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoXCIuL2ludmFyaWFudFwiKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WID8gaW52YXJpYW50KFxuICAgIG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopLFxuICAgICdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJ1xuICApIDogaW52YXJpYW50KG9iaiBpbnN0YW5jZW9mIE9iamVjdCAmJiAhQXJyYXkuaXNBcnJheShvYmopKSk7XG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXRba2V5XSA9IGtleTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBrZXlNaXJyb3I7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUga2V5T2ZcbiAqL1xuXG4vKipcbiAqIEFsbG93cyBleHRyYWN0aW9uIG9mIGEgbWluaWZpZWQga2V5LiBMZXQncyB0aGUgYnVpbGQgc3lzdGVtIG1pbmlmeSBrZXlzXG4gKiB3aXRob3V0IGxvb3NpbmcgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgdXNlIGtleSBzdHJpbmdzIGFzIHZhbHVlc1xuICogdGhlbXNlbHZlcy4gUGFzcyBpbiBhbiBvYmplY3Qgd2l0aCBhIHNpbmdsZSBrZXkvdmFsIHBhaXIgYW5kIGl0IHdpbGwgcmV0dXJuXG4gKiB5b3UgdGhlIHN0cmluZyBrZXkgb2YgdGhhdCBzaW5nbGUgcmVjb3JkLiBTdXBwb3NlIHlvdSB3YW50IHRvIGdyYWIgdGhlXG4gKiB2YWx1ZSBmb3IgYSBrZXkgJ2NsYXNzTmFtZScgaW5zaWRlIG9mIGFuIG9iamVjdC4gS2V5L3ZhbCBtaW5pZmljYXRpb24gbWF5XG4gKiBoYXZlIGFsaWFzZWQgdGhhdCBrZXkgdG8gYmUgJ3hhMTInLiBrZXlPZih7Y2xhc3NOYW1lOiBudWxsfSkgd2lsbCByZXR1cm5cbiAqICd4YTEyJyBpbiB0aGF0IGNhc2UuIFJlc29sdmUga2V5cyB5b3Ugd2FudCB0byB1c2Ugb25jZSBhdCBzdGFydHVwIHRpbWUsIHRoZW5cbiAqIHJldXNlIHRob3NlIHJlc29sdXRpb25zLlxuICovXG52YXIga2V5T2YgPSBmdW5jdGlvbihvbmVLZXlPYmopIHtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gb25lS2V5T2JqKSB7XG4gICAgaWYgKCFvbmVLZXlPYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0ga2V5T2Y7XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgbWVyZ2VcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoXCIuL09iamVjdC5hc3NpZ25cIik7XG5cbi8qKlxuICogU2hhbGxvdyBtZXJnZXMgdHdvIHN0cnVjdHVyZXMgaW50byBhIHJldHVybiB2YWx1ZSwgd2l0aG91dCBtdXRhdGluZyBlaXRoZXIuXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBvbmUgT3B0aW9uYWwgb2JqZWN0IHdpdGggcHJvcGVydGllcyB0byBtZXJnZSBmcm9tLlxuICogQHBhcmFtIHs/b2JqZWN0fSB0d28gT3B0aW9uYWwgb2JqZWN0IHdpdGggcHJvcGVydGllcyB0byBtZXJnZSBmcm9tLlxuICogQHJldHVybiB7b2JqZWN0fSBUaGUgc2hhbGxvdyBleHRlbnNpb24gb2Ygb25lIGJ5IHR3by5cbiAqL1xudmFyIG1lcmdlID0gZnVuY3Rpb24ob25lLCB0d28pIHtcbiAgcmV0dXJuIGFzc2lnbih7fSwgb25lLCB0d28pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxuLy8gZGVwcmVjYXRpb24gbm90aWNlXG5jb25zb2xlLndhcm4oXG4gICdyZWFjdC9saWIvbWVyZ2UgaGFzIGJlZW4gZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSAnICtcbiAgJ25leHQgdmVyc2lvbiBvZiBSZWFjdC4gQWxsIHVzZXMgY2FuIGJlIHJlcGxhY2VkIHdpdGggJyArXG4gICdPYmplY3QuYXNzaWduKHt9LCBhLCBiKSBvciBfLmV4dGVuZCh7fSwgYSwgYikuJ1xuKTtcbiJdfQ==
