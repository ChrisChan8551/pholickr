import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	getAllPhotos,
	deleteAPhoto,
	selectMyPhotos,
	getOnePhoto,
	getAllPhotosByAUser,
} from '../../store/photo';
import GridLayout from '../GridLayout';
// import { AddPinningControls } from "../../PhototerestLayout";
import CreatePhotoModal from '../CreatePhotoModal';

function PhotoPage() {
	const currentUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	// const photos = Object.values(useSelector((state) => state.photo))
	const photos = useSelector(selectMyPhotos);
	const [showCreatePhotoForm, setShowCreatePhotoForm] = useState(false);
	let createPhotoForm;
	// const photos = useSelector((state) => state.photo)

	console.log('****************PHOTOS***************', photos);
	// console.log('****************CURRENT USER***************',currentUser.id)
	console.log('****************PHOTO USER ID***************', photos[currentUser.id]);

	useEffect(() => {
		dispatch(getAllPhotos());
	}, [dispatch]);

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

	// const navigateToCreatePhotoForm = async (e) => {
	//   history.push("/CreatePhoto");
	// };

	const navigateToPhotoPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	return (
		<div>
			<div>
				<h1>PHOTOS I'VE CREATED</h1>
				{createPhotoForm}
				{!showCreatePhotoForm && currentUser?.id && (
					<button
						className='add-Photo-button'
						onClick={(e) => {
							setShowCreatePhotoForm(true);
						}}
					>
						Create Photo
					</button>
				)}

				<GridLayout
					items={photos}
					onItemClick={navigateToPhotoPage}
					renderItemActions={(photo, closeActionPopOver) => (
						<>
							{/* <AddPinningControls
                 photo={photo}
                 onPinningDone={closeActionPopOver}
                 /> */}

							<button
								className='regular-button'
								onClick={() => {
									dispatch(deleteAPhoto(photo.id));
									closeActionPopOver();
								}}
							>
								Delete
							</button>
						</>
					)}
				/>
			</div>
		</div>
	);
}

export default PhotoPage;
