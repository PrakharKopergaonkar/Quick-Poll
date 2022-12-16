import { Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLoading, removeLoading } from "../actions/loadingActions";


const PrivateRoute = ({children}) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const {loading, isAuthenticated} = auth;

	useEffect(() => {
		loading ? dispatch(setLoading()) : dispatch(removeLoading());
	}, [loading, dispatch])

	return loading ? <> </> : isAuthenticated ? children : <Navigate to="/login"/>
};

export default PrivateRoute;
