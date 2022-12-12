const apiBase = process.env.REACT_APP_API_URL;

export const signInAPI = apiBase+"/auth/postSignIn";
export const signUpAPI = apiBase+"/auth/postSignUp";
export const tokenRefreshAPI = apiBase+"/auth/postTokenRefresh";