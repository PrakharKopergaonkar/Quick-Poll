const apiBase = process.env.REACT_APP_API_URL;

export const signInAPI = apiBase+"/auth/postSignIn";
export const signUpAPI = apiBase+"/auth/postSignUp";
export const tokenRefreshAPI = apiBase+"/auth/postTokenRefresh";
export const createPollAPI = apiBase+ "/poll/postSubmitPoll";
export const getPolls = apiBase+"/poll/getAllUserPolls";
export const deletePoll = apiBase+"/poll/deletePoll";
