import { FULL_RESET } from './full-reset';

const LOAD_ALL_PHOTOS = 'photo/LOAD_ALL_PHOTOS';

const LOAD_ONE_PHOTO = 'photo/LOAD_ONE_PHOTO';

const REMOVE_PHOTO = 'photo/REMOVE_PHOTO';

const loadPhotos = (photos) => {
	return {
		type: LOAD_ALL_PHOTOS,
		photos,
	};
};

const loadOnePhoto = (photos) => {
	return {
		type: LOAD_ONE_PHOTO,
		photos,
	};
};

const removePhoto = (photoId) => {
	return {
		type: REMOVE_PHOTO,
		photoId,
	};
};

export const getAllPhotos = () => async (dispatch) => {
	const response = await fetch('/api/photos/');
	if (response.ok) {
		// const photos = photosObj.Photos
		const photos = await response.json();
		// console.log(photos)
		dispatch(loadPhotos(photos));
	}
};

export const getAllPhotosByAUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/photos`);

	if (response.ok) {
		const photos = await response.json();
		dispatch(loadPhotos(photos));
	}
};

export const getOnePhoto = (photoId) => async (dispatch) => {
	const response = await fetch(`/api/photos/${photoId}`);

	if (response.ok) {
		const photo = await response.json();
		dispatch(loadOnePhoto(photo));
		return photo;
	}
};

export const addPhoto = (photos) => async (dispatch) => {
	const response = await fetch('/api/photos/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(photos),
	});

	if (response.ok) {
		const photo = await response.json();
		dispatch(loadOnePhoto(photo));
		return photo;
	} else {
		const error = await response.json();
		return error;
	}
};

export const editPhoto = (photoId, photoData) => async (dispatch) => {
	const response = await fetch(`/api/photos/${photoId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(photoData),
	});
	if (response.ok) {
		const photoData = await response.json();
		dispatch(loadOnePhoto(photoData));
		return photoData;
	} else {
		const error = await response.json();
		return error;
	}
};

export const deleteAPhoto = (photoId) => async (dispatch) => {
	const response = await fetch(`/api/photos/${photoId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		dispatch(removePhoto(photoId));
	}
};

const initialState = {};

const photosReducer = (state = initialState, action) => {
	switch (action.type) {
		case FULL_RESET: {
			return { ...initialState };
		}

		case LOAD_ALL_PHOTOS: {
			const newState = {};
			action.photos.forEach((photo) => {
				newState[photo.id] = photo;
			});
			return newState;
		}

		case LOAD_ONE_PHOTO: {
			const newState = { ...state };
			newState[action.photos.id] = action.photos;
			return newState;
		}

		case REMOVE_PHOTO: {
			const newState = { ...state };
			delete newState[action.photoId];
			return newState;
		}

		default:
			return state;
	}
};

export default photosReducer;

export function selectMyPhotos(state) {
	const currentUser = state.session.user;

	if (!currentUser) {
		return [];
	}

	return Object.values(state.photo).filter(
		({ userId: photoAuthorId }) => photoAuthorId === currentUser.id
	);
}
