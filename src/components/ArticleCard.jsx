import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from './Header';

export function ArticleCard() {
	const [article, setArticle] = useState(null);
	const { article_id } = useParams();

	useEffect(() => {
		async function fetchArticle() {
			const response = await fetch(
				`https://nc-news-yyic.onrender.com/api/articles/${article_id}`,
			);
			const body = await response.json();
			setArticle(body.article.article);
		}
		fetchArticle();
	}, []);

	if (!article) {
		return <div>Loading...</div>;
		//skeleton loader in here?
	}

	return (
		<>
			<Header />

			{article.map((a) => {
				return (
					<div>
						<img
							key={`pic + ${a.article_id}`}
							src={a.article_img_url}
							alt="article picture"
						/>
						<h2>{a.title}</h2>
						<ul className="article_info">
							<li>{a.author}</li>
							<li>{a.created_at}</li>
						</ul>
						<ul>
							<li>{a.votes}</li>
							<li>{a.comments}</li>
						</ul>
						<p key={`body + ${a.article_id}`}>{a.body}</p>;
					</div>
				);
			})}
		</>
	);
}
