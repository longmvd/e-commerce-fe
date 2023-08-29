import { createApp, provide } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import routers from "./routers";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import '@/scss/index.scss'

const app = createApp(App);
app.use(i18n)
.use(Antd)
.use(routers)
.provide("_global", {
    // setLocale
  })
app.mount("#app");
