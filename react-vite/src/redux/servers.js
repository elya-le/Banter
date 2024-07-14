const SET_SERVERS = 'servers/setServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';

// action creators
const setServers = (servers) => ({
  type: SET_SERVERS,
  payload: servers,
});

const addServer = (server) => ({
  type: ADD_SERVER,
  payload: server,
});

const updateServer = (server) => ({
  type: UPDATE_SERVER,
  payload: server,
});

const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  payload: serverId,
});

// Thunks
export const thunkFetchServers = () => async (dispatch) => {
  const response = await fetch('/api/servers/');
  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data.servers)); // accessing the servers array directly
  }
};


export const thunkCreateServer = (serverData) => async (dispatch) => {
  const response = await fetch('/api/servers/', {
    method: 'POST',
    body: serverData, // send the FormData object directly
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data));
    return data; // return the newly created server's data
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkFetchServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data)); // add or update the server in the state
  }
};

export const thunkUpdateServer = (id, serverData) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: 'PUT',
    body: serverData, // remove the Content-Type header and send FormData directly
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(updateServer(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};


export const thunkDeleteServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeServer(id));
  }
};

// initial state
const initialState = { servers: [] };

// reducer
function serversReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVERS:
      return { ...state, servers: action.payload };
    case ADD_SERVER:
      return { ...state, servers: [...state.servers, action.payload] };
    case UPDATE_SERVER:
      return {
        ...state,
        servers: state.servers.map((server) =>
          server.id === action.payload.id ? action.payload : server
        ),
      };
    case REMOVE_SERVER:
      return {
        ...state,
        servers: state.servers.filter((server) => server.id !== action.payload),
      };
    default:
      return state;
  }
}

export default serversReducer;
