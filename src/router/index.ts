import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/entry",
    component: () => import("@/views/EntryPage.vue"),
  },
  {
    path: "/request",
    component: () => import("@/views/RequestPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
