/*jshint node:true*/
'use strict';
var createStore = require('fluxible/utils/createStore');
var SessionStore = require('./SessionStore');

var routesConfig= require('../routes/routes');

var ApplicationStore = createStore({
    storeName: 'ApplicationStore',
    handlers: {
        'SET_USER' : 'handleUser',
        'CHANGE_ROUTE_SUCCESS' : 'handleNavigate',
        'UPDATE_PAGE_TITLE'    : 'updatePageTitle'
    },
    initialize: function (dispatcher) {
        this.currentPageName = null;
        this.currentPage = null;
        this.currentRoute = null;
        this.pages = routesConfig;
        this.pageTitle = '';
        this.currentUser= {};
    },
    handleUser: function (user) {
        this.currentUser = user;
        this.emitChange();
    },
    checkPermission:function(route){
        var config = route.config;
        // var user = SessionStore.getCurrentUser();
        if(typeof config.auth!=='undefined'){
            if(typeof config.auth.roles!=='undefined'){
                if(typeof this.currentUser.role==='undefined'){
                    return false;
                }else if(config.auth.roles.indexOf(this.currentUser.role) ===-1){
                    return false;
                }
            }
        }
        return true;
    },
    handleNavigate: function (route) {
        if (this.currentRoute && (this.currentRoute.url === route.url)) {
            return;
        }
        if(!this.checkPermission(route)){
            return;
        }
        var pageName = route.config.page;
        var page = this.pages[pageName];

        this.currentPageName = pageName;
        this.currentPage = page;
        this.currentRoute = route;
        this.emitChange();
    },
    updatePageTitle: function (title) {
        this.pageTitle = title.pageTitle;
        this.emitChange();
    },
    getCurrentPageName: function () {
        return this.currentPageName;
    },
    getPageTitle: function () {
        return this.pageTitle;
    },
    getState: function () {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            route: this.currentRoute,
            pageTitle: this.pageTitle
        };
    },
    dehydrate: function () {
        return this.getState();
    },
    rehydrate: function (state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.currentRoute = state.route;
        this.pageTitle = state.pageTitle;
    }
});


module.exports = ApplicationStore;