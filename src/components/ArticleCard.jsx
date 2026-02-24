import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from './Header';
import { CommentCard } from './CommentCard';

export function ArticleCard() {
	const [article, setArticle] = useState(null);
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
								<li>{a.author}</li>
								<li>{new Date(a.created_at).toLocaleDateString()}</li>
							</ul>
							<ul className="article_counters">
								<li>Votes: {a.votes}</li>
								<li>Comments: {a.comment_count}</li>
							</ul>
							<p>{a.body}</p>
						</div>
						<CommentCard article_id={a.article_id} />
					</main>
				);
			})}
		</>
	);
}
