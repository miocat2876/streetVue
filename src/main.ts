import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VTooltip from 'v-tooltip';

// Use v-calendar & v-date-picker components

createApp(App).use(store).use(router).use(VTooltip).mount("#app");
