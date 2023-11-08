export type SocketEvents = {
  onSocketMessage: MessageEvent<any>;
  onSocketError: Event;
  onSocketOpen: Event;
};
