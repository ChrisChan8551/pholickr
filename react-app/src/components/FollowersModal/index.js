import { Modal } from '../Modal/Modal';
import Followers from './Followers'

function FollowersModal({ user, otherUser, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal onClose={() => hideForm(false)}>
					<Followers user={user} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default FollowersModal;
