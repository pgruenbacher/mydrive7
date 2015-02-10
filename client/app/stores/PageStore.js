/*jshint node:true*/
'use strict';
var createStore = require('fluxible/utils/createStore');

var PageStore = createStore({
    storeName: 'PageStore',
    initialize: function (dispatcher) {
        this.content = 'initial content...';
    },
    handleContentChange: function (payload) {
        this.content = 'content for page with id '+payload.id;
        this.emitChange();
    },
    handlers: {
        'LOAD_PAGE': 'handleContentChange'
    },
    getState: function () {
        return {
            content: this.content
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.content = state.content;
    }
});

module.exports = PageStore;