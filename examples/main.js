import Vue from 'vue'
import App from './App.vue'
import PPUI from '../packages';
Vue.use(PPUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')