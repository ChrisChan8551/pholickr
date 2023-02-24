import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteAlbum } from '../../store/album';
import Editor from "./Editor";
import PopOver from '../PopOver';
// import "./Heading.css";

function AlbumDetailHeading() {
	const { albumId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const { album, isMyAlbum } = useSelector((state) => {
		const currentUser = state.session.user;
		const album = state.album[albumId] || {};

		return {
			album,
			isMyAlbum: `${currentUser.id}` === `${album.userId}`,
		};
	});

	const [editorOpen, setEditorOpen] = useState(false);
	const [popOverOpen, setPopOverOpen] = useState(false);

	if (!album) {
		return null;
	}

	const { title, imageUrl } = album;

	const removeAlbum = async (e) => {
		e.preventDefault();

		await dispatch(deleteAlbum(albumId));

		history.push(`/albums`);
	};

	return (
		<>
			{editorOpen && <Editor setOpen={setEditorOpen} />}
			<div className='AlbumDetail--Heading'>
				<div className='AlbumDetail--Title'>
					<h1 className='album-h1'>{title}</h1>
					{!!isMyAlbum && (
						<PopOver
							open={popOverOpen}
							setOpen={setPopOverOpen}
							button={
								<button
									className='blue-button'
									onClick={() => setPopOverOpen(true)}
								>
									Options
								</button>
							}
						>
							<div className='AlbumDetail--Actions'>
								<button
									className='blue-button'
									onClick={() => {
										setEditorOpen(true);
										setPopOverOpen(false);
									}}
								>
									Edit
								</button>
								<button
									className='grey-button'
									type='button'
									onClick={removeAlbum}
								>
									Delete
								</button>
							</div>
						</PopOver>
					)}
				</div>
				{/* {imageUrl && <img src={imageUrl}/>} */}
			</div>
		</>
	);
}

export default AlbumDetailHeading;
