import React from 'react';
import { Modal } from '../Modal/Modal';
import EditPhotoForm from './EditPhotoForm';

function EditPhotoModal({ photo, hideForm }) {
    return (
        <>
            {hideForm && (
                <Modal>
                    <EditPhotoForm photo={photo} hideForm={hideForm} />
                </Modal>
            )}
        </>
    );
}

export default EditPhotoModal;
