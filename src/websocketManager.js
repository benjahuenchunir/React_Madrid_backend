class WebSocketManager {
  constructor() {
    this.connections = new Map();
  }

  addConnection(idChat, ws) {
    if (!this.connections.has(idChat)) {
      this.connections.set(idChat, new Set());
    }
    this.connections.get(idChat).add(ws);
    ws.on('close', () => this.removeConnection(idChat, ws));
  }

  removeConnection(idChat, ws) {
    if (this.connections.has(idChat)) {
      const chatConnections = this.connections.get(idChat);
      chatConnections.delete(ws);
      if (chatConnections.size === 0) {
        this.connections.delete(idChat);
      }
    }
  }

  broadcast(message, changeType) {
    if (this.connections.has(message.idChat)) {
      const chatConnections = this.connections.get(message.idChat);
      for (let ws of chatConnections) {
        if (ws.readyState === ws.OPEN && ws.idUser !== message.user.id) {
          ws.send(JSON.stringify({
            changeType: changeType,
            message: message
          }));
        }
      }
    }
  }
}

module.exports = new WebSocketManager();