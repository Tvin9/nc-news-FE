import { useState } from 'react';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { FaRegTrashCan } from 'react-icons/fa6';

export function DeleteComment(props) {
	const { comment_id, setComments, author } = props;
	const { loggedInUser } = useLoggedInUser();
	const [error, setError] = useState(null);

	if (!loggedInUser || loggedInUser.username !== author) {
		return null;
	}

	async function handleDelete() {
		try {
			setError(null);
			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/comments/${comment_id}`,
				{
					method: 'DELETE',
				},
			);
			if (!response.ok) {
				throw new Error("We couldn't delete your comment");
			}

			setComments((preComments) =>
				preComments.filter((comment) => comment.comment_id !== comment_id),
			);
		} catch (err) {
			setError("We couldn't delete your comment");
		}
	}

	return (
		<>
			{error && <p className="error_text">{error}</p>}
			<button className="delete_button" onClick={handleDelete}>
				<FaRegTrashCan />
			</button>
		</>
	);
}
