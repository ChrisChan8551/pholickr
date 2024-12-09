import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums, deleteAlbum, selectMyAlbums } from '../../store/album';
import GridLayout from '../GridLayout';
import CreateAlbumModal from '../CreateAlbumModal';
import Footer from '../Footer';

function AlbumsPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const myAlbums = useSelector(selectMyAlbums);
	const currentUser = useSelector((state) => state.session.user);
	const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
	let createAlbumForm;

	useEffect(() => {
		dispatch(getAllAlbums());
	}, [dispatch]);

	useEffect(() => {
		setShowCreateAlbumForm(false);
	}, [dispatch]);

	if (!myAlbums) {
		return null;
	}

	if (showCreateAlbumForm && currentUser?.id) {
		createAlbumForm = (
			<CreateAlbumModal
				album={null}
				hideForm={() => setShowCreateAlbumForm(false)}
			/>
		);
	}

	const navigateToAlbum = (album) => {
		history.push(`/albums/${album.id}`);
	};

	return (
		<div className='photo-main-container'>
			<div className='photo-container'>
				<div className='full-width'>
					<h1>My Albums</h1>
					{createAlbumForm}
					{!showCreateAlbumForm && currentUser?.id && (
						<button
							className='blue-button'
							onClick={(e) => {
								setShowCreateAlbumForm(true);
							}}
						>
							Create Album
						</button>
					)}
				</div>
				<GridLayout
					className='myAlbums'
					items={myAlbums}
					buttonLabel='Remove'
					onItemClick={navigateToAlbum}
					renderItemActions={(album, closeActionPopOver) => (
						<>
							<button
								className='blue-button'
								onClick={() => {
									dispatch(deleteAlbum(album.id));
									closeActionPopOver();
								}}
							>
								Confirm Delete
							</button>
						</>
					)}
				/>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default AlbumsPage;
