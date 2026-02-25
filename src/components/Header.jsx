import Box from '@mui/system/Box';
import { NavBar } from './NavBar';
import { Link } from 'react-router';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

export function Header() {
	return (
		<Box>
			<div className="Header">
				<h1>NC News</h1>
				<div className="external_links">
					<a href="www.linkedin.com/in/christopher-harrison-33841ba5">
						<FaLinkedin />
					</a>
					<a href="https://github.com/Tvin9">
						<FaGithub />
					</a>
				</div>
			</div>
			<NavBar />
		</Box>
	);
}
