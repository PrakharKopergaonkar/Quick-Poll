import axios from 'axios';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAuthDetails } from './actions/authActions';
import { removeLoading, setLoading } from './actions/loadingActions';
import './App.css';
import RoutesComponent from './routes/Routes';

// import { useDispatch, useSelector } from 'react-redux'
// import { loadAuthDetails } from './actions/authActions'
// import {Route} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(loadAuthDetails());
    const requestInterceptor = axios.interceptors.request.use(function (config) {
      dispatch(setLoading())
      return config;
    }, function (error) {
      dispatch(removeLoading());
      return Promise.reject(error);
    });

    const responseInterceptor = axios.interceptors.response.use(function (response) {
      dispatch(removeLoading());
      return response;
    }, function (error) {
      dispatch(removeLoading());
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    }


  }, [dispatch])

  return (
    <div className="App">
      <RoutesComponent />
    </div>
  );
}

export default App;
