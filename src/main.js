import Vue from 'vue'
import App from './App.vue'
import MuseUI from 'muse-ui'
import axios from 'axios'
import api from './api'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' 

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)


Vue.use(MuseUI)
Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})

Vue.http = Vue.prototype.$http = axios;
Vue.api = Vue.prototype.$api = api;
import router from './router'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

