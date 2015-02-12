/** @jsx React.DOM */
/* jshint node:true*/

'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;

var Nav = React.createClass({
    getDefaultProps: function () {
        return {
            selected: 'home',
            links: {}
        };
    },
    render: function() {
        var selected = this.props.selected,
            links = this.props.links,
            context = this.props.context,
            linkHTML = Object.keys(links).map(function (name) {
                var className = '',
                    link = links[name];
                if (selected === name) {
                    className = 'menu-selected';
                }
                return (
                    <li className={className} key={link.path}>
                        <NavLink routeName={link.page}>{link.label}</NavLink>
                    </li>
                );
            });
        return (
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    {linkHTML}
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

module.exports = Nav;