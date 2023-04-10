import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createAlbum } from '../../store/album';

function CreateAlbumForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, imageUrl };
		let data = await dispatch(createAlbum(payload));
		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			hideForm();
		}
	};
	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest('.create-album-form')) {
				hideForm();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [hideForm]);

	return (
		<section className='create-album-form'>
			<form className='create-form' onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className='edit-errors' key={idx}>
							{error}
						</li>
					))}
				</ul>
				<div className='div-form-icon'>
					<img className='form-icon' src='/pho.png' alt='' />
				</div>
				<label className='modal-label'>
					Title
					<input
						type='text'
						className='modal-label'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label className='modal-label'>
					Image Url
					<textarea
						type='text'
						className='modal-label'
						value={imageUrl}
						required
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<button className='blue-button modal-label' type='submit'>
					Create Album
				</button>
			</form>
		</section>
	);
}

export default CreateAlbumForm;
