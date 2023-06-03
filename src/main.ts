import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { RootClassfication } from '@/apis/models/RootClassfication'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

if( store.state.courseClassfication.length == 0 ){
  const roots = new Array<RootClassfication>();
  const typeone : RootClassfication = { 
    name : "rootu",
    subClassfication: ["1" , "yukina" ]
  };
  const typetwo : RootClassfication = {
    name : "root2",
    subClassfication: ["2" ]
  };
  roots.push(typeone);
  roots.push(typetwo);
  store.commit('updateCourseClass', roots);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
