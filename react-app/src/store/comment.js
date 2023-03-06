import { FULL_RESET } from './full-reset';

const LOAD_ALL_COMMENTS = 'comment/LOAD_ALL_COMMENTS';

const LOAD_ONE_COMMENT = 'comment/LOAD_ONE_COMMENT';

const REMOVE_COMMENT = 'comment/REMOVE_COMMENT';

const loadComments = (comments) => {
	return {
		type: LOAD_ALL_COMMENTS,
		comments,
	};
};

const loadOneComment = (comments) => {
	return {
		type: LOAD_ONE_COMMENT,
		comments,
	};
};

const removeComment = (commentId) => {
	return {
		type: REMOVE_COMMENT,
		commentId,
	};
};

export const getAllComments = () => async (dispatch) => {
	const response = await fetch('/api/comments/');
	if (response.ok) {
		// const comments = commentsObj.Comments
		const comments = await response.json();
		// console.log(comments)
		dispatch(loadComments(comments));
	}
};

export const getAllCommentsByAUser = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/comments`);

	if (response.ok) {
		const comments = await response.json();
		dispatch(loadComments(comments));
	}
};

export const getOneComment = (commentId) => async (dispatch) => {
	const response = await fetch(`/api/comments/${commentId}`);

	if (response.ok) {
		const comment = await response.json();
		dispatch(loadOneComment(comment));
		return comment;
	}
};

export const addComment = (photoId, comments) => async (dispatch) => {
	// console.log('*********photoId store*********', photoId, comments);
	// console.log('*****TYPE OF****', typeof photoId, typeof comments);
	// console.log('***********',JSON.stringify(comments))
	const response = await fetch(`/api/photos/${photoId}/comments`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(comments),
	});

	if (response.ok) {
		const comment = await response.json();
		dispatch(loadOneComment(comment));
		return comment;
	} else {
		const error = await response.json();
		return error;
	}
};

// export const addComment = (photoId, text) => async (dispatch) => {
//   const payload = { photoId, text };

//   const response = await fetch(`/api/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });

//   if (response.ok) {
//     const comment = await response.json();
//     dispatch(loadOneComment(comment));
//     return comment;
//   } else {
//     const error = await response.json();
//     return error;
//   }
// };

export const editComment =
	(commentId, commentData) => async (dispatch) => {
		const response = await fetch(
			`/api/comments/${commentId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(commentData),
			}
		);
		if (response.ok) {
			const commentData = await response.json();
			dispatch(loadOneComment(commentData));
			return commentData;
		} else {
			const error = await response.json();
			return error;
		}
	};

export const deleteAComment = (commentId) => async (dispatch) => {
	const response = await fetch(`/api/comments/${commentId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		dispatch(removeComment(commentId));
	}
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case FULL_RESET:
			return { ...initialState };

		case LOAD_ALL_COMMENTS:
			action.comments.forEach((comment) => {
				newState[comment.id] = comment;
			});
			return newState;

		case LOAD_ONE_COMMENT:
			newState[action.comments.id] = action.comments;
			return newState;

		case REMOVE_COMMENT:
			delete newState[action.commentId];
			return newState;

		default:
			return state;
	}
};

export default commentsReducer;

export function selectMyComments(state) {
	const currentUser = state.session.user;

	if (!currentUser) {
		return [];
	}

	return Object.values(state.comment).filter(
		({ userId: commentAuthorId }) => commentAuthorId === currentUser.id
	);
}

export function selectPhotoComments(state) {
	const currentUser = state.session.user;

	if (!currentUser) {
		return [];
	}

	return Object.values(state.comment).filter(
		({ userId: commentAuthorId }) => commentAuthorId === currentUser.id
	);
}
