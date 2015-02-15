// /** @jsx React.DOM */
/*jshint node:true*/

// 'use strict';

// var React = require('react');

// // var AppStore = require('../stores/AppStore');
// // var AppActions = require('../actions/AppActions');

// // var NAV = require('./NavBar.jsx');
// // var BANNER = require('./Banner.jsx');

'use strict';
var React = require('react');

var mui = require('material-ui');
var TextField = mui.TextField;
var Tooltip = mui.Tooltip;
var RaisedButton = mui.RaisedButton;
var FluxibleMixin = require('fluxible').Mixin;

var AdminPage = React.createClass({
  mixins:[FluxibleMixin],

  getInitialState: function () {
    return {};
  },
  handleChange:function(e){
  },
  handleSubmit:function(e){
  },
  render: function() {
    return (
      <div>
        Admin!
      </div>
    );
  }
});

module.exports = AdminPage;