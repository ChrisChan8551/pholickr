import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
import LoginForm from './components/LoginFormModal';
// import SignUpForm from './components/SignupFormModal';
import SignUpForm from './components/SignupFormModal/SignUpForm';
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
		<div>
			<Navigation/>
			<Switch>
				{/* <Route exact path='/login'>
					<LoginForm />
				</Route> */}
				<Route exact path='/sign-up'>
					<SignUpForm />
				</Route>
				<ProtectedRoute exact path='/users'>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute exact path='/users/:userId'>
					<User />
				</ProtectedRoute>
				<Route exact path='/'>
					<h1>My Home Page</h1>
				</Route>
				<ProtectedRoute exact path='/photos'>
					<PhotoPage />
				</ProtectedRoute>
				<ProtectedRoute exact path='/photos/:photoId'>
					<PhotoPage />
				</ProtectedRoute>
				<ProtectedRoute exact path='/albums'>
					<AlbumPage />
				</ProtectedRoute>
				<ProtectedRoute exact path='/albums/:albumId'></ProtectedRoute>
				<ProtectedRoute></ProtectedRoute>
				{/* create photo form */}
				<ProtectedRoute></ProtectedRoute>
				{/* create album form */}
			</Switch>
		</div>
	);
}

export default App;
