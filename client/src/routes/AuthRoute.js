import React from "react";
import {
	Navigate,
	Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";

// import Loader from '../components/loader/Loader'
const AuthRoute = ({ element: Component, ...rest }) => {
	const auth = useSelector((state) => state.auth);
	const { isAuthenticated } = auth;
	return !isAuthenticated ? <Outlet/> : <Navigate to="/"/>
};

export default AuthRoute;
