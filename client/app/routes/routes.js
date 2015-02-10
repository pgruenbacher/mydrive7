// var showChat = require('../actions/showChat');
// var openThread = require('../actions/openThread');
// var NavActions = require('../actions/NavActions.js');

module.exports = {
    home: {
        path: '/',
        method: 'get',
        page: 'home',
        label: 'Home',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'Home' });
            done();
        }
    },
    about: {
        path: '/about',
        method: 'get',
        page: 'about',
        label: 'About',
        action: function (context, payload, done) {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: 'About' });
            done();
        }
    },
    login:{
        path: '/login',
        method:'get',
        page:'login',
        label:'Login',
        action:function(context,payload,done){
            context.dispatch('UPDATE_PAGE_TITLE',{pageTitle:'Login'});
        }
    },
    signup:{
        path:'/signup',
        method:'get',
        page:'signup',
        label:'Signup',
        action:function(context,payload,done){
            context.dispatch('UPDATE_PAGE_TITLE',{pageTItle:'Signup'});
        }
    },
    dynamicpage: {
        path: '/page/:id',
        method: 'get',
        page: 'page',
        action: function (context, payload, done) {
            context.dispatch('LOAD_PAGE', { id: payload.params.id });
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: payload.params.id + ' [Dynamic Page] | flux-examples | routing' });
            done();
        }
    }
};