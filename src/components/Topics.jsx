import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from './Header';

export function Topics() {
	const [topics, setTopics] = useState(null);
	const [activeTopic, setActiveTopic] = useState(null);

	useEffect(() => {
		async function fetchTopics() {
			const response = await fetch(
				'https://nc-news-yyic.onrender.com/api/topics/',
			);
			const body = await response.json();
			setTopics(body);
		}
		fetchTopics();
	}, []);

	if (!topics) {
		return <p>Loading...</p>;
	}

	return (
		<main className="main_page">
			<Header />
			<ul className="generic_list">
				{topics.topics.map((topic) => {
					return (
						<li
							key={topic.slug}
							className="item"
							onMouseOver={() => {
								setActiveTopic(topic.slug);
							}}
						>
							<img
								src={topic.img_url}
								alt="topic picture"
								className="news_image"
							/>
							<h3
								style={{
									color: activeTopic === topic.slug ? 'blue' : 'black',
									textDecoration:
										activeTopic === topic.slug ? 'underline' : 'none',
								}}
							>
								{topic.slug}
							</h3>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
