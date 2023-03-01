import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getAllPhotosByAUser } from '../../store/photo';
import {
	getOneUser,
	followUser,
	unfollowUser,
} from '../../store/user';
import GridLayout from '../GridLayout';
// import { AddPinningControls } from '../PhotoLayout';

function User() {
	const { userId } = useParams();
	const [loadingStatus, setLoadingStatus] = useState('uninitialized');
	const [setLoadingError] = useState(null);

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

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (userId && !otherUser && loadingStatus === 'uninitialized') {
			dispatch(getOneUser(userId));
		}
	}, [userId, otherUser,dispatch,loadingStatus]);

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
	}, [dispatch, userId, loadingStatus,setLoadingError]);

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

	return (
		<div>
			<ul>
				<li>
					<strong>User Id</strong> {userId}
				</li>
				<li>
					<strong>Username</strong> {otherUser.username}
				</li>
				<li>
					<strong>Email</strong> {otherUser.email}
				</li>
			</ul>
			<button
				className={isFollowing ? 'grey-button' : 'blue-button'}
				onClick={isFollowing ? unfollow : follow}
			>
				{isFollowing ? '- Unfollow' : '+ Follow'}
			</button>
			<GridLayout
				items={photos}
				onItemClick={navigateToPinPage}

			/>
		</div>
	);
}
export default User;
