import './profilecard.css';
import React from 'react';
// import { useEffect, useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { getOneUser } from '../../store/user';

function ProfileCard({ author, photo }) {
	// const dispatch = useDispatch();
	// const history = useHistory();

	return (
		<div>
			<div class='container'>
				<div class='svg-background'></div>
				<div class='svg-background2'></div>
				<div class='circle'></div>
				{/* <img
					class='menu-icon'
					src='https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png'
				/> */}
				<img class='profile-img' src={author.image} alt=''/>
				<div class='text-container'>
					<p class='title-text'>{photo.title}</p>
					{/* <p class='info-text'>Author: {author.username}</p> */}
					<NavLink to={`/users/${author.id}`}>Author: {author.username}</NavLink>
					<p class='desc-text'> Description: {photo.description}</p>
                    {/* <button className='blue-button modal-label'>+ Follow</button> */}
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
