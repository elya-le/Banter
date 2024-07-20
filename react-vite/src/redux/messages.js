// /Users/elya/Desktop/aa-projects/_AA_Banter/Banter/react-vite/src/redux/messages.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (channelId) => {
    const response = await fetch(`/api/channels/${channelId}/messages`);
    const data = await response.json();
    return { channelId, messages: data };
  }
);

export const postMessage = createAsyncThunk(
  'messages/postMessage',
  async ({ channelId, content }) => {
    const response = await fetch(`/api/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    });
    const data = await response.json();
    return { channelId, message: data };
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { channelId, messages } = action.payload;
        state[channelId] = messages;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        const { channelId, message } = action.payload;
        if (!state[channelId]) state[channelId] = [];
        state[channelId].push(message);
      });
  }
});

export const { addMessage, setMessages } = messagesSlice.actions;

export const selectMessagesByChannel = (state, channelId) => state.messages[channelId] || [];

export default messagesSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';

// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState: {},
//   reducers: {
//     addMessage: (state, action) => {
//       const { channelId, message } = action.payload;
//       if (!state[channelId]) {
//         state[channelId] = [];
//       }
//       state[channelId].push(message);
//     },
//     setMessages: (state, action) => {
//       const { channelId, messages } = action.payload;
//       state[channelId] = messages;
//     },
//   },
// });

// export const { addMessage, setMessages } = messagesSlice.actions;

// export const selectMessagesByChannel = (state, channelId) => state.messages[channelId] || [];

// export default messagesSlice.reducer;
