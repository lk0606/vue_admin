// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// global style
import './styles/common.scss'
import './styles/element-reset.scss'
import 'normalize.css'
// vue series
import Vue from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
// require('babel-polyfill')

// ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { size: 'medium' })
// Progress
import 'nprogress/nprogress.css'
// data deal
// import _ from 'lodash'
// Vue.prototype._ = _
// player
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

import './permission'

// mixins
import { isObject } from './utils/data-type-check'
Vue.mixin({
    methods: {
        isObject
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
