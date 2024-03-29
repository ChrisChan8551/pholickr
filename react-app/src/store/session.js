import { fullReset, FULL_RESET } from './full-reset';
import { getAllPhotos } from './photo';

const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const LOAD_USERS = 'user/LOAD_USERS';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const loadUsers = (users) => {
	return {
		type: LOAD_USERS,
		users,
	};
};

export const getOneUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`);

	if (res.ok) {
		const user = await res.json();
		dispatch(loadUsers([user]));
		return user;
	}
};

export const authenticate = () => async (dispatch) => {
	const response = await fetch('/api/auth/', {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		dispatch(getAllPhotos());
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ['An error occurred. Please try again.'];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch('/api/auth/logout', {
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		dispatch(removeUser());
		dispatch(fullReset());
	}
};

export const signUp =
	(username, firstName, lastName, email, password) => async (dispatch) => {
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				firstName,
				lastName,
				email,
				password,
			}),
		});
		
		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ['An error occurred. Please try again.'];
		}
	};

const initialState = {};

export default function reducer(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case FULL_RESET:
			return { ...initialState };
		case LOAD_USERS:
			action.users.forEach((user) => {
				newState[user.id] = user;
			});
			return newState;
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { ...initialState };
		default:
			return state;
	}
}
