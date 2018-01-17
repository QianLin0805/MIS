import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    mode: 'hash',
    routes: [
        {
            path: '/zenbo',
            name: 'zenbo',
            component: Home
        },
        {
            path: '/note',
            name: 'note',
            component: Home
        },
        {
            path: '/mi',
            name: 'mi',
            component: Home
        },
        {
            path: '/',
            redirect: '/zenbo'
        },
        {
            path: '/index',
            redirect: '/zenbo'
        },
    ]
})
