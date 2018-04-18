import Vue from 'vue'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'

import App from './App'

Vue.use(AlloyFingerPlugin, {
    AlloyFinger
})

new Vue({
  render: h => h(App),
}).$mount('#app')
