/*jshint node:true */
'use strict';
var debug = require('debug')('Example:showChatAction');
// var MessageStore = require('../stores/MessageStore');
// var openThread = require('../actions/openThread');

function fetchMessages(context, payload, done) {
    debug('fetching messages');
    context.service.read('message', {}, {}, function (err, messages) {
        context.dispatch('RECEIVE_MESSAGES', messages);
        console.log(messages);
        // context.executeAction(openThread, payload, function() {
        //     context.dispatch('SHOW_CHAT_END');
        //     done();
        // });;
        done();
    });

}

module.exports = function (context, payload, done) {
    // context.dispatch('SHOW_CHAT_START');
    // var messageStore = context.getStore(MessageStore);
    fetchMessages(context,payload,done);
    done();
    // if (Object.keys(messageStore.getAll()).length === 0) {
    //     fetchMessages(context, payload, done);
    // } else {
    //     debug('dispatching SHOW_CHAT_END');
    //     context.dispatch('SHOW_CHAT_END');
    //     done();
    // }
};