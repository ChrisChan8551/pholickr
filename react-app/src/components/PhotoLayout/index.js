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
	const numPhotos = photos.length;
	const selectedIndices = new Set();
	while (
		selectedIndices.size < MAX_PHOTO_COUNT &&
		selectedIndices.size < numPhotos
	) {
		const randomIndex = Math.floor(Math.random() * numPhotos);
		if (
			!selectedIndices.has(randomIndex) &&
			photos[randomIndex].title
				.toLowerCase()
				.includes(searchbarValue.toLowerCase())
		) {
			selectedIndices.add(randomIndex);
		}
	}
	const selectedPhotos = Array.from(selectedIndices).map((i) => photos[i]);
	return selectedPhotos;
}

// function getLimitedPhotosList(photos, searchbarValue = '') {
// 	const shuffledPhotos = photos.sort(() => 0.5 - Math.random());
// 	const selectedPhotos = shuffledPhotos
// 		.filter((photo) =>
// 			photo.title.toLowerCase().includes(searchbarValue.toLowerCase())
// 		)
// 		.slice(0, MAX_PHOTO_COUNT);
// 	return selectedPhotos;
// }

// function getLimitedPhotosList(photos, searchbarValue = '') {
// 	const selectedPhotos = [];
// 	const shuffledIndexes = shuffleArray([...Array(photos.length).keys()]);

// 	for (let i = 0; i < MAX_PHOTO_COUNT && i < shuffledIndexes.length; i++) {
// 		const photo = photos[shuffledIndexes[i]];
// 		if (photo.title.toLowerCase().includes(searchbarValue.toLowerCase())) {
// 			selectedPhotos.push(photo);
// 		}
// 	}

// 	return selectedPhotos;
// }

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function PhotoLayout() {
	const sessionUser = useSelector((state) => state.session.user);

	const allPhotos = useSelector((state) => Object.values(state.photo));
	const searchbarValue = useSelector(selectSearchbarValue);
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
		async function fetchPhotosAndAlbums() {
			await dispatch(getAllAlbums());
			await dispatch(getAllPhotos());
		}
		fetchPhotosAndAlbums();
	}, [dispatch]);

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
