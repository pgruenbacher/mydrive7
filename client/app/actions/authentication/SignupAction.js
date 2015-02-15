/*jshint node:true */
'use strict';
var debug = require('debug')('mydrive5:showChatAction');
// var MessageStore = require('../stores/MessageStore');
// var openThread = require('../actions/openThread');
var request = require('superagent');
// var csrf = require('superagent-csrf')(request);
var navigateAction = require('flux-router-component').navigateAction;


function signup(context, payload, done) {
    // console.log(context);
    // console.log(window.App.context.plugins.FetchrPlugin.xhrContext._csrf);
    // console.log('payload',payload);
    // var cookie=document.cookie;
    // var token=getCookie('_csrf');
    payload._csrf=window.App.context.plugins.FetchrPlugin.xhrContext._csrf;
    // console.log('token',token);

    var url='/auth/stripe/?'+decodeURIComponent($.param(payload));
    console.log(url);
    window.location.href=url;


    // debug('fetching messages');
    // context.service.create('message', {}, {}, function (err, messages) {
    //     context.dispatch('RECEIVE_MESSAGES', messages);
    //     // context.executeAction(openThread, payload, function() {
    //     //     context.dispatch('SHOW_CHAT_END');
    //     //     done();
    //     // });;
    //     done();
    // });

}

module.exports = function (context, payload, done) {
    // context.dispatch('SHOW_CHAT_START');
    // var messageStore = context.getStore(MessageStore);
    signup(context,payload,done);
    done();
    // if (Object.keys(messageStore.getAll()).length === 0) {
    //     fetchMessages(context, payload, done);
    // } else {
    //     debug('dispatching SHOW_CHAT_END');
    //     context.dispatch('SHOW_CHAT_END');
    //     done();
    // }
};