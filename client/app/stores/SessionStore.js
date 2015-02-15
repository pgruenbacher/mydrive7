/*jshint node:true*/
'use strict';
var createStore = require('fluxible/utils/createStore');
var cookie = require('cookies-js');


var SessionStore = createStore({
    storeName: 'SessionStore',
    handlers: {
        'SET_USER' : 'handleUser',
        'SET_TOKEN':'handleToken'
    },
    initialize: function (dispatcher) {
        this.currentUser={};
        if(typeof window !=='undefined'){
            this.token=cookie.get('token');
        }else{
            this.token=null;
        }
    },
    handleUser: function (user) {
        this.currentUser = user;
        this.emitChange();
    },
    handleToken:function(token){
        cookie('token',token);
        this.token = token;
        this.emitChange();
    },
    updatePageTitle: function (title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    },
    getCurrentUser: function () {
        return this.currentUser;
    },
    getState: function () {
        return {
            token:this.token,
            curentUser:this.currentUser
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.token = state.token;
        this.currentUser = state.currentUser;
    }
});


module.exports = SessionStore;