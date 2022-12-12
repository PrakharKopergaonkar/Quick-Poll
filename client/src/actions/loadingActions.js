import { SET_LOADING, REMOVE_LOADING } from "../constants/loadingConstants";


export const setLoading = (msg, alertType, timeout = 5000) => (dispatch) => {
    dispatch({
        type: SET_LOADING,
    });
};

export const removeLoading = () => (dispatch) => {
    dispatch({
        type: REMOVE_LOADING,
    })
}