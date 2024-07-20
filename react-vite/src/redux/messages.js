// /Users/elya/Desktop/aa-projects/_AA_Banter/Banter/react-vite/src/redux/messages.js

import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {},
  reducers: {
    addMessage: (state, action) => {
      const { channelId, message } = action.payload;
      if (!state[channelId]) {
        state[channelId] = [];
      }
      state[channelId].push(message);
    },
    setMessages: (state, action) => {
      const { channelId, messages } = action.payload;
      state[channelId] = messages;
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;

export const selectMessagesByChannel = (state, channelId) => state.messages[channelId] || [];

export default messagesSlice.reducer;
