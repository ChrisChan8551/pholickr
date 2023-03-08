import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getAllPhotos } from '../../store/photo';
import { getAllAlbums, selectMyAlbums } from '../../store/album';
import { useDispatch } from 'react-redux';
import GridLayout from '../GridLayout';
import { useHistory } from 'react-router-dom';
import { addPinning } from '../../store/pinning';
import { selectSearchbarValue } from '../../store/searchbar';

const MAX_PHOTO_COUNT = 30;

function getLimitedPhotosList(photos, searchbarValue = '') {
	const shuffledPhotos = photos.sort(() => 0.5 - Math.random());
	const selectedPhotos = shuffledPhotos
		.filter((photo) =>
			photo.title.toLowerCase().includes(searchbarValue.toLowerCase())
		)
		.slice(0, MAX_PHOTO_COUNT);
	return selectedPhotos;
}

function PhotoLayout() {
	const sessionUser = useSelector((state) => state.session.user);
	// const { searchbarValue, allPhotos } = useSelector((state) => {
	// 	const searchbarValue = selectSearchbarValue(state);
	// 	const allPhotos = Object.values(state.photo);
	// 	return { searchbarValue, allPhotos };
	// });
	const searchbarValue = useSelector(selectSearchbarValue);
	const allPhotos = useSelector((state) => Object.values(state.photo));
	const [photos, setPhotos] = useState([]);
	const [hasRenderedPhotos, setHasRenderedPhotos] = useState(false);
	const lastSearchRef = useRef(searchbarValue);

	const dispatch = useDispatch();
	const history = useHistory();

	const navigateToPhotoPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	useEffect(() => {
		if (!hasRenderedPhotos && allPhotos.length) {
			setHasRenderedPhotos(true);
			setPhotos(getLimitedPhotosList(allPhotos));
		}
	}, [hasRenderedPhotos, allPhotos]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (lastSearchRef.current !== searchbarValue) {
				lastSearchRef.current = searchbarValue;
				setPhotos(getLimitedPhotosList(allPhotos, searchbarValue));
			}
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [allPhotos, searchbarValue]);

	useEffect(() => {
		async function fetchPhotosAndAlbums() {
			await dispatch(getAllAlbums());
			await dispatch(getAllPhotos());
		}
		fetchPhotosAndAlbums();
	}, [dispatch]);

	return (
		<div className='album-photo-container'>
			<div className='photo-main-container'>
				<div>
					<GridLayout
						items={photos}
						onItemClick={!!sessionUser && navigateToPhotoPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default PhotoLayout;

export function AddPinningControls({ photo, onPinningDone }) {
	const [saveTo, setSaveTo] = useState('');
	const dispatch = useDispatch();
	const myAlbums = useSelector(selectMyAlbums);

	const handleChange = (event) => {
		setSaveTo(event.target.value);
	};

	const handleSubmit = () => {
		dispatch(addPinning(saveTo, photo.id));
		onPinningDone();
	};

	return (
		<>
			<select
				style={{
					width: '180px',
				}}
				value={saveTo}
				onChange={handleChange}
			>
				<option value=''>choose an album</option>
				{myAlbums.map((album) => (
					<option key={album.id} value={album.id}>
						{album.title}
					</option>
				))}
			</select>
			<button
				className='blue-button'
				disabled={!saveTo}
				onClick={handleSubmit}
			>
				Confirm
			</button>
		</>
	);
}
