import { Box, display, flexDirection } from '@mui/system';

export function NavBar() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'row' }}>
			<ul>
				<li>Home</li>
				<li>Articles</li>
				<li>Topics</li>
				<li>Authors</li>
			</ul>
		</Box>
	);
}
