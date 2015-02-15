/** @jsx React.DOM */
/* jshint node:true*/


'use strict';

var React = require('react');

// var AppStore = require('../stores/AppStore');
var LoginAction = require('../../actions/authentication/LoginActions');

var FluxibleMixin = require('fluxible').Mixin;

// var NAV = require('./NavBar.jsx');
// var BANNER = require('./Banner.jsx');

var mui=require('material-ui');
var RaisedButton=mui.RaisedButton;
var TextField=mui.TextField;

var TooltipHover = require('../elements/toolTipHover.jsx');


var LOGIN  = React.createClass({
  mixins:[FluxibleMixin],

  getInitialState:function(){
    return {email:'',password:''};
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.executeAction(LoginAction,this.state);
  },

  handleInput: function(e) {
    console.log("at handleInput in Login");
  },

  _onPasswordChange:function(event){
    this.setState({password:event.target.value});
  },

  _onEmailChange:function(event){
    this.setState({email:event.target.value});
  },
  
  render: function(){
    return (
      <div className="login-page">
        <form>  
          <input
            floatingLabelText="email"
            value={this.state.email}
            onChange={this._onEmailChange}
            hintText="email"/>
          <input
            floatingLabelText="password"
            hintText="password"
            onChange={this._onPasswordChange}
            value={this.state.password}
            type="password"/>
          <RaisedButton secondary={true} label="login" onClick={this.handleSubmit}/>
        </form>
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
