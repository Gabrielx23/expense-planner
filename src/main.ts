import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import container from "@/plugins/inversify";
import {vueInversifyPlugin} from '@vanroeybe/vue-inversify-plugin';
import {auth} from "@/plugins/firebase";

Vue.config.productionTip = false

Vue.use(vueInversifyPlugin(container));

let app: Vue | object | Record<never, any> | Vue = false;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  }

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    return;
  }

  localStorage.removeItem('user');
});


