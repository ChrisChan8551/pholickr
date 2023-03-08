import { Modal } from '../Modal/Modal';
import Following from './Following';

function FollowingModal({ user, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal onClose={() => hideForm(false)}>
					<Following user={user} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default FollowingModal;
