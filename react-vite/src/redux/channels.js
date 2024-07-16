// action types
const SET_CHANNELS = 'channels/setChannels';
const ADD_CHANNEL = 'channels/addChannel';
const UPDATE_CHANNEL = 'channels/updateChannel';
const REMOVE_CHANNEL = 'channels/removeChannel';

// action creators
const setChannels = (channels) => ({
  type: SET_CHANNELS,
  payload: channels,
});

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  payload: channel,
});

const updateChannel = (channel) => ({
  type: UPDATE_CHANNEL,
  payload: channel,
});

const removeChannel = (channelId) => ({
  type: REMOVE_CHANNEL,
  payload: channelId,
});

// thunks
export const thunkFetchChannels = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${serverId}`);
  if (response.ok) {
    const channels = await response.json();
    dispatch(setChannels(channels));
  }
};

export const thunkCreateChannel = (channelData) => async (dispatch) => {
  const response = await fetch('/api/channels/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(channelData),
  });
  if (response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel));
    return channel;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { channel: 'Something went wrong. Please try again' };
  }
};

export const thunkFetchChannel = (id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}`);
  if (response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel)); // add or update the channel in the state
  }
};

export const thunkUpdateChannel = (id, channelData) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(channelData),
  });

  if (response.ok) {
    const channel = await response.json();
    dispatch(updateChannel(channel));
    return channel; // Return the updated channel object
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { channel: 'Something went wrong. Please try again' };
  }
};

export const thunkDeleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const channel = await response.json(); // Assuming the server returns the deleted channel
    dispatch(removeChannel(channelId));
    return channel; // Return the deleted channel object
  }
};

// initial state
const initialState = { channels: [] };

// reducer
const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, channels: action.payload };
    case ADD_CHANNEL:
      return { ...state, channels: [...state.channels, action.payload] };
    case UPDATE_CHANNEL:
      return {
        ...state,
        channels: state.channels.map((channel) =>
          channel.id === action.payload.id ? action.payload : channel
        ),
      };
    case REMOVE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter((channel) => channel.id !== action.payload),
      };
    default:
      return state;
  }
};

export default channelsReducer;
