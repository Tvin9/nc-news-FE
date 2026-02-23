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
	console.log(articles);
	return (
		<>
			<ul>Articles here</ul>
		</>
	);
}
