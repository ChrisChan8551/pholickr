import { faCropSimple } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams, NavLink } from 'react-router-dom';
import { getAllPhotosByAUser } from '../../store/photo';
import { getOneUser, followUser, unfollowUser } from '../../store/user';
import GridLayout from '../GridLayout';
import FollowersModal from '../FollowersModal';
// import { AddPinningControls } from '../PhotoLayout';

function User() {
	const { userId } = useParams();
	const [loadingStatus, setLoadingStatus] = useState('uninitialized');
	const [setLoadingError] = useState(null);
	const [showFollowersModal, setShowFollowersModal] = useState(false);
	const { currentUser, otherUser, isFollowing, photos } = useSelector(
		(state) => {
			const currentUser = state.session.user;
			const otherUser = state.otherUser[userId];
			const photos = Object.values(state.photo).filter(
				({ userId: authorId }) => `${authorId}` === `${userId}`
			);

			let isFollowing = false;

			if (currentUser && otherUser) {
				isFollowing = currentUser.following.some(
					({ id }) => `${id}` === `${otherUser.id}`
				);
			}
			// console.log('***********currentUser***************', currentUser);
			// console.log('***********otherUser***************', otherUser);
			// console.log('***********isFollowing***************', isFollowing);
			// console.log(
			// 	'***********currentUser.following***************',
			// 	currentUser.following
			// );

			return {
				otherUser,
				currentUser,
				isFollowing,
				photos,
			};
		}
	);
	const toggleFollowersModal = () => {
		setShowFollowersModal(!showFollowersModal);
	};

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userId && !otherUser && loadingStatus === 'uninitialized') {
			dispatch(getOneUser(userId));
		}
	}, [userId, otherUser, dispatch, loadingStatus]);

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
		} else if (isFollowing !== null) {
			dispatch(getOneUser(userId));
		}
	}, [dispatch, userId, loadingStatus, setLoadingError, isFollowing]);

	if (!userId) {
		return <Redirect to='/404' />;
	}

	if (!otherUser) {
		return null;
	}

	if (!currentUser) {
		return null;
	}
	const follow = () => {
		dispatch(followUser(otherUser.id));
	};

	const unfollow = () => {
		dispatch(unfollowUser(otherUser.id));
	};

	const navigateToPinPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	// console.log('***********currentUser***************', currentUser);
	// console.log('***********otherUser***************', otherUser);
	// console.log('***********isFollowing***************', isFollowing);
	// console.log(
	// 	'***********currentUser.following***************',
	// 	currentUser.follower_id
	// );
	<FollowersModal
		user={otherUser}
		hideForm={() => setShowFollowersModal(false)}
		showForm={showFollowersModal}
	/>;

	return (
		<div>
			<div className='photo-main-container'>
				{showFollowersModal && (
					<FollowersModal
						user={otherUser}
						hideForm={setShowFollowersModal}
					/>
				)}
				<div className='container'>
					<div className='svg-background'></div>
					<div className='svg-background2'></div>
					<div className='circle'></div>
					{/* <img
					className='menu-icon'
					src='https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png'
				/> */}

					<img className='profile-img' src={otherUser.image} alt='' />
					<div className='text-container'>
						<strong> Author:</strong> {otherUser.username}
						<p>
							<button onClick={toggleFollowersModal}>
								<strong>Followers:</strong>
							</button>{' '}
							{otherUser.followers?.length || 0}
						</p>
						<p>
							<strong>Following:</strong>{' '}
							{otherUser.following?.length || 0}
						</p>
						{currentUser.id !== otherUser.id && (
							<button
								className={
									isFollowing ? 'grey-button' : 'blue-button'
								}
								onClick={isFollowing ? unfollow : follow}
							>
								{isFollowing ? '- Unfollow' : '+ Follow'}
							</button>
						)}
					</div>
				</div>
			</div>
			<div className='photo-container'>
				<GridLayout items={photos} onItemClick={navigateToPinPage} />
			</div>
		</div>
	);
}
export default User;
