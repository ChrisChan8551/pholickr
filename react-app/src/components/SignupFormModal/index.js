import React from 'react';
import { Modal } from '../Modal/Modal';
import SignUpForm from './SignUpForm';

function SignupFormModal({ showSignupModal }) {
	return (
		<>
			{showSignupModal && (
				<Modal onClose={() => showSignupModal(false)}>
					<SignUpForm showSignupModal={showSignupModal} />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;
