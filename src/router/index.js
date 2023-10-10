import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: route => ({ path: route })
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'catchAll',
      component: Home,
      props: route => ({ path: route })
    }
  ]
})

export default router
