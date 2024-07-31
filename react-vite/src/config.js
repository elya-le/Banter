// frontend/src/config.js
const websocketURL = import.meta.env.PROD 
  ? import.meta.env.VITE_WEBSOCKET_URL_PROD 
  : import.meta.env.VITE_WEBSOCKET_URL_LOCAL;

export const WEBSOCKET_URL = websocketURL;
