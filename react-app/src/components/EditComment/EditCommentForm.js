import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
	const history = useHistory();
	const [text, setText] = useState(comment.text);
	const [errors, setErrors] = useState([]);
	console.log(
		'************* FRONT END EDIT COMMENT ******',
		comment,
		hideForm
	);

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
				<button className='blue-button' type='submit' onClick={handleSubmit}>
					Update
				</button>
			</p>
		</form>
	);
}

export default EditCommentForm;
