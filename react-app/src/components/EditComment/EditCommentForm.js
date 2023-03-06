import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { editComment } from '../../store/comment';

function EditCommentForm({ comment, hideForm }) {
	const dispatch = useDispatch();

	const [text, setText] = useState(comment.text);
	//eslint-disable-next-line
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		// console.log('************* HANDLE SUBMIT ******', comment);
		e.preventDefault();
		setErrors([]);
		const payload = { text };
		let data = await dispatch(editComment(comment.id, payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			hideForm();
		}
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
		<form>
			<textarea
				className='comment-input'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<p>
				<button
					className='blue-button'
					type='submit'
					onClick={handleSubmit}
				>
					Update
				</button>
			</p>
		</form>
	);
}

export default EditCommentForm;
