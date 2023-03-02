import { Modal } from '../Modal/Modal';


function FollowingModal({ user, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal>
					{/* <Following user={user} hideForm={hideForm} /> */}
				</Modal>
			)}
		</>
	);
}

export default FollowingModal;
