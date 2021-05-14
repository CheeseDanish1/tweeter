/** @format */

import io from "socket.io-client";

function getSocket() {
  const socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });
  return socket;
}

export default getSocket;
