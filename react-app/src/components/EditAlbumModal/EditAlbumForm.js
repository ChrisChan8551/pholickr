import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editAlbum, getOneAlbum } from '../../store/album';

const EditAlbumForm = ({ album, hideForm }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
	const [title, setTitle] = useState(album.title);
	const [imageUrl, setImageUrl] = useState(album.imageUrl);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, imageUrl };
		let data = await dispatch(editAlbum(albumId, payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			history.push(`/albums/${albumId}`);
		}
		if (payload) {
			dispatch(getOneAlbum(albumId));
			hideForm();
		}
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest('.edit-album-form')) {
				hideForm();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [hideForm]);

	return (
		<section className='edit-album-form'>
			<form className='edit-form' onSubmit={handleSubmit}>
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
					Image Url:
					<textarea
						className='modal-label'
						type='text'
						value={imageUrl}
						onChange={(e) => {
							setImageUrl(e.target.value);
						}}
					/>
				</label>
				<button className='blue-button modal-label' type='submit'>
					Update
				</button>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</form>
		</section>
	);
};

export default EditAlbumForm;
