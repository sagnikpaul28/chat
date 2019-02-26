import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import inputReducers from './reducers/inputReducer'
import userDataReducer from "./reducers/userDataReducer";
import dashboardReducers from "./reducers/dashboardReducer";
import chatReducers from "./reducers/chatReducer";

const store = createStore(
    combineReducers({ inputReducers, userDataReducer, dashboardReducers, chatReducers }),
    {},
    applyMiddleware(logger, thunk)
);

export default store;
