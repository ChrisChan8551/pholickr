import React from 'react';
import { Modal } from '../Modal/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ showLoginModal }) {
	// const [showLoginModal, setShowLoginModal] = useState(false);

	return (
		<>
			{/* <button className='blue-button modal-label-font'onClick={() => setShowLoginModal(true)}>Log In</button> */}
			{showLoginModal && (
				<Modal onClose={() => showLoginModal(false)}>
					<LoginForm showLoginModal={showLoginModal} />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
