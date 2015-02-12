/** @jsx React.DOM */
/* jshint node:true*/


'use strict';

var React = require('react');

// var AppStore = require('../stores/AppStore');
var AppActions = require('../../actions/AppActions');

// var NAV = require('./NavBar.jsx');
// var BANNER = require('./Banner.jsx');

var mui=require('material-ui');
var RaisedButton=mui.RaisedButton;
var Tooltip = mui.Tooltip;

var TooltipHover = require('../elements/toolTipHover.jsx');


var LOGIN  = React.createClass({

  handleClick: function(){
    console.log("at handleClick in Signup");
  },

  handleInput: function(e) {
    console.log("at handleInput in Login");
  },
  
  render: function(){
    return (
      <div className="example-page">

        <h1>material-ui</h1>
        <h2>example project</h2>

        <RaisedButton label="Secondary" secondary={true} onClick={this.handleClick}></RaisedButton>
        <div>asdlfkj</div>
        <TooltipHover label="This is a tooltip">
          <RaisedButton label="Secondary" secondary={true} onClick={this.handleClick}></RaisedButton>
        </TooltipHover>
      </div>
      // <div>
      //   <div className="container">
      //     <h1>Login</h1>
      //       <form className="form-horizontal" role="form">
      //         <div className="form-group">
      //           <label for="inputEmail3" className="control-label" >Email</label>
      //           <div className="container">
      //             <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onKeyPress={this.handleInput}/>
      //           </div>
      //         </div>
      //         <div className="form-group">
      //           <label for="inputPassword3" className="control-label">Password</label>
      //           <div className="container">
      //             <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onKeyPress={this.handleInput}/>
      //           </div>
      //         </div>
      //         <div className="form-group">
      //           <div>
      //             <div className="checkbox">
      //               <label>
      //                 <input type="checkbox"/> Remember me
      //               </label>
      //             </div>
      //           </div>
      //         </div>
      //         <div className="form-group">
      //           <div className="control-button">
      //             <button type="submit" className="btn btn-default" onClick={this.handleClick} >Sign in</button>
      //           </div>
      //         </div>
      //       </form>
      //   </div>
      // </div>
      );
  }
});

module.exports = LOGIN;
