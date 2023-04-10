import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getAllPhotos } from '../../store/photo';
import { selectMyAlbums } from '../../store/album';
import { useDispatch } from 'react-redux';
import GridLayout from '../GridLayout';
import { useHistory } from 'react-router-dom';
import { addPinning } from '../../store/pinning';
import { selectSearchbarValue } from '../../store/searchbar';

const MAX_PHOTO_COUNT = 30;

function getLimitedPhotosList(photos, searchbarValue = '') {
	const filteredPhotos = photos.filter((photo) =>
		photo.title.toLowerCase().includes(searchbarValue.toLowerCase())
	);
	const photoCount = Math.min(filteredPhotos.length, MAX_PHOTO_COUNT);
	const selectedPhotos = [];

	while (selectedPhotos.length < photoCount) {
		const randomIndex = Math.floor(Math.random() * filteredPhotos.length);
		selectedPhotos.push(filteredPhotos[randomIndex]);
		filteredPhotos.splice(randomIndex, 1);
	}

	return selectedPhotos;
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
		const unlisten = history.listen(() => {
			if (history.location.pathname === '/') {
				setHasRenderedPhotos(false);
				dispatch(getAllPhotos());
			}
		});
		return unlisten;
	}, [dispatch, history]);

	useEffect(() => {
		if (!hasRenderedPhotos && allPhotos.length) {
			setHasRenderedPhotos(true);
			setPhotos(getLimitedPhotosList(allPhotos));
		}
	}, [hasRenderedPhotos, allPhotos]);

	useEffect(() => {
		async function fetchPhotosAndAlbums() {
			await dispatch(getAllPhotos());
		}
		fetchPhotosAndAlbums();
	}, [dispatch]);


	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Enter') {
				lastSearchRef.current = searchbarValue;
				setPhotos(getLimitedPhotosList(allPhotos, searchbarValue));
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);


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
		dispatch(addPinning(saveTo, photo?.id));
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
				{myAlbums?.map((album) => (
					<option key={album?.id} value={album?.id}>
						{album?.title}
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
