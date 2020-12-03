import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import appReducer from "./reducers/AppReducer";

const loggerMiddleware = createLogger({ collapse: true });

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        /* Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...*/
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(loggerMiddleware, thunkMiddleware) /* other store enhancers if any */
);
const store = createStore(appReducer, enhancer);

export default store;
