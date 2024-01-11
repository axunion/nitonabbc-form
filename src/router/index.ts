import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/entry',
      name: 'entry',
      component: () => import('@/views/EntryPage.vue')
    },
    {
      path: '/request',
      name: 'request',
      component: () => import('@/views/RequestPage.vue')
    }
  ]
})

export default router
