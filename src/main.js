import Vue from 'vue';
import VueRouter from 'vue-router';
import AsyncComputed from 'vue-async-computed';
import DashboardPlugin from './dashboard-plugin';

// Registrar API
import dwns from './dwns';
Vue.prototype.$dwns = dwns;

Vue.filter('convertTo', dwns.utils.convertTo);


// Plugins
import App from './App.vue';

// router setup
import routes from './routes/routes';

// vuex setup
import store from './store';

// plugin setup
Vue.use(VueRouter);
Vue.use(AsyncComputed);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});

/* We import element-ui variables at the end so they can override the default element-ui colors */
import './assets/sass/element_variables.scss';
