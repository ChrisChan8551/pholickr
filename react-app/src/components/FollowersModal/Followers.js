import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './followers.css';

function Followers() {
	const history = useHistory();
	const allMyFollowers = useSelector(
		(state) => state.session.user?.followers || []
	);
	console.log('***** FOLLOWERS PAGES ****', allMyFollowers);

	return (
		<div className='follow-container'>
			<div>
				<h1>Followers</h1>
				<div className='follow-container'>
					{allMyFollowers.map((follower) => {
						return (
							<button
								onClick={() =>
									history.push(`/users/${follower.id}`)
								}
								className='profile-button'
							>
								<div>
									<img
										className='profile-image'
										src={follower.image}
										alt=''
									/>
								</div>

								<div className='profile-username'>
									{/* <h3>
								{' '}
								{follower.firstName} {follower.lastName}
							</h3> */}
									<h4>{follower.username}</h4>
								</div>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Followers;
