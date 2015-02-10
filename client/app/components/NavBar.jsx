/** @jsx React.DOM */
/* jshint node:true*/

'use strict';
var React = require('react');
var NavLink = require('flux-router-component').NavLink;

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
                    className = 'pure-menu-selected';
                }
                return (
                    <li className={className} key={link.path}>
                        <NavLink routeName={link.page}>{link.label}</NavLink>
                    </li>
                );
            });
        return (
            <ul className="pure-menu pure-menu-open pure-menu-horizontal">
                {linkHTML}
            </ul>
        );
    }
});

module.exports = Nav;


// 'use strict';

// var React = require('react');

// var AppStore = require('../stores/AppStore');
// var AppActions = require('../actions/AppActions');

// var Router = require('react-router');
// var Link = Router.Link;

// function getAppState(){
//   return AppStore.getData();
// };

// var NAV = React.createClass({
  
//   render: function(){
//     return (
//       <nav className="navbar navbar-default" role="navigation">
//         <Link className="navbar-brand" to="home">MyDrive5</Link>
//         <ul className="nav navbar-nav navbar-right">
//           <li><Link to="signup">Signup</Link></li>
//           <li><Link className="login" to="login">Login</Link></li>
//         </ul>
//       </nav>
//     );
//   }
// })

// module.exports = NAV;