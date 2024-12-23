import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addPhoto } from '../../store/photo';

function CreatePhotoForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, description, imageUrl };
		let data = await dispatch(addPhoto(payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			history.push(`/photos/${data.id}`);
		}
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest('.create-photo-form')) {
				hideForm();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [hideForm]);

	return (
		<section className='create-photo-form'>
			<form className='create-form' onSubmit={handleSubmit}>
				<div className='div-form-icon'>
					<img className='form-icon' src='/pho.png' alt='' />
				</div>

				<label className='modal-label'>
					Title
					<input
						type='text'
                        name='photo-title'
						className='create-photo-title modal-label'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label className='modal-label'>
					Description
					<textarea
						type='text'
                        name='photo-description'
						className='create-photo-description modal-label'
						value={description}
						required
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<label className='modal-label'>
					Image Url
					<textarea
						type='text'
                        name='photo-imageUrl'
						className='create-photo-link modal-label'
						value={imageUrl}
						required
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<button
					className='blue-button modal-label modal-label'
					type='submit'
				>
					Create Photo
				</button>

				<ul>
					{errors.map((error, idx) => (
						<li className='edit-errors' key={idx}>
							{error}
						</li>
					))}
				</ul>
			</form>
		</section>
	);
}

export default CreatePhotoForm;
