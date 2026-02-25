import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from './Header';
import { CommentCard } from './CommentCard';
import { FaThumbsUp } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';

export function ArticleCard() {
	const [article, setArticle] = useState(null);
	const [articleVote, setArticleVote] = useState(0);
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
	}, []);

	if (!article) {
		return <div>Loading...</div>;
		//skeleton loader in here?
	}

	const handleVote = async function (id) {
		try {
			setArticleVote(1);

			await fetch(`https://nc-news-yyic.onrender.com/api/articles/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ inc_votes: 1 }),
			});
		} catch (err) {
			setArticleVote(0);
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
								<li>posted on {new Date(a.created_at).toLocaleDateString()}</li>
							</ul>
							<ul className="article_counters">
								<li>
									<button
										className="vote_button"
										onClick={() => handleVote(a.article_id)}
									>
										{articleVote ? (
											<FaThumbsUp
												className="active_thumb"
												style={{ color: 'green' }}
											/>
										) : (
											<FaRegThumbsUp className="active_thumb" />
										)}
									</button>
									{a.votes + articleVote}
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
