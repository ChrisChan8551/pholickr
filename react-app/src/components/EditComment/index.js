import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllComments,
	getOneComment,
	addComment,
	editComment,
	deleteAComment,
	selectMyComments,
} from '../../store/comment';

function EditCommentForm({ comment, hideForm }) {
	const dispatch = useDispatch();
	const [text, setText] = useState(comment.text);
	console.log('************* FRONT END EDIT COMMENT ******', comment);
	const handleSubmit = async (e) => {
		console.log('************* HANDLE SUBMIT ******', comment);
		e.preventDefault();
		const payload = { text };
		await dispatch(editComment(comment.id, payload));
		hideForm();
	};

	useEffect(() => {
		const handleClick = (e) => {
			if (!e.target.closest('.comment-input')) {
				hideForm();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [hideForm]);

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				className='comment-input'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<p>
				<button className='blue-button' type='submit'>
					Update
				</button>
			</p>
		</form>
	);
}

export default EditCommentForm;
