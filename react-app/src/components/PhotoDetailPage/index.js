import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
// import {NavLink} from 'react-router-dom'
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAPhoto, getOnePhoto } from '../../store/photo';
// import "./PhotoDetailPage.css";
import { getOneUser } from '../../store/user';
import EditPhotoModal from '../EditPhotoModal';
import ProfileCard from '../ProfileCard';

function PhotoDetailPage() {
	const { photoId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	// const photo = useSelector((state) => state.photo[photoId]);
	// const currentUser = useSelector((state) => state.session.user);
	// const photoAuthor = useSelector((state) => state.otherUser[photo?.userId]);
	const [showEditPhotoForm, setShowEditPhotoForm] = useState(false);
	let photoEditForm;
	const { photo, photoAuthor, currentUser } = useSelector((state) => {
		const photo = state.photo[photoId];
		const photoAuthor = state.otherUser[photo?.userId];
		const currentUser = state.session.user;

		return {
			photo,
			photoAuthor,
			currentUser,
		};
	});

	useEffect(() => {
		dispatch(getOnePhoto(photoId));
	}, [photoId, dispatch]);

	useEffect(() => {
		if (photo?.userId && !photoAuthor) {
			dispatch(getOneUser(photo.userId));
		}
	}, [photo, photoAuthor,dispatch]);

	const deletePhoto = (e) => {
		e.preventDefault();

		dispatch(deleteAPhoto(photoId));

		history.push(`/photos`);
	};

	if (!currentUser) {
		return <Redirect to='/login' />;
	}

	if (!photoId) {
		return <Redirect to='/404' />;
	}

	if (!photo || !photoAuthor) return null;

	if (showEditPhotoForm && photo.userId === currentUser?.id) {
		photoEditForm = (
			<EditPhotoModal
				photo={photo}
				hideForm={() => setShowEditPhotoForm(false)}
			/>
		);
	}

	return (
		<div className='PhotoDetail--Page'>
			<div>
				{photoEditForm}
				{/* <h1>PHOTO DETAIL PAGE</h1> */}

				<div className='PhotoDetail--Image--Container'>
					<img
						className='PhotoDetail--Image'
						src={photo?.imageUrl} alt=''
					></img>
				</div>

				<div className='profile-container'>
					<div>
						<ProfileCard author={photoAuthor} photo={photo} />
						{/* <div>
							<strong>Title: </strong> {photo?.title}
						</div>

						<div>
							<strong>Author: </strong> {photoAuthor.username}
						</div>

						<div>
							<strong>Description: </strong> {photo?.description}
						</div> */}
					</div>
				</div>
			</div>
			{!showEditPhotoForm && currentUser?.id === photo?.userId && (
				<div>
					{/* <Link to={`/photos/${photo.id}`}> */}
					<button
						className='blue-button'
						onClick={() => setShowEditPhotoForm(true)}
					>
						Edit Photo
					</button>
					<button
						className='grey-button'
						type='button'
						onClick={deletePhoto}
					>
						Delete Photo
					</button>
					{/* </Link> */}
				</div>
			)}
		</div>
	);
}

export default PhotoDetailPage;
