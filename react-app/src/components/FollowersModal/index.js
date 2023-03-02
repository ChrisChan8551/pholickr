import { Modal } from '../Modal/Modal';


function FollowersModal({ user, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal>
					{/* <Followers user={user} hideForm={hideForm} /> */}
				</Modal>
			)}
		</>
	);
}

export default FollowersModal;
