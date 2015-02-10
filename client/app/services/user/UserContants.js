/*jshint node:true*/
'use strict';

var keyMirror = require('keymirror');

module.exports = keyMirror({
  LOGIN:null,
  LOGIN_SUCCESS:null,
  LOGIN_FAIL:null,

  LOGOUT:null,
  LOGOUT_SUCCESS:null,
  LOGOUT_FAIL:null,

  USER_UPDATE:null,
  USER_UPDATE_SUCCESS:null,
  USER_UPDATE_FAIL:null,

  USER_CLEAR_REQUESTS:null
  
});