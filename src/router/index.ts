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
      path: '/survey/2024/09',
      name: 'survey202409',
      component: () => import('@/views/survey/SurveyPage202409.vue')
    },
    {
      path: '/entry/2024/09',
      name: 'entry202409',
      component: () => import('@/views/entry/EntryPage202409.vue')
    },
    {
      path: '/entry/2024/02',
      name: 'entry202402',
      component: () => import('@/views/entry/EntryPage202402.vue')
    }
  ]
})

export default router
