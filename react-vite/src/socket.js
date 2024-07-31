// frontend/src/socket.js
import { io } from "socket.io-client";
import { WEBSOCKET_URL } from './config';

const socket = io(WEBSOCKET_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd" // Replace with any custom headers you need
  }
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

export default socket;
