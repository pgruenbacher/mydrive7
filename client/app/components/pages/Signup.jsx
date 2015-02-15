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
var StatesSelect = require('../../components/forms/address/states.jsx');
var FluxibleMixin = require('fluxible').Mixin;

var SignupAction = require('../../actions/authentication/SignupAction');

var Signup = React.createClass({
  mixins:[FluxibleMixin],

  getInitialState: function () {
    return {
      email:'pgruenbacher@gmail.com',
      firstName:'paul',
      lastName:'gruen',
      phoneNumber:'(513) 319-8238',
      dob: '05/08/1990',
      businessName:'something name',
      productDescription:'description description',
      businessType:'sole_prop',
      zip:45014,
      streetAddress:'1867 Harrowgate',
      state:'OH',
      city:'fairfield'
    };
  },
  handleChange:function(value){
    var self=this;
    return function(event){
      var obj={};
      obj[value]=event.target.value;
      self.setState(obj);
    };
  },
  handleSubmit:function(e){
    e.preventDefault();
    var obj=this.state;
    obj.phoneNumber=this.state.phoneNumber.replace(/\D/g,'');

    console.log(this.state.dob.split('/'));
    this.executeAction(SignupAction,obj);
  },
  render: function() {
    return (
      <div>
        <form>
          <div style={{width:'450px',margin:'40px',display:'inline-block'}}>
            <TextField
              floatingLabelText="email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              hintText="email"/>
            <TextField
              floatingLabelText="firstName"
              value={this.state.firstName}
              onChange={this.handleChange('firstName')}
              hintText="firstName"/>
            <TextField
              floatingLabelText="lastName"
              value={this.state.lastName}
              onChange={this.handleChange('lastName')}
              hintText="lastName"/>
            <TextField
              floatingLabelText="phoneNumber"
              value={this.state.phoneNumber}
              onChange={this.handleChange('phoneNumber')}
              hintText="phoneNumber"/>
            <TextField
              floatingLabelText="dob"
              value={this.state.dob}
              onChange={this.handleChange('dob')}
              hintText="dob"/>
          </div>
          <div style={{width:'450px',margin:'40px',display:'inline-block'}}>
            <TextField
              floatingLabelText="businessName"
              value={this.state.businessName}
              onChange={this.handleChange('businessName')}
              hintText="businessName"/>
            <TextField
              value={this.state.productDescription}
              multiLine={true}
              onChange={this.handleChange('productDescription')}
              hintText="productDescription"/>
            <TextField
              floatingLabelText="businessType"
              value={this.state.businessType}
              onChange={this.handleChange('businessType')}
              hintText="businessType"/>
            <TextField
              floatingLabelText="streetAddress"
              value={this.state.streetAddress}
              onChange={this.handleChange('streetAddress')}
              hintText="streetAddress"/>
            <TextField
              floatingLabelText="city"
              value={this.state.city}
              onChange={this.handleChange('city')}
              hintText="city"/>
            <StatesSelect
              value={this.state.state}
              onChange={this.handleChange('state')}/>
            <TextField
              floatingLabelText="zip"
              value={this.state.zip}
              onChange={this.handleChange('zip')}
              hintText="zip"/>
          </div>
          <RaisedButton
            onClick={this.handleSubmit}
            secondary={true}
            label="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = Signup;