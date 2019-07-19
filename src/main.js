// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// global style
import './styles/common.scss'
import './styles/element-reset.scss'
import 'normalize.css'
// vue series
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// player
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

import './permission'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
