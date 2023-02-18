import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
import LoginForm from './components/LoginFormModal'
import SignUpForm from './components/auth/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import PhotoPage from './components/PhotosPage';
import { authenticate } from './store/session';
import AlbumPage from './components/AlbumsPage';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Navigation />
			<Switch>
				<Route path='/login' exact={true}>
					<LoginForm />
				</Route>
				<Route path='/sign-up' exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path='/users' exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path='/users/:userId' exact={true}>
					<User />
				</ProtectedRoute>
				<Route path='/' exact={true}>
					<h1>My Home Page</h1>
				</Route>
				<Route path='/photos' exact={true}>
					<PhotoPage />
				</Route>
				<Route path='/albums' exact={true}>
					<AlbumPage/>
				</Route>
				<Route></Route>
				<Route></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
