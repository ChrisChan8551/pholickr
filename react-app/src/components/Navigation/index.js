import React, { useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
// import {useHistory} from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchbarValue, selectSearchbarValue } from '../../store/searchbar';

const Navigation = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	// const history = useHistory();
	const location = useLocation();

	const dispatch = useDispatch();
	const { currentUser, searchbarValue } = useSelector((state) => {
		const currentUser = state.session.user;
		const searchbarValue = selectSearchbarValue(state);
		return {
			currentUser,
			searchbarValue,
		};
	});

	// const navigateToHomePage = () => {
	// 	history.push('/');
	// };

	// const navigateToPhotos = () => {
	// 	history.push('/photos');
	// };

	// const navigateToAlbums = () => {
	// 	history.push('/albums');
	// };

	// const navigateToMyProfile = (event) => {
	//   event.stopPropagation();
	//   event.preventDefault();
	//   setOpen(false);
	//   history.push("/my-profile");
	// };

	return (
		<div className='main-container'>
			<div className='Nav-container'>
				<nav id='navigation-bar'>
					<div className='left_side'>
						<div className='icon'>
							<img className='photo-icon' src='/pho.png' alt='' />
						</div>
						<NavLink
							to='/'
							className='icon font-50 font-white font-bold font-decor-none nav-hover'
						>
							{' '}
							Pholickr{' '}
						</NavLink>
						{/* <button
							className='regular-button'
							onClick={navigateToHomePage}
						>
							Home
						</button> */}
						<NavLink
							to={`/photos`}
							className='font-white font-bold font-decor-none font-16 nav-hover'
						>
							{' '}
							My Photos{' '}
						</NavLink>
						{/* <button
							className='blue-button'
							onClick={navigateToPhotos}
						>
							My Photos
						</button> */}
						<NavLink
							to='/albums'
							className='font-white font-bold font-decor-none font-16 nav-hover'
						>
							{' '}
							My Albums{' '}
						</NavLink>
						{/* <button
							className='blue-button'
							onClick={navigateToAlbums}
						>
							My Albums
						</button> */}
					</div>

					<div
						className={`search_middle ${
							location.pathname === '/' ? '' : 'hidden_search'
						}`}
					>
						<input
							type='Text'
							placeholder='Search'
							value={searchbarValue}
							onChange={(event) => {
								dispatch(setSearchbarValue(event.target.value));
							}}
						/>
					</div>

					<div className='right_side' onClick={() => setOpen(!open)}>
						<div className='profile-width profile-hover'>
							<img src={currentUser.image} alt='' />
						</div>

						<div className='dropdown_button'>
							<FontAwesomeIcon icon={faChevronDown} />
						</div>
						<div
							className={`dropdown-menu ${
								open ? 'active' : 'inactive'
							}`}
							ref={menuRef}
						>
							{currentUser && (
								<div className='menu_dropdown'>
									<div>
										{/* <div className="profile" onClick={navigateToMyProfile}> */}
										<div className='profile profile-width'>
											<div className='prof_icon'>
												{/* <button> */}
												<img
													src={currentUser.image}
													alt=''
												/>
												{/* </button> */}
											</div>
											<div className='user_info'>
												<div>
													Username:{' '}
													{currentUser.username}
												</div>
												{/* <h5>Personal</h5> */}
												<div>
													Email: {currentUser.email}
												</div>
											</div>
										</div>
									</div>
									<LogoutButton />
								</div>
							)}
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default Navigation;
