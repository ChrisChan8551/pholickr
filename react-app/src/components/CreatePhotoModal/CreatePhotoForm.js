import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';

function CreatePhotoForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState([]);
	const { albumId } = useParams();

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

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
				<h1 className='create'>Create your photo!</h1>
				<label>
					Title
					<input
						type='text'
						className='photo-input'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label>
					Description
					<input
						type='text'
						className='photo-input'
						value={description}
						required
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<label>
					Image Url
					<input
						type='text'
						className='photo-input'
						value={imageUrl}
						required
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<button className='blue-button' type='submit'>
					Create new Photo!
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
