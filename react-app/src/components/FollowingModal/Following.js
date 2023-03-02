import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import './following.css';

function Following({ user, hideForm }) {
	const history = useHistory();
	const allMyFollowing = useSelector(
		// (state) => user ? user.following : state.session.user?.following
		(state) => user.following
	);
	// console.log('***** FOLLOWING PAGES ****', allMyFollowing);

	return (
		<div className='follow-container'>
			<div>
				<h1>Following</h1>
				<div className='follow-container'>
					{allMyFollowing.map((following) => {
						return (
							<button
								key={following.id}
								onClick={() => {
									history.push(`/users/${following.id}`);
									hideForm();
								}}
								className='profile-button'
							>
								<div>
									<img
										className='profile-image'
										src={following.image}
										alt=''
									/>
								</div>

								<div className='profile-username'>
									{/* <h3>
								{' '}
								{follower.firstName} {follower.lastName}
							</h3> */}
									<h4>{following.username}</h4>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Following;
