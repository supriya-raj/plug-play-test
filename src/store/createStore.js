import { applyMiddleware, compose, createStore } from "redux";
import Reducer from './reducers';

const __DEV__ = process.env && process.env.NODE_ENV === "development";

export default initialState => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middlewares = [];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    Reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
  );

  return store;
};
