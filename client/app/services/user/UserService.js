/*jshint node:true*/
'use strict';

var q = require('bluebird');
var backend = require('superagent');

var UserService = {
  init: function() {
    return this._loadSession();
  },

  login: function(username, password) {
    var self = this;

    return backend.post('/login', null, {
      username: username,
      password: password
    })
    .then(function(resp) {
      if (resp.status !== 200) {
        return q.reject(resp.body);
      }

      self._saveSession(resp.body && resp.body.token);
      return resp.body;
    });
  },

  logout: function(token) {
    var self = this;

    return backend.post('/logout', token)
    .then(function(resp) {
      if (resp.status !== 200) {
        return q.reject(resp.body);
      }

      self._destroySession();
      return resp.body;
    });
  },

  _loadSession: function() {
    var token = window.localStorage.getItem('authToken');

    if (!token) {
      return q.resolve();
    }

    return backend.get('/user', token)
    .then(function(resp) {
      
      if (resp.status !== 200) {
        // Not a valid token, return empty session
        return q.resolve();
      }

      return {
        token: token,
        user: resp.body
      };
    });
  },

  _destroySession: function() {
    window.localStorage.removeItem('authToken');
  },

  _saveSession: function(token) {
    window.localStorage.setItem('authToken', token);
  },

  update: function(token, attributes) {
    var deferred = q.defer();

    // Only support updating fullName for this demo
    var fullName = attributes.fullName;
    if (!(fullName && fullName.length)) {
      return q.reject({message: 'Full name must not be empty'});
    }

    return backend.put('/user', token, {fullName: fullName})
    .then(function(resp) {
      if (resp.status !== 200) {
        return q.reject(resp.body);
      }

      return resp.body;
    });
  }
};

module.exports = UserService;