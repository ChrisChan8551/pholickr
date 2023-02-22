import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editAlbum, getOneAlbum } from '../../store/album';
import { getAllPhotos } from '../../store/photo';
// import './EditAlbumForm.css';

const EditAlbumForm = ({ album, hideForm }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
	const allAlbums = useSelector((state) => state.album);
	const [title, setTitle] = useState(album.title);
	const [imageUrl, setImageUrl] = useState(album.imageUrl);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { title, imageUrl };
		let data = await dispatch(editAlbum(albumId,payload));

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
            <h1 className='edit'>Edit your album!</h1>
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

				<label className='edit-label-form'>
					Image Url:
					<input
						className='edit-input-form'
						type='text'
						value={imageUrl}
						onChange={(e) => {
							setImageUrl(e.target.value);
						}}
					/>
				</label>
				<button className='edit-button' type='submit'>
					Edit Album
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
