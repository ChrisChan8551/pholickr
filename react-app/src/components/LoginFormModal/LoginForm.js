import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
// import { useHistory } from 'react-router-dom';

const LoginForm = ({ showLoginModal }) => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const user = useSelector((state) => state.session.user);

	if (user?.id) {
		return <Redirect to='/photos' />;
	}

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			const formattedErrors = data.map(
				(error) => error.split(': ')[1] || error
			);
			setErrors(formattedErrors);
		} else {
			showLoginModal(false);
			// onClose();
		}
	};

	return (
		<div className='login_container'>
			<div className='login_header'>
				{/* <h1>Login</h1> */}
				<div className='div-form-icon'>
					<img className='form-icon' src='/pho.png' alt='' />
				</div>
				<form onSubmit={onLogin}>
					<div>
						{errors.map((error, ind) => (
							<div key={ind} className='error-message'>
								{error}
							</div>
						))}
					</div>
					<div>
						<label className='modal-label' htmlFor='email'>
							Email
						</label>
						<input
							className='modal-label'
							name='email'
							type='text'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							onInvalid={(e) =>
								e.target.setCustomValidity(
									'Please enter your email.'
								)
							}
							onInput={(e) => e.target.setCustomValidity('')}
						/>
					</div>
					<div>
						<label className='modal-label' htmlFor='password'>
							Password
						</label>
						<input
							className='modal-label'
							name='password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							onInvalid={(e) =>
								e.target.setCustomValidity(
									'Please enter your password.'
								)
							}
							onInput={(e) => e.target.setCustomValidity('')}
						/>
						<button
							className='blue-button modal-label'
							type='submit'
						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
