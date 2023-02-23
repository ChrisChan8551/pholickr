import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GridLayout from '../GridLayout';
import {
	getAllAlbums,
	deleteAlbum,
	editAlbum,
	getOneAlbum,
	addAlbum,
} from '../../store/album';
import { deleteAPhoto } from '../../store/photo';
import CreatePhotoModal from '../CreatePhotoModal';
import CreateAlbumModal from '../CreateAlbumModal';
import EditAlbumModal from '../EditAlbumModal';

function AlbumDetailPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
	const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
	const [showCreatePhotoForm, setShowCreatePhotoForm] = useState(false);
	const album = useSelector((state) => state.album[albumId]);
	const currentUser = useSelector((state) => state.session.user);
	let editAlbumForm;
	let createPhotoForm;
	const { userId: albumAuthorId, photos = [] } =
    useSelector((state) => state.album[albumId]) || {};

	useEffect(() => {
		setShowEditAlbumForm(false);
		dispatch(getOneAlbum(albumId));
	}, [albumId, dispatch]);

	useEffect(() => {
		setShowCreatePhotoForm(false);
		dispatch(getOneAlbum(albumId));
	}, [albumId, dispatch]);

	useEffect(() => {
		dispatch(getAllAlbums());
	}, [dispatch]);

	if (!album) {
		return null;
	}

	if (showEditAlbumForm && album.userId === currentUser?.id) {
		editAlbumForm = (
			<EditAlbumModal
				album={album}
				hideForm={() => setShowEditAlbumForm(false)}
			/>
		);
	}

	if (showCreatePhotoForm && album.userId === currentUser?.id) {
		createPhotoForm = (
			<CreatePhotoModal
				album={album}
				hideForm={() => setShowCreatePhotoForm(false)}
			/>
		);
	}

	const deleteAlbum = (albumId) => {
		album?.Photos?.map((photo) => {
			return dispatch(deleteAPhoto(photo.id));
		});
		return dispatch(deleteAlbum(albumId)).then(() => {
			history.push('/albums');
		});
	};

	return (
		<div className='album-container'>
			<div className='album-detail'>
				<div className='album-detail-info'>
					<div className='album-detail-image'>
						<img
							className='album-detail-image'
							src={album.imageUrl}
							alt='albumimg'
						></img>
					</div>
					<ul>
						<li
							id='album-artist'
							key={`${album.id}${album?.userId}`}
						>
							{album?.userId}
						</li>
						<li
							id='album-photos'
							key={`${album.id}${album.title}`}
						>{`Title: ${album.title}`}</li>
						{album?.Photos?.map((photo, idx) => {
							return (
								<li key={`${album.id}${photo.id}`}>{`Song #${
									idx + 1
								}: ${photo.title}`}</li>
							);
						})}
					</ul>
				</div>
				<div className='album-detail-buttons'>
					{!showCreatePhotoForm &&
						album.userId === currentUser?.id && (
							<button
								className='add-photo-button'
								onClick={() => setShowCreatePhotoForm(true)}
							>
								Add Photo
							</button>
						)}
					{!showEditAlbumForm && album.userId === currentUser?.id && (
						<button
							className='album-edit-button'
							onClick={() => setShowEditAlbumForm(true)}
						>
							Edit
						</button>
					)}
					{album.userId === currentUser?.id && (
						<button
							className='album-delete-button'
							onClick={() => deleteAlbum(albumId)}
						>
							Delete
						</button>
					)}
				</div>
				<div>{createPhotoForm}</div>
				{editAlbumForm}
			</div>
		</div>
	);
}

export default AlbumDetailPage;
