import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ showSignupModal, onClose }) => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	// const [image, setImage] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const user = useSelector((state) => state.session.user);

	if (user?.id) return <Redirect to='/photos' />;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== repeatPassword) {
			setErrors(['Passwords do not match']);
			return;
		}
		const data = await dispatch(
			signUp(firstName, lastName, username, email, password)
		);
		if (data) {
			setErrors(data);
		} else {
			showSignupModal(false);
		}
	};

	return (
		<div className='signup_container'>
			<div className='signup_header'>
				<div className='div-form-icon'>
					<img className='form-icon' src='/pho.png' alt='' />
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div>
					{errors.map((error, ind) => (
						<div className='errors' key={ind}>
							{error}
						</div>
					))}
				</div>
				<div id='form_detail'>
					<label className='modal-label'>User Name</label>
					<input
						className='modal-label'
						type='text'
						name='username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						required={true}
						placeholder='User Name'
					></input>
				</div>
				<div id='form_detail'>
					<label className='modal-label'>First Name</label>
					<input
						className='modal-label'
						type='text'
						name='firstName'
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
						required={true}
						placeholder='First Name'
					></input>
				</div>
				<div id='form_detail'>
					<label className='modal-label'>Last Name</label>
					<input
						className='modal-label'
						type='text'
						name='lastname'
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
						required={true}
						placeholder='Last Name'
					></input>
				</div>
				<div id='form_detail'>
					<label className='modal-label'>Email</label>
					<input
						className='modal-label'
						type='text'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required={true}
						placeholder='Email'
					></input>
				</div>
				<div id='form_detail'>
					<label className='modal-label'>Password</label>
					<input
						className='modal-label'
						type='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required={true}
						placeholder='Create a password'
					></input>
				</div>
				<div id='form_detail'>
					<label className='modal-label'>Repeat Password</label>
					<input
						className='modal-label'
						type='password'
						name='repeat_password'
						onChange={(e) => setRepeatPassword(e.target.value)}
						value={repeatPassword}
						required={true}
						placeholder='Enter Your Password Again'
					></input>
				</div>
				<button className='blue-button modal-label' type='submit'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
