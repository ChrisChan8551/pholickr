import { Modal } from '../Modal/Modal';
import EditAlbumForm from './EditAlbumForm';

function EditAlbumModal({ album, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal>
					<EditAlbumForm album={album} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default EditAlbumModal;
