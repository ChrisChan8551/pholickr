import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAPhoto, getOnePhoto } from '../../store/photo';
// import "./PhotoDetailPage.css";
import { getOneUser } from '../../store/session';
import EditPhotoModal from '../EditPhotoModal';

function PhotoDetailPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { photoId } = useParams();
	const photo = useSelector((state) => state.photo[photoId]);
	const currentUser = useSelector((state) => state.session.user);
	const [showEditPhotoForm, setShowEditPhotoForm] = useState(false);
	let photoEditForm;
	// const { photo, photoAuthor, currentUser } = useSelector((state) => {
	// 	const photo = state.photo[photoId];
	// 	const photoAuthor = state.otherUser[photo?.userId];
	// 	const currentUser = state.session.user;

	// 	return {
	// 		photo,
	// 		photoAuthor,
	// 		currentUser,
	// 	};
	// });

	useEffect(() => {
		dispatch(getOnePhoto(photoId));
	}, [photoId, dispatch]);

	const deletePhoto = (e) => {
		e.preventDefault();

		dispatch(deleteAPhoto(photoId));

		history.push(`/photos`);
	};

	// useEffect(() => {
	// 	if (photo?.userId && !photoAuthor) {
	// 		dispatch(getOneUser(photo.userId));
	// 	}
	// }, [photo, photoAuthor]);

	// if (!currentUser) {
	// 	return <Redirect to='/login' />;
	// }

	// if (!photoId) {
	// 	return <Redirect to='/404' />;
	// }

	// if (!photo || !photoAuthor) {
	// 	return null;
	// }

	if (showEditPhotoForm && photo.userId === currentUser?.id) {
		photoEditForm = (
			<EditPhotoModal
				photo={photo}
				hideForm={() => setShowEditPhotoForm(false)}
			/>
		);
	}

	return (
		<ul className='PhotoDetail--Page'>
			<div>
				{photoEditForm}
				<h1>PHOTO DETAIL PAGE</h1>

				<div className='PhotoDetail--Image--Container'>
					<img
						className='PhotoDetail--Image'
						src={photo?.imageUrl}
					></img>
				</div>

				<li>
					<strong>Title: </strong> {photo?.title}
				</li>

				{/* <li>
					<strong>Author: </strong>{' '}
					<NavLink to={`/users/${photo.userId}`}>
						{photo.username}
					</NavLink>
				</li> */}

				<li>
					<strong>Description: </strong> {photo?.description}
				</li>
			</div>

			{!showEditPhotoForm && currentUser?.id === photo?.userId && (
				<div>
					{/* <Link to={`/photos/${photo.id}`}> */}
					<button className='regular-button' onClick={()=> setShowEditPhotoForm(true)}>
						Edit Photo
					</button>
					<button
						className='create-button'
						type='button'
						onClick={deletePhoto}
					>
						Delete Photo
					</button>
					{/* </Link> */}
				</div>
			)}
		</ul>
	);
}

export default PhotoDetailPage;
