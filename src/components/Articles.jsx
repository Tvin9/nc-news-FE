// Articles.jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { Header } from './Header';

export function Articles() {
	const [articles, setArticles] = useState(null);
	const [activeId, setActiveId] = useState(null);
	const [error, setError] = useState(null);
	const [searchParams] = useSearchParams();
	const topic = searchParams.get('topic');

	useEffect(() => {
		async function fetchArticles() {
			try {
				const url = topic
					? `https://nc-news-yyic.onrender.com/api/articles/?topic=${topic}`
					: 'https://nc-news-yyic.onrender.com/api/articles/';
				const response = await fetch(url);
				const body = await response.json();
				setArticles(body);
			} catch (err) {
				setError(err.message);
			}
		}
		fetchArticles();
	}, [topic]);

	if (error) return <p>Error: {error}</p>;
	if (!articles) return <div>Loading...</div>;

	return (
		<main className="main_page">
			<Header />
			<ul className="generic_list">
				{articles.articles.map((article) => (
					<li
						key={article.article_id}
						className="item"
						onMouseEnter={() => setActiveId(article.article_id)}
						onMouseLeave={() => setActiveId(null)}
					>
						<Link to={`/articles/${article.article_id}`} className="link">
							<div>
								<img
									src={article.article_img_url}
									alt="News image"
									className="news_image"
								/>
								<h3
									className={
										activeId === article.article_id ? 'active_link' : ''
									}
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
				))}
			</ul>
		</main>
	);
}
