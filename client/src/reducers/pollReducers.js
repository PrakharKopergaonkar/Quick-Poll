import { DELETE_POLL, SET_POLLS } from "../constants/pollConstants";

const initialState = {
	polls: []
};

export const pollReducer = (state = initialState, action) => {
	console.log(state, action)
	const { type, payload } = action;
	switch (type) {
		case SET_POLLS:
            return {
                polls:payload
            }
		case DELETE_POLL:
			return {
				polls: state.polls.filter((poll) => poll._id !== payload)
			}
		default:
			return state;
	}
};
