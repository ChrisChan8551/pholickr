import React, { useEffect, useState } from 'react';
import EditorInput from './EditorInput';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editAlbum } from '../../store/album';
// import "./Editor.css";

function AlbumDetailEditor({ setOpen }) {
	const { albumId } = useParams();
	const album = useSelector((state) => state.album[albumId]);
	const dispatch = useDispatch();

	const [title, setTitle] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	// const [description, setDescription] = useState("");
	const [pending, setPending] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	useEffect(() => {
		setTitle(album.title);
		// setDescription(album.description);
		setImageUrl(album.imageUrl);
	}, [album]);

	const handleSubmit = async (e) => {};

	return (
		<div className='AlbumDetail--Editor--Container'>
			<div className='AlbumDetail--Editor--Backdrop'>
				<div className='AlbumDetail--Editor--Card'>
					<form
						className='album-form-container'
						onSubmit={async (event) => {
							event.preventDefault();

							const payload = { title, imageUrl };
							setPending(true);

							let data = await dispatch(
								editAlbum(albumId, payload)
							).finally((data) => {
								setPending(false);
								return data;
							});

							if (data.errors) {
								setErrors([...Object.values(data.errors)]);
							} else {
								setOpen(false);
							}
						}}
					>
						{!!errors.length && (
							<ul>
								{errors.map((message, i) => (
									<li className='errors' key={i}>
										{message}
									</li>
								))}
							</ul>
						)}

						<EditorInput
							name='Title'
							value={title}
							setValue={setTitle}
							disabled={pending}
						/>
						{/* <EditorInput
              name="Description"
              type="textarea"
              rows={6}
              value={description}
              setValue={setDescription}
              disabled={pending}
            /> */}
						<EditorInput
							name='ImageUrl'
							value={imageUrl}
							setValue={setImageUrl}
							disabled={pending}
						/>
						<div>
							<button
								className='blue-button'
								type='submit'
								disabled={pending}
							>
								save
							</button>
							<button
								className='grey-button'
								onClick={() => setOpen(false)}
								disabled={pending}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default AlbumDetailEditor;
