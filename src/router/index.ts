import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/entry/:target',
      name: 'entry',
      component: () => import('@/views/EntryPage.vue')
    },
    {
      path: '/request/:target',
      name: 'request',
      component: () => import('@/views/RequestPage.vue')
    }
  ]
})

export default router
