import React, { Fragment, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';

import AuthRoute from './AuthRoute'
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import("../screens/Home/Home"));
const Login = lazy(() => import("../screens/Login/Login"));
const SignUp = lazy(() => import("../screens/Signup/Signup"));
const CreatePoll = lazy(() => import("../screens/CreatePoll/CreatePoll"));
const Polls = lazy(() => import("../screens/Polls/Polls"));

const RoutesComponent = () => {
	return (
		<Fragment>
				<Suspense
					fallback={
						<></>
					}
				>
					<Routes>
						<Route path="/login" element={<AuthRoute />} exact>
							<Route path="/login" element={<Login />} exact />
						</Route>
						<Route path="/signup" element={<AuthRoute />} exact>
							<Route path="/signup" element={<SignUp />} exact />
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route path="/" element={<Home />} exact />
						</Route>
						<Route exact path='/polls' element={<PrivateRoute />}>
							<Route path="/polls" element={<Polls />} exact />
						</Route>
						<Route exact path='/create-poll' element={<PrivateRoute />}>
							<Route path="/create-poll" element={<CreatePoll />} exact />
						</Route>
					</Routes>
				</Suspense>
		</Fragment>
	)
}

export default RoutesComponent
