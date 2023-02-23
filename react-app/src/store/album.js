import { FULL_RESET } from './full-reset';

const REPLACE_ALBUM = 'board/REPLACE_ALBUM';
const LOAD_ALL_ALBUMS = 'album/LOAD_ALL_ALBUMS';
const LOAD_ONE_ALBUM = 'album/LOAD_ONE_ALBUM';
const DELETE_ALBUM = 'album/DELETE_ALBUM';

export const replaceAlbum = (album) => {
	return {
		type: REPLACE_ALBUM,
		album,
	};
};

const loadAlbums = (albums) => {
	return {
		type: LOAD_ALL_ALBUMS,
		albums,
	};
};

const loadOneAlbum = (albums) => {
	return {
		type: LOAD_ONE_ALBUM,
		albums,
	};
};

const removeAlbum = (albumId) => {
	return {
		type: DELETE_ALBUM,
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
		dispatch(loadOneAlbum(album));
		return album;
	}
};

export const addAlbum = (albums) => async (dispatch) => {
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

const albumsReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case FULL_RESET:
			return { ...initialState };

		case REPLACE_ALBUM:
			newState[action.album.id] = action.album;
			return newState;
		case LOAD_ALL_ALBUMS: {
			action.albums.forEach((album) => {
				newState[album.id] = album;
			});
			return newState;
		}

		case LOAD_ONE_ALBUM:
			newState[action.albums.id] = action.albums;
			return newState;

		case DELETE_ALBUM:
			delete newState[action.albumId];
			return newState;

		default:
			return state;
	}
};

export default albumsReducer;

export function selectMyAlbums(state) {
	const currentUser = state.session.user;

	if (!currentUser) {
		return [];
	}

	return Object.values(state.album).filter(
		({ userId: albumAuthorId }) => albumAuthorId === currentUser.id
	);
}
