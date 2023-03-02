import './profilecard.css';
import React from 'react';
// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { getOneUser } from '../../store/user';

function ProfileCard({ author, photo, user }) {
	// const dispatch = useDispatch();
	// const history = useHistory();

	return (
		<div>
			<div className='container'>
				<div className='svg-background'></div>
				<div className='svg-background2'></div>
				<div className='circle'></div>
				{/* <img
					className='menu-icon'
					src='https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png'
				/> */}
				<img className='profile-img' src={author.image} alt='' />
				<div className='text-container'>
					<p className='title-text'>{photo.title}</p>
					{/* <p className='info-text'>Author: {author.username}</p> */}
					Author:{' '}
					<NavLink to={`/users/${author.id}`}>
						{' '}
						{author.username}
					</NavLink>
					<p className='desc-text'>
						{' '}
						Description: {photo.description}
					</p>
					{/* <button className='blue-button modal-label'>+ Follow</button> */}
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
