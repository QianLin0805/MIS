import Vue from 'vue'
import Router from 'vue-router'
import Zenbo from '@/components/Zenbo'
import Note from '@/components/Note'
import Mi from '@/components/Mi'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    mode: 'hash',
    routes: [
        {
            path: '/zenbo',
            name: 'zenbo',
            component: Zenbo,
            children: [
                {
                    path: 'detail/:type',
                    name: 'zenboDetail',
                    component: Detail
                }
            ]
        },
        {
            path: '/note',
            name: 'note',
            component: Note,
            children: [
                {
                    path: 'detail/:type',
                    name: 'noteDetail',
                    component: Detail
                }
            ]
        },
        {
            path: '/mi',
            name: 'mi',
            component: Mi,
            children: [
                {
                    path: 'detail/:type',
                    name: 'miDetail',
                    component: Detail
                }
            ]
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
