import { ViteSSG } from "vite-ssg/single-page";
import App from "./App.vue";
import "./assets/css/style.css";

// createApp(App).mount("#app");
export const createApp = ViteSSG(App);
