import { useState, useEffect } from 'react';
import { Header } from './Header';

export function Users() {
	const [users, setUsers] = useState(null);
	useEffect(() => {
		async function fetchUsers() {
			const response = await fetch(
				'https://nc-news-yyic.onrender.com/api/users/',
			);
			const body = await response.json();
			setUsers(body);
		}
		fetchUsers();
	}, []);

	if (!users) return <p>Loading...</p>;

	return (
		<main>
			<Header />
			<ul>
				{users.users.map((user) => (
					<li key={user.username}>
						<p>Username: {user.username}</p>
						<p>Name: {user.name}</p>
						<img src={user.avatar_url} alt={user.username} width={50} />
					</li>
				))}
			</ul>
		</main>
	);
}
