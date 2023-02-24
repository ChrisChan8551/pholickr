import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ showLoginModal }) {
	// const [showLoginModal, setShowLoginModal] = useState(false);


	return (
		<>
			{/* <button className='blue-button-font'onClick={() => setShowLoginModal(true)}>Log In</button> */}
			{showLoginModal && (
				<Modal onClose={() => showLoginModal(false)}>
					<LoginForm showLoginModal={showLoginModal} />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
