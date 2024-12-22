import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editPhoto, getOnePhoto } from '../../store/photo';

function EditPhotoForm({ photo, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { photoId } = useParams();
	const [title, setTitle] = useState(photo.title);
	const [imageUrl, setImageUrl] = useState(photo.imageUrl);
	const [description, setDescription] = useState(photo.description);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, description, imageUrl };
		let data = await dispatch(editPhoto(photoId, payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			history.push(`/photos/${photoId}`);
		}
		if (payload) {
			dispatch(getOnePhoto(photoId));
			hideForm();
		}
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest('.edit-photo-form')) {
				hideForm();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [hideForm]);

	return (
		<section className='edit-photo-form'>
			<form className='edit-form' onSubmit={handleSubmit}>
				<div className='div-form-icon'>
					<img className='form-icon' src='/pho.png' alt='' />
				</div>
				<label className='modal-label'>
					Title
					<input
						type='text'
                        name='photo-title'
						className='modal-label'
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
						className='modal-label'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<label className='modal-label'>
					Image Url
					<textarea
						type='text'
                        name='photo-imageUrl'
						className='modal-label'
						value={imageUrl}
						required
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<button className='blue-button modal-label' type='submit'>
					Update
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

export default EditPhotoForm;
