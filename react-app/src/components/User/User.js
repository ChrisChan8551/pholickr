import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getAllPhotosByAUser } from '../../store/photo';
import { getOneUser, followUser, unfollowUser } from '../../store/user';
import GridLayout from '../GridLayout';
import { AddPinningControls } from '../PhotoLayout';
import ProfileCard from '../ProfileCard';

function User() {
	const { userId } = useParams();
	const [loadingStatus, setLoadingStatus] = useState('uninitialized');
	const [loadingError, setLoadingError] = useState(null);

	const { currentUser, otherUser, isFollowing, photos } = useSelector(
		(state) => {
			const currentUser = state.session.user;
			const otherUser = state.otherUser[userId];
			const photos = Object.values(state.photo).filter(
				({ userId: authorId }) => `${authorId}` === `${userId}`
			);

			let isFollowing = false;

			if (currentUser && otherUser) {
				isFollowing = currentUser && currentUser.following && currentUser.following.some(
					({ id }) => `${id}` === `${otherUser.id}`
				);
			}

			return {
				otherUser,
				currentUser,
				isFollowing,
				photos,
			};
		}
	);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userId && !otherUser && loadingStatus === 'uninitialized') {
			dispatch(getOneUser(userId));
		}
	}, [dispatch, userId, otherUser, loadingStatus]);

	useEffect(async () => {
		if (userId && loadingStatus === 'uninitialized') {
			try {
				setLoadingStatus('pending');
				await dispatch(getAllPhotosByAUser(userId));
				setLoadingStatus('success');
			} catch (err) {
				setLoadingStatus('failed');
				setLoadingError(err);
			}
		}
	}, [userId, loadingStatus, dispatch]);

	if (!userId) {
		return <Redirect to='/404' />;
	}

	if (!otherUser) {
		return null;
	}

	const follow = () => {
		dispatch(followUser(otherUser.id));
	};

	const unfollow = () => {
		dispatch(unfollowUser(otherUser.id));
	};

	const navigateToPhotoPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	return (
		<div className='photo-main-container'>
			<div className='photo-container'>
				<div className='full-width'>
					<div class='container bg-gradient'>
						<div class='svg-background'></div>
						<div class='svg-background2'></div>
						<div class='circle'></div>
						{/* <img
					class='menu-icon'
					src='https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png'
				/> */}
						<img class='profile-img' src={otherUser.image} alt='' />
						<div class='text-container'>
							<p class='title-text'>{photos.title}</p>
							<p class='info-text'>{otherUser.username}</p>
							{/* <p class='desc-text'> Description: {photos.description}</p> */}
							<button
								className={
									isFollowing ? 'grey-button' : 'blue-button'
								}
								onClick={isFollowing ? unfollow : follow}
							>
								{isFollowing ? ' - Unfollow' : '+ Follow'}
							</button>
							{/* <button className='blue-button modal-label'>
								+ Follow
							</button> */}
						</div>
					</div>
					<GridLayout
						items={photos}
						onItemClick={navigateToPhotoPage}
						renderItemActions={(photo, closeActionPopOver) => (
							<AddPinningControls
								photo={photo}
								onPinningDone={closeActionPopOver}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
export default User;
