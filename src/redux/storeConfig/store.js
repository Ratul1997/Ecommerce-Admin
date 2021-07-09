/* eslint-disable  */
// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import rootReducer from "../reducers/rootReducer";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { createStore, applyMiddleware, compose } from "redux";
import storage from "redux-persist/lib/storage";
// ** init middleware
const middleware = [thunk, createDebounce()];

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2
};

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create store
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

export { store };
