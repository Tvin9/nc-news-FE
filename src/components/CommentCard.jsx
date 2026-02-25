import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FaRegThumbsUp } from 'react-icons/fa';
import { AddComment } from './AddComment';

export function CommentCard() {
	const [comments, setComments] = useState(null);
	const [showComments, setShowComments] = useState(false);
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
	}, [article_id]);

	const handleClick = function () {
		!showComments ? setShowComments(true) : setShowComments(false);
	};

	return (
		<>
			<button className="show_comments" onClick={handleClick}>
				{!showComments ? 'Show Comments' : 'Hide Comments'}
			</button>
			{showComments && (
				<main className="comments">
					<h2>Comments</h2>

					<AddComment article_id={article_id} setComments={setComments} />

					{!comments ? (
						<div>Loading...</div>
					) : (
						comments.map((comment) => {
							return (
								<div className="comment_card" key={comment.comment_id}>
									<p>{comment.author}</p>
									<p>
										{new Date(comment.created_at).toLocaleDateString('en-GB')}
									</p>
									<p>{comment.body}</p>
									<p>
										<button className="vote_button">
											<FaRegThumbsUp className="active_thumb" />
										</button>

										{comment.votes}
									</p>
								</div>
							);
						})
					)}
				</main>
			)}
		</>
	);
}
