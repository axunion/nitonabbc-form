import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/entry/:target',
      name: 'entry',
      component: () => import('@/views/entry/EntryPage.vue')
    },
    {
      path: '/request/:target',
      name: 'request',
      component: () => import('@/views/request/RequestPage.vue')
    }
  ]
})

export default router
