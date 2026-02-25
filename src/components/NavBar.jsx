import { color } from '@mui/system';
import { Link } from 'react-router';

export function NavBar() {
	return (
		<ul id="nav_bar">
			<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
				<li className="article_link">
					<h3>Articles</h3>
				</li>
			</Link>

			<li>
				<h3>Topics</h3>
			</li>
			<li>
				<h3>Authors</h3>
			</li>
			<li>
				<h3>About</h3>
			</li>
		</ul>
	);
}
