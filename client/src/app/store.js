import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import inputReducers from './reducers/inputReducer'
import userDataReducer from "./reducers/userDataReducer";

const store = createStore(
    combineReducers({ inputReducers, userDataReducer }),
    {},
    applyMiddleware(logger, thunk)
);

export default store;
