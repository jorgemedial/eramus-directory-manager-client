import { createRouter, createWebHistory } from 'vue-router'
import Directory from '../components/Directory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'directory',
      component: Directory
    }
  ]
})

export default router
