import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelazyload from 'vue-lazyload'


import { Tab, Tabs, PasswordInput, NumberKeyboard,Button,Field,Uploader} from 'vant';
import 'vant/lib/index.css';
import vueToastPanel from './plugin/index.js'

import '@assets/css/base.scss'

Vue.config.productionTip = false
Vue.use(Vuelazyload)
Vue.use(vueToastPanel)
Vue.use(Tab).use(Tabs).use(PasswordInput).use(NumberKeyboard).use(Button).use(Field).use(Uploader)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
