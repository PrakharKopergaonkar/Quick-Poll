import axios from "axios" ;
import {setAlert} from './alertActions';
import {signUpAPI, tokenRefreshAPI, signInAPI} from "../config/API"
import {REGISTER_FAILURE, AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS, LOGOUT} from '../constants/authConstants'
import { successSignUp } from "../config/successMessage";
import { errorSignUp } from "../config/errorMessage";
import { Navigate } from "react-router-dom";

export const  postSignUp = (registrationFields) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const res = await axios.post(signUpAPI, registrationFields, config);

        dispatch(setAlert(successSignUp, "success"))
     
        localStorage.setItem("tokenLivePoll", res.data.token);
        localStorage.setItem("userLivePoll", res.data.user_id);
        localStorage.setItem("emailLivePoll", res.data.email);
        localStorage.setItem("nameLivePoll", registrationFields.name);

       Navigate("/login"); 
    }
    catch(error) {
        const message = error.response.data && error.response.data.message  ? error.response.data.message : errorSignUp 
        dispatch(setAlert( message, "error"))
        dispatch({
            type: REGISTER_FAILURE
        })   
    }
}

export const loadAuthDetails = () => async (dispatch) => {
	const config = {
		headers: {Authorization: `Bearer ${localStorage.getItem("tokenLivePoll")}`},
	};

	try {
		const res = await axios.get(tokenRefreshAPI, config);

		let payload = {
			token: res.data.token,
			userID: res.data.id,
			email: res.data.email,
		};

		localStorage.setItem("userLivePoll", res.data.id);
		localStorage.setItem("emailLivePoll", res.data.email);
		localStorage.setItem("tokenLivePoll", res.data.token)

		dispatch({
			type: USER_LOADED,
			payload,
		});

      
	} catch (err) {
       
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const postLogin = (loginFields) => async (dispatch) => {
    try {
        const res = await axios.post(signInAPI, loginFields);
        
        localStorage.setItem("tokenLivePoll", res.data.token);
        localStorage.setItem("userLivePoll", res.data.user_id);
        localStorage.setItem("emailLivePoll", res.data.email);
        localStorage.setItem("nameLivePoll", res.data.name);

        let payload = {
            email: res.data.email,
            token: res.data.token,
            userID: res.data.user_id,
            name: loginFields.name,
        };

        dispatch({
            type: LOGIN_SUCCESS,
            payload
        })

    }
    catch(error) {
        const {errors} = error.response.data

        if(Array.isArray(errors)) {
            errors.forEach((error) => {
                dispatch(setAlert(error.msg , "error"))        
            })
        } else {
            const message = error?.response?.data?.message; 
            dispatch(setAlert(message ? message : errorSignUp , "error"))
        }

        dispatch({
			type: AUTH_ERROR,
		});
    }
}

export const postLogout = () => (dispatch) => {
    localStorage.removeItem("tokenLivePoll");
    localStorage.removeItem("userLivePoll");
    localStorage.removeItem("emailLivePoll");
    localStorage.removeItem("nameLivePoll");

    dispatch({
        type: LOGOUT,
    });

    window.location.href = "/" 

}



