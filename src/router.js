import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Index from './components/index.vue';
import Full from './components/Full.vue';
let router = new Router({
    routes:[
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/full',
            name: 'Full',
            component: Full
        }

    ]
});

export default router