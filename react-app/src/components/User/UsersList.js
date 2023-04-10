import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/user';
import '../../components/ProfileCard/profilecard.css';

function UsersList() {
	const dispatch = useDispatch();
	const users = useSelector((state) => Object.values(state.otherUser));

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (!users) return null;

	return (
		<div>
			<h1>User List: </h1>
			{users.map((user) => (
				<div className='profile-container' key={user.id}>
					<img className='profile-img2' src={user.image} alt='' />

					<NavLink
						className='Author'
						to={`/users/${user.id}`}
						activeClassName='active'
					>
						{user.username}
					</NavLink>
				</div>
			))}
		</div>
	);
}

export default UsersList;
