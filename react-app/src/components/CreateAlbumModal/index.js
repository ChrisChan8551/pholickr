import { Modal } from '../Modal/Modal';
import CreateAlbumForm from './CreateAlbumForm';

function CreateAlbumModal({ album, hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <CreateAlbumForm album={album} hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default CreateAlbumModal;
