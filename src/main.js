import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Edit from '@/components/EditUser'
import Stats from '@/components/Stats'
import store from './store'


Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'dashboard',
      component: Dashboard,

    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats,

    },
    {
      path: '/edit/:user_id',
      name: 'edit',
      component: Edit,

    }

  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')