import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { login } from '../../store/session';
import PhotoLayout from '../PhotoLayout';
import Footer from '../Footer';

function HomePage() {
	const dispatch = useDispatch();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const currentUser = useSelector((state) => state.session.user);
	let LoginForm;
	let SignupForm;

	const demo = async (e) => {
		e.preventDefault();
		const user = {
			email: 'demo@aa.io',
			password: 'password',
		};
		dispatch(login(user.email, user.password));
	};

	useEffect(() => {
		setShowLoginModal(false);
	}, [dispatch]);

	useEffect(() => {
		setShowSignupModal(false);
	}, [dispatch]);

	if (showSignupModal && !currentUser?.id) {
		SignupForm = (
			<SignupFormModal
				showSignupModal={() => setShowSignupModal(false)}
			/>
		);
	}

	if (showLoginModal && !currentUser?.id) {
		LoginForm = (
			<LoginFormModal showLoginModal={() => setShowLoginModal(false)} />
		);
	}

	return (
		<div className='Splash'>
			<div className='home-main-container'>
				<div className='nav_bar'>
					<div className='icon'>
						<img className='photo-icon' src='/pho.png' alt='' />
						Pholickr
					</div>

					<div className='right_menu'>
						<button className='grey-button' onClick={demo}>
							Demo
						</button>

						{LoginForm}

						{!showLoginModal && !currentUser?.id && (
							<button
								className='blue-button'
								onClick={(e) => {
									setShowLoginModal(true);
								}}
							>
								Login
							</button>
						)}

						{SignupForm}

						{!showSignupModal && !currentUser?.id && (
							<button
								className='grey-button'
								onClick={(e) => {
									setShowSignupModal(true);
								}}
							>
								Sign Up
							</button>
						)}
					</div>
				</div>
			</div>

			<div>
				<PhotoLayout />
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default HomePage;
