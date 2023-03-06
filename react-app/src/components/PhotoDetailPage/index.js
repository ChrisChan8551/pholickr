import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
// import {NavLink} from 'react-router-dom'
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAPhoto, getOnePhoto } from '../../store/photo';
import './PhotoDetailPage.css';
import { getOneUser } from '../../store/user';
import {
	getAllComments,
	getOneComment,
	addComment,
	editComment,
	deleteAComment,
	selectMyComments,
} from '../../store/comment';
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
	const [showEditCommentForm, setShowEditCommentForm] = useState(false);

	const [text, setText] = useState('');
	let photoEditForm;
	let commentEditForm;
	const myComments = useSelector(selectMyComments);
	const comments = Object.values(useSelector((state) => state.comment));
	const numComments = comments.filter(
		(comment) => comment.photoId === Number(photoId)
	);
	const [errors, setErrors] = useState([]);
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
	}, [photo, photoAuthor, dispatch]);

	useEffect(() => {
		dispatch(getAllComments());
	}, [dispatch]);

	if (!comments) {
		return null;
	}

	const deletePhoto = (e) => {
		e.preventDefault();

		dispatch(deleteAPhoto(photoId));

		history.push(`/photos`);
	};
	const createComment = async (e) => {
		if (e.keyCode === 13 && text.trimEnd() !== '') {
			// Enter key
			e.preventDefault();
			// console.log(
			// 	'***********photoId*****FRONT END*******',
			// 	photoId,
			// 	text
			// );
			const payload = { text };
			let data = await dispatch(addComment(photoId, payload));
			setText('');
			if (data.errors) {
				setErrors([...Object.values(data.errors)]);
			} else {
				history.push(`/photos/${photoId}`);
			}
		}
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
	// console.log('****comments****', comments);
	// console.log('************CURRENT USER ID****************', currentUser.id);
	// console.log(
	// 	'************CURRENT AUTHOR ID****************',
	// 	photoAuthor.id
	// );
	// console.log('************CURRENT PHOTO ID****************', photoId);
	return (
		<div className='PhotoDetail--Page'>
			<div>
				{photoEditForm}
				{/* <h1>PHOTO DETAIL PAGE</h1> */}
				<div className='PhotoDetail--Image--Container'>
					<img
						className='PhotoDetail--Image'
						src={photo?.imageUrl}
						alt=''
					></img>
				</div>
				{!showEditPhotoForm && currentUser?.id === photo?.userId && (
					<div>
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
					</div>
				)}
				<div className='g-container'>
					<div className='item item1'>
						{' '}
						<ProfileCard
							author={photoAuthor}
							photo={photo}
							user={currentUser}
						/>
					</div>
					<div className='item item2'>
						{/* Details Box */}
						<div className='comments g2'>
							<p>Comments: {numComments.length}</p>
						</div>
					</div>
					<div className='comments-box'>
						{/* <strong>Comments</strong> */}
						<div className='list-comments'>
							{comments &&
								comments.map((comment, idx) => {
									return (
										comment.photoId === Number(photoId) && (
											<div
												className='comment-list'
												key={`${comment.id}`}
											>
												<div
													className='comment-list'
													key={`${comment.id}`}
												>
													<div className='user-comment'>{`${comment.text}`}</div>
													{Number(comment.userId) ===
														Number(
															currentUser.id
														) && (
														<img
															className='trash-icon'
															src='/trash-icon.png'
															alt=''
															onClick={() =>
																dispatch(
																	deleteAComment(
																		comment.id
																	)
																)
															}
														/>
													)}
												</div>
												{/* comment user ID ={' '}
												{`${comment.userId}`}
												Current user id ={' '}
												{`${currentUser.id}`}
												comment.photoId ={' '}
												{`${comment.photoId}`} */}
												{/* <img className='trash-icon'src='/trash-icon.png' alt=''/> */}
												<></>
											</div>
										)
									);
								})}
							<form className='comment-form'>
								{/* <ul>
									{errors.map((error, idx) => (
										<li className='edit-errors' key={idx}>
											{error}
										</li>
									))}
								</ul> */}

								<label>
									{/* Comment */}
									<textarea
										onKeyUp={createComment}
										type='text'
										placeholder='Add a comment'
										className='comment-input'
										value={text}
										required
										onChange={(e) =>
											setText(e.target.value)
										}
									/>
								</label>
							</form>
						</div>
					</div>
				</div>
				<div>
					<div className='profile-container gcontainer'>
						<div className='comment-container g1'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PhotoDetailPage;
