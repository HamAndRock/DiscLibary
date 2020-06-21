import Vue from 'vue'

import {router} from '@/router'
import App from "./views/App.vue";

import Vuetify from "vuetify";

Vue.use(Vuetify)


let vuetify = new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
});

let AppInstance = new Vue({
    vuetify,
    router,
    render: (createElement) => createElement(App),
});

export class DataPlatform {
    constructor(selector: string) {
        AppInstance.$mount(selector)
    }
}

new DataPlatform('#app');

export default AppInstance;


