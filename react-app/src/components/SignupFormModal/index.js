import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import SignUpForm from './SignUpForm';


function SignupFormModal({showSignupModal}) {
  // const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      {/* <button className='create-button-font' onClick={() => setShowSignupModal(true)}>Sign Up</button> */}
      {showSignupModal && (
        <Modal onClose={() => showSignupModal(false)}>
          <SignUpForm showSignupModal={showSignupModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
