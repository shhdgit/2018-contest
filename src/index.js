import Vue from 'vue'
import VueTouch from 'vue-touch'

import App from './App'

Vue.use(VueTouch, {name: 'v-touch'})

new Vue({
  render: h => h(App),
}).$mount('#app')
