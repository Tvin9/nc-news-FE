import { useState, useEffect } from 'react';

export function Articles() {
	const [articles, setArticles] = useState(null);

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
	}

	return (
		<ul>
			{articles.articles.map((article) => {
				return (
					<li key={article.article_id}>
						<h2>{article.title}</h2>
						<p>Votes: {article.votes}</p>
						<p>Comments: {article.comment_count}</p>
					</li>
				);
			})}
		</ul>
	);
}
