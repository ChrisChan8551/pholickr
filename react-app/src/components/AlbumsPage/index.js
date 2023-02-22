import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { getAllAlbums, deleteAAlbum, selectMyAlbums } from "../../../store/album";
import { getAllAlbums, deleteAlbum, selectMyAlbums } from '../../store/album';
import GridLayout from '../GridLayout';
// import { AddAlbumningControls } from "../../AlbumterestLayout";
import CreateAlbumModal from '../CreateAlbumModal';

function AlbumPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	// const albums = Object.values(useSelector((state) => state.album))
	const albums = useSelector(selectMyAlbums);
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

	if (!albums) {
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

	const navigateToAlbumPage = (album) => {
		history.push(`/albums/${album.id}`);
	};

	return (
		<div>
			<div>
				<h1>ALBUMS I'VE CREATED</h1>
				{createAlbumForm}
				{!showCreateAlbumForm && currentUser?.id && (
					<button
						className='add-Album-button'
						onClick={(e) => {
							setShowCreateAlbumForm(true);
						}}
					>
						Create Album
					</button>
				)}
				<GridLayout
					items={albums}
					onItemClick={navigateToAlbumPage}
					renderItemActions={(album, closeActionPopOver) => (
						<>
							{/* <AddPinningControls
                 photo={album}
                 onPinningDone={closeActionPopOver}
                 /> */}

							<button
								className='regular-button'
								onClick={() => {
									dispatch(deleteAlbum(album.id));
									closeActionPopOver();
								}}
							>
								Delete
							</button>
						</>
					)}
				/>
			</div>
		</div>
	);
}

export default AlbumPage;
