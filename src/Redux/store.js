import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  userReducer,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
