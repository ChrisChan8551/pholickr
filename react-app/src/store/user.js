import { FULL_RESET } from './full-reset';
import { setUser } from './session';

const LOAD_OTHER_USERS = 'user/LOAD_OTHER_USERS';

const loadOtherUsers = (users) => {
	return {
		type: LOAD_OTHER_USERS,
		users,
	};
};

export const getAllUsers = () => async (dispatch) => {
	const res = await fetch(`/api/users/`);
	if (res.ok) {
		const users = await res.json();
		dispatch(loadOtherUsers(users));
	}
}

export const getOneUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`);

	if (res.ok) {
		const user = await res.json();
		dispatch(loadOtherUsers([user]));
		return user;
	}
};

export const followUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/follow/${userId}`, {
		method: 'POST',
	});

	if (res.ok) {
		const user = await res.json();
		dispatch(setUser(user));
		dispatch(loadOtherUsers([...user.following, ...user.followers]));
		return user;
	}
};

export const unfollowUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/unfollow/${userId}`, {
		method: 'POST',
	});

	if (res.ok) {
		const user = await res.json();
		dispatch(setUser(user));
		dispatch(loadOtherUsers([...user.following, ...user.followers]));
		return user;
	}
};

const defaultState = {};

const otherUsersReducer = (state = defaultState, action) => {
	// let newState = { ...state };

	switch (action.type) {
		case FULL_RESET:
			return { ...defaultState };

		case LOAD_OTHER_USERS: {
			const newState = { ...state };
			action.users.forEach((user) => {
				newState[user.id] = user;
			});

			return newState;
		}

		default:
			return state;
	}
};

export default otherUsersReducer;
