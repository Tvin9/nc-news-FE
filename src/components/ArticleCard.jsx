import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from './Header';
import { CommentCard } from './CommentCard';
import { FaThumbsUp } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaThumbsDown } from 'react-icons/fa';
import { FaRegThumbsDown } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';

export function ArticleCard() {
	const [article, setArticle] = useState(null);
	const [userVote, setUserVote] = useState(0);
	const [error, setError] = useState(false);
	const { article_id } = useParams();

	useEffect(() => {
		async function fetchArticle() {
			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/articles/${article_id}`,
			);
			const body = await response.json();
			setArticle(body.article);
		}
		fetchArticle();
	}, [article_id]);

	if (!article) {
		return <div>Loading...</div>;
		//skeleton loader in here?
	}

	const handleVote = async function (id, vote) {
		try {
			if (userVote !== 0) return;

			setUserVote(vote);
			setError(null);

			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/articles/${id}`,
				{
					method: 'PATCH', //declare PATCH as it's not supported with fetch
					headers: { 'Content-Type': 'application/json' }, //tells server what data to expect
					body: JSON.stringify({ inc_votes: vote }), //turns the input object into a json package
				},
			);
			if (!response.ok) {
				throw new Error('Vote failed!');
			}
		} catch (err) {
			setUserVote(0); //resets vote if fails
			setError(true);
		}
	};

	return (
		<>
			<Header />

			{article.map((a) => {
				return (
					<main key={`article + ${a.article_id}`}>
						<div>
							<img
								className="article_image"
								src={a.article_img_url}
								alt="article picture"
							/>
							<h2>{a.title}</h2>
							<ul className="article_info">
								<li>by {a.author}</li>
								<li>
									posted on {new Date(a.created_at).toLocaleDateString('en-GB')}
								</li>
							</ul>
							<ul className="article_counters">
								<li>
									<button
										className="vote_button"
										onClick={() => handleVote(a.article_id, 1)}
									>
										{userVote === 1 && !error ? (
											<FaThumbsUp
												className="active_thumb"
												style={{ color: 'green' }}
											/>
										) : (
											<FaRegThumbsUp className="active_thumb" />
										)}
									</button>
								</li>
								<li>
									<button
										className="vote_button"
										onClick={() => handleVote(a.article_id, -1)}
									>
										{userVote === -1 && !error ? (
											<FaThumbsDown
												className="active_thumb"
												style={{ color: 'red' }}
											/>
										) : (
											<FaRegThumbsDown className="active_thumb" />
										)}
									</button>
								</li>
								<li>{a.votes + userVote}</li>
								<li className="error_text">
									{error ? 'There was a problem registering your vote' : ''}
									<style></style>
								</li>
								<li>
									<BiCommentDetail className="comment_icon" /> {a.comment_count}
								</li>
							</ul>
							<p className="article_body">{a.body}</p>
						</div>
						<CommentCard article_id={a.article_id} />
					</main>
				);
			})}
		</>
	);
}
