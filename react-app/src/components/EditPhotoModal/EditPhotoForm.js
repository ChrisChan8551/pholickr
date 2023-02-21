import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editPhoto, getOnePhoto } from '../../store/photo';

function EditPhotoForm({ photo, hideForm }) {
	const dispatch = useDispatch();
	const { photoId } = useParams();
	const allPhotos = useSelector((state) => state.photo);
    const specificPhoto = allPhotos[photoId];
	// const specificPhoto = getOnePhoto[photoId];
	const [title, setTitle] = useState(photo.title);
	const [imageUrl, setImageUrl] = useState(photo.imageUrl);
	const [description, setDescription] = useState(photo.description);
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, description, imageUrl };
		let data = await dispatch(editPhoto(photoId,payload));

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
				<h1 className='edit'>Edit your photo!</h1>
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
				<button className='edit-button' type='submit'>
					Edit Photo
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
