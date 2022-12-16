import axios from "axios"
import { setAlert } from "./alertActions";
import { SET_POLLS, DELETE_POLL } from "../constants/pollConstants";
import { errorGetPolls, errorDeletePolls } from "../config/errorMessage";
import { getPolls, deletePoll as deletePollApi } from "../config/API";
import { deletePollMessage } from "../config/successMessage";
export const getAllPolls = (userID) => async (dispatch) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("tokenLivePoll")}` },
        }

        const res = await axios.get(getPolls + "/" + userID, config);

        dispatch({
            type: SET_POLLS,
            payload: res?.data?.data ? res?.data?.data : []
        })

    } catch (error) {
        const { errors } = error.response.data

        if (Array.isArray(errors)) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg, "error"))
            })
        } else {
            const message = error?.response?.data?.message;
            dispatch(setAlert(message ? message : errorGetPolls, "error"))
        }
    }
}

export const deletePoll = (pollID) => async (dispatch) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("tokenLivePoll")}` },
        }

        await axios.delete(deletePollApi + "/" + pollID, config)

        dispatch({
            type: DELETE_POLL,
            payload: pollID
        })

        dispatch(setAlert(deletePollMessage, "success"))

    } catch (error) {
        dispatch(setAlert(errorDeletePolls, "error"))
    }
}
