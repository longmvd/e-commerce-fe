import appSettings from '@/configs';
import { SocketEvents } from '@/plugins/event-bus';
import { Emitter } from 'mitt';
import { inject } from 'vue';

const socket = new WebSocket(appSettings.webSocketHost);

export function useWebSocketInit() {
  const bus = inject<Emitter<SocketEvents>>('_bus');
  socket.onmessage = (event) => {
    bus?.emit('onSocketMessage', event);
  };

  socket.onerror = (event) => {
    bus?.emit('onSocketError', event);
  };

  window.addEventListener('beforeunload', () => {
    socket.close();
  });
}

type useWebSocketParam = {
  handleOnSocketMessage: (event: MessageEvent) => void;
  handleOnSocketError: (event: Event) => void;
};

export function useWebSocket({
  handleOnSocketMessage,
  handleOnSocketError,
}: useWebSocketParam) {
  const eventHandler = inject<Emitter<SocketEvents>>('_bus');
  if (typeof handleOnSocketMessage === 'function') {
    eventHandler?.on('onSocketMessage', handleOnSocketMessage);
  }
  if (typeof handleOnSocketError === 'function') {
    eventHandler?.on('onSocketError', handleOnSocketError);
  }
  return eventHandler;
}
