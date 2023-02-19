import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to='/' exact={true} activeClassName='active'>
						Home
					</NavLink>
				</li>

				<LoginFormModal to='login' />
				<SignupFormModal to='signup' />

				<li>
					<NavLink to='/users' exact={true} activeClassName='active'>
						Users
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
