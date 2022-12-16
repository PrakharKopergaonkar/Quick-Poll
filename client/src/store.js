import { configureStore, combineReducers} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {authReducer} from './reducers/authReducers';
import {alertReducer} from './reducers/alertReducers';
import { loadingReducer } from "./reducers/loadingReducers";
import { pollReducer } from "./reducers/pollReducers";

const reducer = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	loading: loadingReducer,
	polls:pollReducer
});

const middleware = [thunk];
const store = configureStore({
	reducer,
    middleware: middleware
});

export default store;
