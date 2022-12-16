import {
	LOGIN_FAILURE,
	LOGIN_SUCCESS,
	LOGOUT,
	AUTH_ERROR,
	USER_LOADED,
} from "../constants/authConstants.js";

const initialState = {
	token: localStorage.getItem("tokenLivePoll"),
	isAuthenticated: null,
	loading: true,
	userID: localStorage.getItem("userLivePoll"),
};

export const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
		case USER_LOADED:
			return {
				...state,
				token: payload.token,
				isAuthenticated: true,
				loading: false,
				userID: payload.userID,
				email: payload.email,
				name: payload.name,
			};
		case AUTH_ERROR:
		case LOGIN_FAILURE:
		case LOGOUT:
			return {
				...state,
				token: "",
				isAuthenticated: false,
				loading: false,
				userID: "",
			};
		default:
			return state;
	}
};
