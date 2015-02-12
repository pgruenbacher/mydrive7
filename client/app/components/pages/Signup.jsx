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
var Tooltip = mui.Tooltip;

var Signup = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function() {
        return (
            <div>
              <p>Welcome to the signup!</p>
              <Tooltip label="asdf" show={true} ></Tooltip>
            </div>
        );
    }
});

module.exports = Signup;

// var SIGNUP  = React.createClass({

//   handleClick: function(){
//     console.log("at handleClick in Signup");
//   },

//   handleInput: function(e) {
//     console.log("at handleInput in Signup");
//   },
  
//   render: function(){
//     return (
//       <div>
//         <div className="container">
//         <h1>Signup</h1>
//         <form className="form-horizontal" role="form">
//             <div className="form-group">
//               <label for="inputPassword3" className="control-label">Name</label>
//               <div className="container">
//                 <input type="text" className="form-control" placeholder="Name" onKeyPress={this.handleInput}/>
//               </div>
//             </div>
//             <div className="form-group">
//               <label for="inputEmail3" className="control-label">Email</label>
//               <div className="container">
//                 <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onKeyPress={this.handleInput}/>
//               </div>
//             </div>
//             <div className="form-group">
//               <label for="inputPassword3" className="control-label">Password</label>
//               <div className="container">
//                 <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onKeyPress={this.handleInput}/>
//               </div>
//             </div>
           
//             <div className="form-group">
//               <div className="control-button">
//                 <button type="submit" className="btn btn-default" onClick={this.handleClick} >Sign up</button>
//               </div>
//             </div>
//           </form>
//         </div> 
//       </div>

//       );
//   }
// });

// module.exports = SIGNUP;
