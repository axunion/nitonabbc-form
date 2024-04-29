import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/entry/2024/02',
      name: 'entry',
      component: () => import('@/views/entry/EntryPage202402.vue')
    },
    {
      path: '/request/:target',
      name: 'request',
      component: () => import('@/views/request/RequestPage.vue')
    }
  ]
})

export default router
