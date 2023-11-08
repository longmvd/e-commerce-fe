import { App } from 'vue';

export default {
  install: (app: App<any>) => {
    // app.config.globalProperties.$socket = new WebSocket(
    //   appSettings.webSocketHost
    // );
    // if (!socket || socket.readyState !== WebSocket.OPEN) {
    //   alert('socket not connected');
    // }
    // socket.close(1000, 'Closing from client');
  },
};
