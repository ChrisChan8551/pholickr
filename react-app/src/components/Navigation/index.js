import React, { useState, useRef } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchbarValue, selectSearchbarValue } from '../../store/searchbar';

const Navigation = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const location = useLocation();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const searchbarValue = useSelector(selectSearchbarValue);

	return (
		<div className='main-container'>
			<div className='Nav-container'>
				<nav className='navigation-bar'>
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
						<NavLink
							to={`/photos`}
							className='font-white font-bold font-decor-none font-16 nav-hover'
						>
							{' '}
							My Photos{' '}
						</NavLink>

						<NavLink
							to='/albums'
							className='font-white font-bold font-decor-none font-16 nav-hover'
						>
							{' '}
							My Albums{' '}
						</NavLink>
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
										<div className='profile profile-width'>
											<div className='prof_icon'>
												<img
													src={currentUser.image}
													alt=''
												/>
											</div>
											<div className='user_info'>
												<div class='username'>
													Username:{' '}
													{currentUser.username}
												</div>
												<div class='email'>
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
