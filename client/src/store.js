import { configureStore, combineReducers} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {authReducer} from './reducers/authReducers';
import {alertReducer} from './reducers/alertReducers';
import { loadingReducer } from "./reducers/loadingReducers";

const reducer = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	loading: loadingReducer
});

const middleware = [thunk];
const store = configureStore({
	reducer,
    middleware: middleware
});

export default store;
