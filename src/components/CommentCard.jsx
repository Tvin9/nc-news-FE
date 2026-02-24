import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export function CommentCard() {
	const [comments, setComments] = useState(null);
	const { article_id } = useParams();
	useEffect(() => {
		async function fetchComments() {
			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/articles/${article_id}/comments`,
			);
			const body = await response.json();
			setComments(body.comments);
		}
		fetchComments();
	}, []);

	if (!comments) {
		return <div>Loading...</div>;
		//skeleton loader in here?
	}

	return (
		<main className="comments">
			<h2>Comments</h2>
			{comments.map((comment, i) => {
				return (
					<div
						className="comment_card"
						key={`comment + ${i} ${comment.article_id}`}
					>
						<p>{comment.author}</p>
						<p>{new Date(comment.created_at).toLocaleDateString()}</p>
						<p>{comment.body}</p>
						<p>{comment.votes}</p>
					</div>
				);
			})}
		</main>
	);
}
