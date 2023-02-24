import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Heading from './Heading';
import GridLayout from '../GridLayout';
import Footing from './Footing';
import { getAllAlbums } from '../../store/album';
import { removePinning } from '../../store/pinning';


function AlbumDetailPage() {
	const { albumId } = useParams();
	const currentUser = useSelector((state) => state.session.user);
	const { userId: albumAuthorId, photos = [] } =
		useSelector((state) => state.album[albumId]) || {};
	const dispatch = useDispatch();
	const history = useHistory();

	const navigateToPhotoPage = (photo) => {
		history.push(`/photos/${photo.id}`);
	};

	useEffect(() => {
		dispatch(getAllAlbums());
	}, []);



	return (
		<div className='AlbumDetail--Page'>
			<Heading />
			<div className='album-photo-container'>
				<GridLayout
					items={photos}
					buttonLabel='remove'
					onItemClick={navigateToPhotoPage}
					renderItemActions={
						currentUser.id === albumAuthorId &&
						((photo, closeActionPopOver) => (
							<button
								className='blue-button'
								onClick={() => {
									dispatch(removePinning(albumId, photo.id));
									closeActionPopOver();
								}}
							>
								Are you sure?
							</button>
						))
					}
				/>
			</div>
			<Footing />
		</div>
	);
}

export default AlbumDetailPage;
