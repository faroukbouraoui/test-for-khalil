import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger-simple";
import { persistStore, persistReducer } from "redux-persist";
import storageLocal  from "redux-persist/lib/storage/session";
import AuthReducer from "./Reducers/AuthReducer"
import {AsyncStorage }from "react"

const persistConfig = {
  key: "root",
  timeout: null,
  storage:storageLocal,
  whitelist: ["auth"],
  blacklist: []
};
const middleware = [thunkMiddleware];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware, logger)
);
const reducers = combineReducers({
  auth: AuthReducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

const Store = createStore(persistedReducers, enhancer);

export default Store;
export const persistor = persistStore(Store);
