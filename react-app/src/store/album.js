// import { FULL_RESET } from "./full-reset";

// const EDIT_ALBUM = 'album/EDIT_ALBUM';
const LOAD_ALBUMS = 'album/LOAD_ALBUMS';
// const DELETE_ALBUM = 'album/DELETE_ALBUM';
// const ADD_ALBUM = 'album/ADD_ALBUM';

// export const editAlbum = (album) => {
//   return {
//     type: EDIT_ALBUM,
//     album,
//   };
// };

const loadAlbums = (albums) => {
	return {
		type: LOAD_ALBUMS,
		albums,
	};
};

// const addAlbum = (albums) => {
//   return {
//     type: ADD_ALBUM,
//     albums,
//   };
// };

// const deleteAlbum = (albums) => {
//   return {
//     type: DELETE_ALBUM,
//     albums,
//   };
// };

export const getAllAlbums = () => async (dispatch) => {
	const res = await fetch('/api/albums/');

	if (res.ok) {
		const albums = await res.json();
		dispatch(loadAlbums(albums));
	}
};

// export const getAllAlbumsByAUser = (userId) => async (dispatch) => {
//   const res = await fetch(`/api/users/${userId}/albums`);

//   if (res.ok) {
//     const albums = await res.json();
//     dispatch(loadAlbums(albums));
//   }
// };

// export const getOneAlbumThunk = (albumId) => async (dispatch) => {
//   const res = await fetch(`/api/albums/${albumId}`);

//   if (res.ok) {
//     const album = await res.json();
//     dispatch(loadAlbums(album));
//     return album;
//   }
// };

// export const createAlbumThunk = (albums) => async (dispatch) => {
//   const res = await fetch("/api/albums/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(albums),
//   });

//   if (res.ok) {
//     const newData = await res.json();
//     dispatch(addAlbum(newData));
//     return newData;
//   } else {
//     const error = await res.json();
//     return error;
//   }
// };

// export const editAlbumThunk = (albumId, albumData) => async (dispatch) => {
//   const res = await fetch(`/api/albums/${albumId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(albumData),
//   });

//   if (res.ok) {
//     const albumData = await res.json();
//     dispatch(addAlbum(albumData));
//     return albumData;
//   } else {
//     const error = await res.json();
//     return error;
//   }
// };

// export const deleteAlbumThunk = (albumId) => async (dispatch) => {
//   const res = await fetch(`/api/albums/${albumId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (res.ok) {
//     dispatch(deleteAlbum(albumId));
//   }
// };

const initialState = {};

const albumsReducer = (state = initialState, action) => {
	//   let newState = { ...state };

	switch (action.type) {
		// case FULL_RESET:
		//   return { ...defaultState };

		// case EDIT_ALBUM:
		// 	const newState = { ...state };
		// 	newState[action.album.id] = action.album;
		// 	return newState;

		case LOAD_ALBUMS: {
			const newState = { ...state };
			action.albums.forEach((album) => {
				newState[album.id] = album;
			});

			return newState;
		}

		// case ADD_ALBUM: {
		// 	const newState = { ...state };
		// 	newState[action.albums.id] = action.albums;
		// 	return newState;
		// }
		// case DELETE_ALBUM: {
		// 	const newState = { ...state };
		// 	delete newState[action.albums];
		// 	return newState;
		// }
		default:
			return state;
	}
};

export default albumsReducer;

// export function selectMyAlbums(state) {
// 	const currentUser = state.session.user;

// 	if (!currentUser) {
// 		return [];
// 	}

// 	return Object.values(state.album).filter(
// 		({ userId: albumAuthorId }) => albumAuthorId === currentUser.id
// 	);
// }
