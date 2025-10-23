import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Toujours tout en haut, sans tenir compte de savedPosition ni hash
    return new Promise((resolve) => {
      requestAnimationFrame(() => resolve({ left: 0, top: 0 }));
    });
  },
});

// Ceinture + bretelles : au cas où, on force aussi après chaque navigation
router.afterEach(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" }); // instantané
});

const app = createApp(App);
app.use(router);
app.mount("#app");
