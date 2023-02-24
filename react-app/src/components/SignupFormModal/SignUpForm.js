import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
// import "./SignUpForm.css";

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
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(firstName, lastName, username, email, password)
			);
			if (data) {
				setErrors(data);
			}
			// ).catch(async (res) => {
			// 	const data = await res.json();
			// 	console.log(data.errors);
			// 	if (data && data.errors) setErrors([data.errors]);
			// });
		} else {
			showSignupModal(false);
			// onClose();
		}
	};

	return (
		<div className='signup_container'>
			<div className='signup_header'>
				<h1>Sign Up</h1>
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
					<label>User Name</label>
					<input
						type='text'
						name='username'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
						required={true}
						placeholder='User Name'
					></input>
				</div>
				<div id='form_detail'>
					<label>First Name</label>
					<input
						type='text'
						name='firstName'
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
						required={true}
						placeholder='First Name'
					></input>
				</div>
				<div id='form_detail'>
					<label>Last Name</label>
					<input
						type='text'
						name='lastname'
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
						required={true}
						placeholder='Last Name'
					></input>
				</div>
				<div id='form_detail'>
					<label>Email</label>
					<input
						type='text'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required={true}
						placeholder='Email'
					></input>
				</div>
				<div id='form_detail'>
					<label>Password</label>
					<input
						type='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required={true}
						placeholder='Create a password'
					></input>
				</div>
				<div id='form_detail'>
					<label>Repeat Password</label>
					<input
						type='password'
						name='repeat_password'
						onChange={(e) => setRepeatPassword(e.target.value)}
						value={repeatPassword}
						required={true}
						placeholder='Enter Your Password Again'
					></input>
				</div>
				<button className='blue-button'type='submit'>Sign Up</button>
			</form>
		</div>
	);
};

export default SignUpForm;
