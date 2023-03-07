import './profilecard.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { followUser, unfollowUser } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';

function ProfileCard({ author, photo, user }) {
	const dispatch = useDispatch();
	const { isFollowing } = useSelector((state) => {
		let isFollowing = false;

		if (user && author) {
			isFollowing = user.following.some(
				({ id }) => `${id}` === `${author.id}`
			);
		}

		return {
			isFollowing,
		};
	});
	const follow = () => {
		dispatch(followUser(author.id));
	};

	const unfollow = () => {
		dispatch(unfollowUser(author.id));
	};

	return (
		<div>
			<div className='container'>
				<div className='svg-background'></div>
				<div className='svg-background2'></div>
				<div className='circle'></div>
				<img className='profile-img' src={author.image} alt='' />
				<div className='text-container'>
					<div className='Author-Name'>
						<NavLink
							className='Author'
							to={`/users/${author.id}`}
							activeClassName='active'
						>
							{author.username}
						</NavLink>
						<div>
							{user.id !== author.id && (
								<button
									className={
										isFollowing
											? 'grey-button'
											: 'blue-button'
									}
									onClick={isFollowing ? unfollow : follow}
								>
									{isFollowing ? '- Unfollow' : '+ Follow'}
								</button>
							)}
						</div>
					</div>

					<h1 className='title-text'>{photo.title}</h1>
					<p className='desc-text'>{photo.description}</p>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
