class Socket {
  constructor(io) {
    this.io = io;
  }
  disconnect(socket) {
    socket.disconnect(true);
  }
  request(cb, socket) {
    const realSocket = this.io.sockets.sockets.get(socket.id);
    cb(realSocket);
  }
}

module.exports = Socket;
