import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Following() {
	const history = useHistory();
	const allMyFollowing = useSelector(
		(state) => state.session.user?.following || []
	);
	console.log('***** FOLLOWING PAGES ****', allMyFollowing);

	return (
		<div className='follow-container'>
			<div>
				<h1>Following</h1>
				{allMyFollowing.map((following) => {
					return (
						<button
							onClick={() =>
								history.push(`/users/${following.id}`)
							}
							className='profile-button'
						>
							<div className='profile-image'>
								<img
									className='profile-image'
									src={following.image}
									alt=''
								/>
							</div>

							<div className='profile-username'>
								{/* <h3>
								{' '}
								{following.firstName} {following.lastName}
							</h3> */}
								<h4>{following.username}</h4>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default Following;
