import appSettings from '@/configs';

export function useWebSocket(
  onMessage: (event: MessageEvent) => any,
  onOpen: (event: Event) => any,
  onClose: (event: CloseEvent) => any,
  onError: (event: Event) => any
) {
  const socket = new WebSocket(appSettings.webSocketHost);

  if (typeof onMessage == 'function') {
    socket.onmessage = onMessage;
  }

  if (typeof onOpen == 'function') {
    socket.onopen = onOpen;
  }

  if (typeof onClose == 'function') {
    socket.onclose = onClose;
  }

  if (typeof onError == 'function') {
    socket.onerror = onError;
  }

  return {
    socket,
  };
}
