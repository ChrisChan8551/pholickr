import React, { useEffect, useState } from 'react';
import { Redirect, useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAPhoto, getOnePhoto } from '../../store/photo';
import './PhotoDetailPage.css';
import { getOneUser, getAllUsers } from '../../store/user';
import {
	selectPhotoComments,
	addComment,
	deleteAComment,
} from '../../store/comment';
import EditPhotoModal from '../EditPhotoModal';
import ProfileCard from '../ProfileCard';
import EditCommentForm from '../EditComment/EditCommentForm';
import Footer from '../Footer';

function PhotoDetailPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { photoId } = useParams();
	const [showEditPhotoForm, setShowEditPhotoForm] = useState(false);
	const [showEditCommentForm, setShowEditCommentForm] = useState(false);
	const [text, setText] = useState('');
	const [currentComment, setCurrentComment] = useState('');
	//eslint-disable-next-line
	const [errors, setErrors] = useState([]);
	let photoEditForm;
	let editComment;
	const currentUser = useSelector((state) => state.session.user);
	const photo = useSelector((state) => state.photo[photoId]);
	const comments = Object.values(useSelector((state) => state.comment));
	const numComments = comments.filter(
		(comment) => comment.photoId === Number(photoId)
	);
	const users = Object.values(useSelector((state) => state.otherUser));
	const photoAuthor = useSelector((state) => state.otherUser[photo?.userId]);

	useEffect(() => {
		dispatch(getOnePhoto(photoId));
	}, [photoId, dispatch]);

	useEffect(() => {
		dispatch(selectPhotoComments(photoId));
	}, [dispatch, photoId]);

	useEffect(() => {
		if (photo?.userId && !photoAuthor) {
			dispatch(getOneUser(photo.userId));
		}
	}, [photo, photoAuthor, dispatch]);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (!comments) {
		return null;
	}

	if (!users) return null;

	const deletePhoto = (e) => {
		e.preventDefault();

		dispatch(deleteAPhoto(photoId));

		history.push(`/photos`);
	};

	const createComment = async (e) => {
		if (e.keyCode === 13 && text.trimEnd() !== '') {
			e.preventDefault();

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
		return <Redirect to='/' />;
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

	if (showEditCommentForm) {
		editComment = (
			<EditCommentForm
				comment={currentComment}
				hideForm={() => setShowEditCommentForm(false)}
			/>
		);
	}

	return (
		<div className='PhotoDetail--Page'>
			<div>
				{photoEditForm}

				<div className='PhotoDetail--Image--Container'>
					{photo?.imageUrl && (
						<img
							className='PhotoDetail--Image'
							src={photo?.imageUrl}
							alt=''
						></img>
					)}
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
					<div className='item2'>
						<div className='g2-container'>
							<div className='num-count'>
								{numComments.length}
							</div>
							<div className='num-label'>comments</div>
						</div>
					</div>
					<div className='comments-box'>
						<div className='list-comments'>
							{comments &&
								comments.map((comment, idx) => {
									const user = users?.find(
										(user) => user?.id === comment.userId
									);
									return (
										comment.photoId === Number(photoId) && (
											<div
												className='comment-list'
												key={`${comment.id}`}
											>
												<div className='user-comment'>
													<div>
														{user && (
															<img
																className='comment-image'
																src={
																	user?.image
																}
																alt=''
															/>
														)}{' '}
														<div></div>
													</div>
													<div className='user-name'>
														<div>
															<NavLink
																className='comment-author'
																to={`/users/${user?.id}`}
																activeClassName='active'
															>{`${user?.username}`}</NavLink>
														</div>
														<div className='comment-font'>
															{`${comment.text}`}
														</div>
													</div>
												</div>
												{Number(comment.userId) ===
													Number(currentUser?.id) && (
													<>
														<div className='comment-actions'>
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
															{!showEditCommentForm &&
																Number(
																	comment.userId
																) ===
																	Number(
																		currentUser?.id
																	) && (
																	<img
																		className='edit-icon'
																		src='/edit-icon.png'
																		alt=''
																		onClick={() => {
																			setShowEditCommentForm(
																				true
																			);
																			setCurrentComment(
																				comment
																			);
																		}}
																	/>
																)}
														</div>
													</>
												)}
											</div>
										)
									);
								})}
							{editComment}
							{!showEditCommentForm && (
								<form className='comment-form'>
									<label>
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
							)}
						</div>
					</div>
				</div>

				<div>
					<div className='profile-container gcontainer'>
						<div className='comment-container g1'></div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default PhotoDetailPage;
