import mitt from 'mitt';
import { App } from 'vue';

const bus = mitt();

export const eventBus = {
  install: (app: App<Element>) => {
    app.provide('_bus', bus);
  },
};
