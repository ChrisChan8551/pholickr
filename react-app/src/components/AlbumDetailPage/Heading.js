import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteAlbum } from '../../store/album';
import Editor from './Editor';
import PopOver from '../PopOver';
// import "./Heading.css";
import EditAlbumModal from '../EditAlbumModal';

function AlbumDetailHeading() {
	const { albumId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
	let editAlbumForm;
	const { album, isMyAlbum } = useSelector((state) => {
		const currentUser = state.session.user;
		const album = state.album[albumId] || {};
		return {
			album,
			isMyAlbum: `${currentUser.id}` === `${album.userId}`,
		};
	});

	useEffect(() => {
		setShowEditAlbumForm(false);
	}, [dispatch]);

	const currentUser = useSelector((state) => state.session.user);

	if (showEditAlbumForm && currentUser?.id) {
		editAlbumForm = (
			<EditAlbumModal
				album={album}
				hideForm={() => setShowEditAlbumForm(false)}
			/>
		);
	}

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
			<h1 className='album-title'>{title}</h1>
			<div className='album-title'>
				{editAlbumForm}
				{!showEditAlbumForm && currentUser?.id && (
					<button
						className='blue-button album-edit-button'
						onClick={(e) => {
							setShowEditAlbumForm(true);
						}}
					>
						Edit Album
					</button>
				)}
				<button
					className='grey-button'
					type='button'
					onClick={removeAlbum}
				>
					Delete
				</button>
			</div>
			{/* {editorOpen && <Editor setOpen={setEditorOpen} />}
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
				</div> */}
			{/* {imageUrl && <img src={imageUrl}/>} */}
			{/* </div> */}
		</>
	);
}

export default AlbumDetailHeading;
