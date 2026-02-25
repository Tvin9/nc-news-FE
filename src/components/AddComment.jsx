import { useState, useEffect } from 'react';

export function AddComment(props) {
	const [newComment, setNewComment] = useState('');
	const [error, setError] = useState(null);
	const [commenting, setCommenting] = useState(false);
	const { article_id, setComments } = props;

	const postComment = async function (e) {
		e.preventDefault();
		if (!newComment.trim()) {
			setError('Comment cannot be empty');
			return;
		}

		setCommenting(true);
		setError(null);

		try {
			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/articles/${article_id}/comments`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ author: 'cooljmessy', body: newComment }),
				},
			);

			if (!response.ok) {
				throw new Error("Couldn't post comment");
			}

			const data = await response.json();

			setComments((comments) => [data.comment, ...comments]);
			setNewComment('');
		} catch (err) {
			setError("Sorry, we couldn't post your comment");
		} finally {
			setCommenting(false);
		}
	};
	console.log('commenting state:', commenting);
	return (
		<form onSubmit={postComment} className="add_comment_form">
			<textarea
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				placeholder="Write your comment..."
				required
			/>
			<button type="submit" disabled={commenting}>
				{commenting ? '...' : 'Add comment'}
			</button>
			{error && <p className="error_text">{error}</p>}
		</form>
	);
}
