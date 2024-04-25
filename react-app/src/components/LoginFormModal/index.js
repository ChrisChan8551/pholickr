import React from 'react';
import { Modal } from '../Modal/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ showLoginModal }) {
    return (
        <>
            {showLoginModal && (
                <Modal onClose={() => showLoginModal(false)}>
                    <LoginForm showLoginModal={showLoginModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
