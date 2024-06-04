import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/request/:type',
      name: 'request',
      component: () => import('@/views/request/RequestPage.vue')
    },
    {
      path: '/entry/2024/02',
      name: 'entry',
      component: () => import('@/views/entry/EntryPage202402.vue')
    }
  ]
})

export default router
