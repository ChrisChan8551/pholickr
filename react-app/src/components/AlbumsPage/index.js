import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAlbums, deleteAlbum, selectMyAlbums } from '../../store/album';
import GridLayout from '../GridLayout';
import { AddPinningControls } from '../PhotoLayout';
import CreateAlbumModal from '../CreateAlbumModal';

function AlbumsPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	// const albums = Object.values(useSelector((state) => state.album))
	const myAlbums = useSelector(selectMyAlbums);
	// const albums = useSelector((state) => state.album)
	// const album = Object.values(albums)
	const currentUser = useSelector((state) => state.session.user);
	const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
	let createAlbumForm;
	// console.log('****************ALBUMS***************', albums);
	// console.log('****************ALBUMS***************',album)

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

	//   const navigateToCreateAlbumForm = async (e) => {
	//     history.push("/albumform");
	//   };

	const navigateToAlbum = (album) => {
		history.push(`/albums/${album.id}`);
	};

	return (
		<div className='photo-main-container'>
			<div className='photo-container'>
				<div><h1>ALBUMS I'VE CREATED</h1></div>
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
				<GridLayout className='myAlbums'
					items={myAlbums}
					buttonLabel='Remove'
					onItemClick={navigateToAlbum}
					renderItemActions={(album, closeActionPopOver) => (
						<>
							{/* <AddPinningControls
								photo={album}
								onPinningDone={closeActionPopOver}
							/> */}

							<button
								className='blue-button'
								onClick={() => {
									dispatch(deleteAlbum(album.id));
									closeActionPopOver();
								}}
							>
								Are you sure?
							</button>
						</>
					)}
				/>
			</div>
		</div>
	);
}

export default AlbumsPage;
