import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums } from '../../store/album';
import Footer from '../Footer';
import {
	deleteAPhoto,
	selectMyPhotos,
	getAllPhotosByAUser,
} from '../../store/photo';
import GridLayout from '../GridLayout';
import { AddPinningControls } from '../PhotoLayout';
import CreatePhotoModal from '../CreatePhotoModal';

function PhotoPage() {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const photos = useSelector(selectMyPhotos);
	const [showCreatePhotoForm, setShowCreatePhotoForm] = useState(false);
	let createPhotoForm;

	useEffect(() => {
		if (currentUser) {
			dispatch(getAllPhotosByAUser(currentUser.id));
			dispatch(getAllAlbums());
		}
	}, [dispatch, currentUser]);

	useEffect(() => {
		setShowCreatePhotoForm(false);
	}, [dispatch]);

	if (!photos) {
		return null;
	}

	if (showCreatePhotoForm && currentUser?.id) {
		createPhotoForm = (
			<CreatePhotoModal
				album={null}
				hideForm={() => setShowCreatePhotoForm(false)}
			/>
		);
	}

	const navigateToPhotoPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	const deletePhoto = (photo) => {
		dispatch(deleteAPhoto(photo));
	};

	return (
		<div className='photo-main-container'>
			<div className='photo-container'>
				<div className='full-width'>
					<div>
						<h1>My Photos</h1>
					</div>
					{createPhotoForm}
					{!showCreatePhotoForm && currentUser?.id && (
						<button
							className='blue-button'
							onClick={(e) => {
								setShowCreatePhotoForm(true);
							}}
						>
							Add Photo
						</button>
					)}
				</div>
				<GridLayout
					items={photos}
					onItemClick={navigateToPhotoPage}
					renderItemActions={(photo, closeActionPopOver) => (
						<>
							<AddPinningControls
								photo={photo}
								onPinningDone={closeActionPopOver}
							/>

							<button
								className='grey-button'
								onClick={() => {
									deletePhoto(photo.id);
									closeActionPopOver();
								}}
							>
								Delete
							</button>
						</>
					)}
				/>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default PhotoPage;
