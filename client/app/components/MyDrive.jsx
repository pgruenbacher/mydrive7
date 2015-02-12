/*jshint node:true*/
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Nav = require('./layouts/NavBar.jsx');
var Home = require('./pages/Home.jsx');
var Login = require('./pages/Login.jsx');
var Signup = require('./pages/Signup.jsx');
var SideNav = require('./pages/SideNav.jsx');
// var About = require('./About.jsx');
// var Page = require('./Page.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var FluxibleMixin = require('fluxible').Mixin;

var Application = React.createClass({
    mixins: [RouterMixin, FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },

    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {
        var output = '';
        console.log('render mydrive',this.state.currentPageName);
        //choose the right page based on the route
        switch (this.state.currentPageName) {
            case 'home':
                output = <Home/>;
                break;
            case 'about':
                output = <Login/>;
                break;
            case 'login':
                output = <Login/>;
                break;
            case 'signup':
                output = <Signup/>;
                break;
            case 'sidenav':
                output = <SideNav/>;
                break;
        }
        //render content
        // <Nav selected={this.state.currentPageName} links={this.state.pages} />
        return (
            <div>
                {output}
            </div>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        var newState = this.state;
        if (newState.pageTitle === prevState.pageTitle) {
            return;
        }
        document.title = newState.pageTitle;
    }
});

module.exports = Application;
