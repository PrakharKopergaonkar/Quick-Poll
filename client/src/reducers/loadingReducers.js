import { SET_LOADING, REMOVE_LOADING } from "../constants/loadingConstants";

const initialState = false;
export const loadingReducer = (state = initialState, action) => {
	const {type} = action;

	switch (type) {
		case SET_LOADING:
			return true;
		case REMOVE_LOADING:
			return false;
		default:
			return state;
	}
};
 