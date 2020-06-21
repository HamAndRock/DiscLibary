import Vue from 'vue'
import Router from 'vue-router'
import DiscTable from "@/components/DiscTable.vue";


Vue.use(Router);


const publicPages = ['/'];

export const router = new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'HomePage',
                component: DiscTable
            },

        ]
    })
;


