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

var SideNav = require('../layouts/SideNav.jsx');
var ImageGallery = require('./GalleryPage.jsx');
var SimpleScroll = require('./SimpleScroll.jsx');


var Signup = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function() {
        return (
            <SideNav>
                <div>
                    <ImageGallery/>
                </div>
            </SideNav>
        );
    }
});

module.exports = Signup;