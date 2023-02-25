import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getAllPhotos } from '../../store/photo';
import { getAllAlbums, selectMyAlbums } from '../../store/album';
import { useDispatch } from 'react-redux';
import GridLayout from '../GridLayout';
import { useHistory } from 'react-router-dom';
import { addPinning } from '../../store/pinning';
import { selectSearchbarValue } from '../../store/searchbar';

const MAX_PHOTO_COUNT = 20;

function getLimitedPhotosList(photos, searchbarValue = '') {
	return photos
		.filter((photo) =>
			photo.title.toLowerCase().includes(searchbarValue.toLowerCase())
		)
		.slice(0, MAX_PHOTO_COUNT);
}

function PhotoLayout() {
	const sessionUser = useSelector((state) => state.session.user);
	const { searchbarValue, allPhotos } = useSelector((state) => {
		const searchbarValue = selectSearchbarValue(state);
		const allPhotos = Object.values(state.photo);

		return { searchbarValue, allPhotos };
	});

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
		dispatch(getAllPhotos());
		dispatch(getAllAlbums());
	}, [dispatch]);

	return (
		<div className='album-photo-container'>
			<div className='photo-main-container'>
				<div>
					<GridLayout
						items={photos}
						onItemClick={!!sessionUser && navigateToPhotoPage}
						// renderItemActions={
						//   !!sessionUser &&
						//   ((photo, closeActionPopOver) => (
						//     <>
						//       <AddPinningControls
						//         photo={photo}
						//         onPinningDone={closeActionPopOver}
						//       />
						//     </>
						//   ))
						// }
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

	return (
		<>
			<select
				style={{
					width: '180px',
				}}
				onChange={(event) => {
					setSaveTo(event.target.value);
				}}
			>
				{!saveTo && <option value=''>choose a album</option>}
				{myAlbums.map((album) => (
					<option
						key={album.id}
						selected={album.id === saveTo}
						value={album.id}
					>
						{album.title}
					</option>
				))}
			</select>
			<button
				className='blue-button'
				disabled={!saveTo}
				onClick={() => {
					dispatch(addPinning(saveTo, photo.id));
					onPinningDone();
				}}
			>
				confirm
			</button>
		</>
	);
}
