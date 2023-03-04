import { Modal } from '../Modal/Modal';
import CreatePhotoForm from './CreatePhotoForm';

function CreatePhotoModal({ album, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal onClose={() => hideForm(false)}>
					<CreatePhotoForm album={album} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default CreatePhotoModal;
