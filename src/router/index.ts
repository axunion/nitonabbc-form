import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/survey",
      name: "survey",
      children: [
        {
          path: "2024/09",
          name: "survey202409",
          component: () => import("@/views/survey/SurveyPage202409.vue"),
        },
      ],
    },
    {
      path: "/apply",
      name: "apply",
      children: [
        {
          path: "2024/09",
          name: "apply202409",
          component: () => import("@/views/apply/ApplyPage202409.vue"),
        },
        {
          path: "2024/02",
          name: "apply202402",
          component: () => import("@/views/apply/ApplyPage202402.vue"),
        },
      ],
    },
  ],
});

export default router;
