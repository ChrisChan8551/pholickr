import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ showLoginModal }) => {
	const dispatch = useDispatch();
	const history = useHistory();
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
			setErrors(data);
		} else {
			showLoginModal(false);
			// onClose();
		}
	};

	return (
		<div className='login_container'>
			<div className='login_header'>
				<h1>Login</h1>
				<form onSubmit={onLogin}>
					<div>
						{errors.map((error, ind) => (
							<div key={ind}>{error}</div>
						))}
					</div>
					<div>
						<label htmlFor='email'>Email</label>
						<input
							name='email'
							type='text'
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							name='password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button className='blue-button'type='submit'>Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
