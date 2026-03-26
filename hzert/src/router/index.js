import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/home.vue'
import commonjobs from '@/views/commonjobs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/commonjobs',
      name: 'common',
      component:commonjobs
    },
  ],
})

export default router
