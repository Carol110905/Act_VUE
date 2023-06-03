import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'
import Pagina2 from '../views/Pagina2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Principal,
  },
  {
    path: '/Pagina2',
    name: 'Pagina2',
    component:Pagina2,
  }
  
];

const router = new VueRouter({
  routes
})

export default router
