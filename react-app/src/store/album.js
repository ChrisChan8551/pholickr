import { FULL_RESET } from './full-reset';

const REPLACE_ALBUM = 'board/REPLACE_ALBUM';
const LOAD_ALBUMS = 'album/LOAD_ALBUMS';
const REMOVE_ALBUM = 'album/REMOVE_ALBUM';
const ADD_ALBUM = 'board/ADD_ALBUM';

export const replaceAlbum = (album) => {
	return {
		type: REPLACE_ALBUM,
		album,
	};
};

const loadAlbums = (albums) => {
	return {
		type: LOAD_ALBUMS,
		albums,
	};
};

const addAlbum = (albums) => {
	return {
		type: ADD_ALBUM,
		albums,
	};
};

const removeAlbum = (albumId) => {
	return {
		type: REMOVE_ALBUM,
		albumId,
	};
};

export const getAllAlbums = () => async (dispatch) => {
	const res = await fetch('/api/albums/');

	if (res.ok) {
		const albums = await res.json();
		dispatch(loadAlbums(albums));
	}
};

export const getAllAlbumsByAUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/albums`);

	if (res.ok) {
		const albums = await res.json();
		dispatch(loadAlbums(albums));
	}
};

export const getOneAlbum = (albumId) => async (dispatch) => {
	const res = await fetch(`/api/albums/${albumId}`);

	if (res.ok) {
		const album = await res.json();
		dispatch(loadAlbums(album));
		return album;
	}
};

export const createAlbum = (albums) => async (dispatch) => {
	const res = await fetch('/api/albums/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(albums),
	});

	if (res.ok) {
		const album = await res.json();
		dispatch(addAlbum(album));
		return album;
	} else {
		const error = await res.json();
		return error;
	}
};

export const editAlbum = (albumId, albumData) => async (dispatch) => {
	const res = await fetch(`/api/albums/${albumId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(albumData),
	});

	if (res.ok) {
		const albumData = await res.json();
		dispatch(addAlbum(albumData));
		return albumData;
	} else {
		const error = await res.json();
		return error;
	}
};

export const deleteAlbum = (albumId) => async (dispatch) => {
	const res = await fetch(`/api/albums/${albumId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.ok) {
		dispatch(removeAlbum(albumId));
	}
};

const initialState = {};

const albumReducer = (state = initialState, action) => {
	switch (action.type) {
		case FULL_RESET:
			return { ...initialState };

		case REPLACE_ALBUM: {
			let newState = { ...state };
			newState[action.album.id] = action.album;
			return newState;
		}

		case LOAD_ALBUMS: {
			let newState = { ...state };
			action.albums.forEach((album) => {
				newState[album.id] = album;
			});
			return newState;
		}

		case ADD_ALBUM: {
			let newState = { ...state };
			newState[action.albums.id] = action.albums;
			return newState;
		}

		case REMOVE_ALBUM: {
			let newState = { ...state };
			delete newState[action.albumId];
			return newState;
		}

		default:
			return state;
	}
};

export default albumReducer;

export function selectMyAlbums(state) {
	const currentUser = state.session.user;

	if (!currentUser) {
		return [];
	}

	return Object.values(state.album).filter(
		({ userId: albumAuthorId }) => albumAuthorId === currentUser.id
	);
}
