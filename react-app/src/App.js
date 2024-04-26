import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

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
                <Route exact path='/'>
                    {currentUser ? <PhotoLayout /> : <HomePage />}
                </Route>

                <ProtectedRoute exact path='/users'>
                    <UsersList />
                </ProtectedRoute>
                <ProtectedRoute exact path='/users/:userId'>
                    <User />
                </ProtectedRoute>
                <ProtectedRoute exact path='/photos'>
                    <PhotoPage />
                </ProtectedRoute>
                <ProtectedRoute exact path='/photos/:photoId'>
                    <PhotoDetailPage />
                </ProtectedRoute>
                <ProtectedRoute exact path='/albums'>
                    <AlbumsPage />
                </ProtectedRoute>
                <ProtectedRoute exact path='/albums/:albumId'>
                    <AlbumDetailPage />
                </ProtectedRoute>
            </Switch>
        </div>
    );
}

export default App;
