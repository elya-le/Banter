const SET_SERVERS = 'servers/setServers';
const ADD_SERVER = 'servers/addServer';
const UPDATE_SERVER = 'servers/updateServer';
const REMOVE_SERVER = 'servers/removeServer';
const JOIN_SERVER = 'servers/joinServer'; // <-------- action to join server update
const LEAVE_SERVER = 'servers/leaveServer'; // <-------- action to leave server update
const VIEW_SERVER = 'servers/viewServer'; // <-------- new action type for viewing server

// action creators
const setServers = (servers, joinedServers, notJoinedServers) => ({
  type: SET_SERVERS,
  payload: {
    all_servers: servers, // updated
    joined_servers: joinedServers, // updated
    not_joined_servers: notJoinedServers, // updated
  },
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

const joinServer = (server) => ({  // <-------- action creator to join a server
  type: JOIN_SERVER,
  payload: server,
});

const leaveServer = (serverId) => ({  // <-------- action creator to leave a server
  type: LEAVE_SERVER,
  payload: serverId,
});

const viewServer = (server) => ({  // <-------- action creator to view a server
  type: VIEW_SERVER,
  payload: server,
});

// thunks
export const thunkFetchServers = () => async (dispatch) => {
  const response = await fetch('/api/servers/');
  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data.all_servers, data.joined_servers, data.not_joined_servers)); // <-------- updated to set correct data
  }
};

export const thunkCreateServer = (serverData) => async (dispatch) => {
  const response = await fetch('/api/servers/', {
    method: 'POST',
    // send the FormData object directly
    body: serverData,
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data));
    dispatch(joinServer(data)); //  <----------- automatically join the server when it is created
    // return the newly created server's data
    return data;
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
    dispatch(viewServer(data)); // <-------- new thunk action to view a server
  }
};

export const thunkUpdateServer = (id, serverData) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: 'PUT',
    // remove the Content-Type header and send FormData directly
    body: serverData,
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

export const thunkJoinServer = (serverId) => async (dispatch) => {  // <-------- join server update
  const response = await fetch(`/api/servers/${serverId}/join`, {
    method: 'POST',
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(joinServer(data.server));
  }
};

export const thunkLeaveServer = (serverId) => async (dispatch) => {  // <-------- leave server update
  const response = await fetch(`/api/servers/${serverId}/leave`, {
    method: 'POST',
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(leaveServer(data.serverId));
  }
};

// initial state
const initialState = {
  allServers: [],
  joinedServers: [],
  notJoinedServers: [],
  viewedServers: [],  // updated initial state for join/leave and later view
};

// reducer
function serversReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SERVERS:
      return {
        ...state,
        allServers: action.payload.all_servers,  // updated
        joinedServers: action.payload.joined_servers,  // updated
        notJoinedServers: action.payload.not_joined_servers,  // updated
      };
    case ADD_SERVER:
      return {
        ...state,
        allServers: [...state.allServers, action.payload],  // updated to allServers
      };
    case UPDATE_SERVER:
      return {
        ...state,
        // servers: state.servers.map((server) =>
        allServers: state.allServers.map((server) =>  // updated to allServers
          server.id === action.payload.id ? action.payload : server
        ),
      };
    case REMOVE_SERVER:
      return {
        ...state,
        allServers: state.allServers.filter((server) => server.id !== action.payload),
        joinedServers: state.joinedServers.filter((id) => id !== action.payload),
        notJoinedServers: state.notJoinedServers.filter((server) => server.id !== action.payload),
        viewedServers: state.viewedServers.filter((server) => server.id !== action.payload),  // updated
      };
    case JOIN_SERVER:  // <-------- join server update
      return {
        ...state,
        joinedServers: [...state.joinedServers, action.payload.id],
        notJoinedServers: state.notJoinedServers.filter((server) => server.id !== action.payload.id),
        viewedServers: state.viewedServers.filter((server) => server.id !== action.payload.id),  // updated
      };
    case LEAVE_SERVER:  // <-------- leave server update
      return {
        ...state,
        joinedServers: state.joinedServers.filter((id) => id !== action.payload),
        notJoinedServers: [
          ...state.notJoinedServers,
          state.allServers.find((server) => server.id === action.payload),
        ],
      };
    case VIEW_SERVER:  // <-------- new case
      if (state.joinedServers.includes(action.payload.id) || state.viewedServers.some((s) => s.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        viewedServers: [...state.viewedServers, action.payload],
      };
    default:
      return state;
  }
}

export default serversReducer;
