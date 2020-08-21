import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './modules'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes
});

export default router;
