import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addAlbum } from '../../store/album';

function CreateAlbumForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	// const [description, setDescription] = useState('');
	const [errors, setErrors] = useState([]);

  
	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, imageUrl };
		let data = await dispatch(addAlbum(payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			history.push(`/albums/${data.id}`);
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
				<h1 className='create'>Create your Album!</h1>
				<label>
					Title
					<input
						type='text'
						className='album-input'
						value={title}
						required
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label>
					Image Url
					<input
						type='text'
						className='album-input'
						value={imageUrl}
						required
						onChange={(e) => setImageUrl(e.target.value)}
					/>
				</label>
				<button className='create-button' type='submit'>
					Create new Album!
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

export default CreateAlbumForm;
