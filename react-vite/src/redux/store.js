import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import serversReducer from "./servers"; 
import channelsReducer from './channels';
import messagesReducer from './messages'; // <--- this has been updated for: importing messages reducer


const rootReducer = combineReducers({
  session: sessionReducer,
  servers: serversReducer,
  channels: channelsReducer,
  messages: messagesReducer, // <--- this has been updated for: adding messages reducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
