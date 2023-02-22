import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login-button-font'onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm showModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
