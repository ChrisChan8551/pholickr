import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// import {BrowserRouter} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// import LoginForm from './components/auth/LoginForm';
// import LoginForm from './components/LoginFormModal';
// import SignUpForm from './components/SignupFormModal';
import SignUpForm from './components/SignupFormModal/SignUpForm';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/User/UsersList';
import User from './components/User/User';
import PhotoPage from './components/PhotosPage';
import { authenticate } from './store/session';
import AlbumsPage from './components/AlbumsPage';
import AlbumDetailPage from './components/AlbumDetailPage';
import PhotoDetailPage from './components/PhotoDetailPage';
import PhotoLayout from './components/PhotoLayout';
import HomePage from './components/HomePage/HomePage';

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
			{!!currentUser && <Navigation loaded={loaded} />}
			<Switch>
				{/* <Route exact path='/login'>
					<LoginForm />
				</Route> */}
				<Route exact path='/sign-up'>
					<SignUpForm />
				</Route>
				<Route exact path='/users'>
					<UsersList />
				</Route>
				<Route exact path='/users/:userId'>
					<User />
				</Route>
				<Route exact path='/'>
					{currentUser ? <PhotoLayout /> : <HomePage />}
				</Route>
				<Route exact path='/photos'>
					<PhotoPage />
				</Route>
				<Route exact path='/photos/:photoId'>
					<PhotoDetailPage />
				</Route>
				<Route exact path='/albums'>
					<AlbumsPage />
				</Route>
				<Route exact path='/albums/:albumId'>
					<AlbumDetailPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
