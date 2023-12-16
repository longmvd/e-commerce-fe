import { createApp } from 'vue';

import socket from '@/plugins/web-socket/web-socket.plugin';
import store from '@/store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import i18n from './i18n';
import { eventBus } from './plugins/event-bus';
import { routers } from './routers';
const app = createApp(App);
app
  .use(i18n)
  .use(Antd)
  .use(routers)
  .use(store)
  .use(eventBus)
  .use(socket)
  .provide('_global', {
    // setLocale
  });
app.mount('#app');
