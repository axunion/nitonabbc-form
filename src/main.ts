import { createPinia } from "pinia";
import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import router from "./router";
import "./assets/stylesheet/main.css";

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  const pinia = createPinia();
  app.use(pinia);
});
