import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Articles() {
	const [articles, setArticles] = useState(null);
	const [activeId, setActiveId] = useState(null);

	useEffect(() => {
		async function fetchArticles() {
			const response = await fetch(
				'https://nc-news-yyic.onrender.com/api/articles/',
			);
			const body = await response.json();
			setArticles(body);
		}
		fetchArticles();
	}, []);

	if (!articles) {
		return <div>Loading...</div>;
		//skeleton loader in here?
	}

	return (
		<ul id="article_list">
			{articles.articles.map((article) => {
				return (
					<li key={article.article_id} className="article_item">
						<Link
							to={`/articles/${article.article_id}`}
							className="article_link"
						>
							<div
								onMouseEnter={() => {
									setActiveId(article.article_id);
								}}
								onMouseLeave={() => {
									setActiveId(null);
								}}
							>
								<img
									src={article.article_img_url}
									alt="News image"
									className="news_image"
								/>
								<h3
									style={{
										color: activeId === article.article_id ? 'blue' : 'black',
										textDecoration:
											activeId === article.article_id ? 'underline' : 'none',
									}}
								>
									{article.title}
								</h3>
							</div>
							<div>
								<ul className="articles_votes_comments">
									<li>
										{article.votes < 0 ? (
											<FaRegThumbsDown className="thumb" />
										) : (
											<FaRegThumbsUp className="thumb" />
										)}
										{article.votes}
									</li>
									<li>
										<BiCommentDetail className="comment_icon" />
										{article.comment_count}
									</li>
								</ul>
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
