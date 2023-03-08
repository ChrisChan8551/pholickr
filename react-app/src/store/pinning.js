import { replaceAlbum } from './album';

export const addPinning = (albumId, photoId) => async (dispatch) => {
	const res = await fetch(`/api/albums/${albumId}/photo/${photoId}`, {
		method: 'POST',
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(replaceAlbum(data));
	}
};

export const removePinning = (albumId, photoId) => async (dispatch) => {
	const res = await fetch(`/api/albums/${albumId}/photo/${photoId}`, {
		method: 'DELETE',
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(replaceAlbum(data));
	}
};
