import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider(props) {
	const [loggedInUser, setLoggedInUser] = useState({
		username: 'cooljmessy',
		avatar_url:
			'https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002S',
	});

	return (
		<UserContext value={{ loggedInUser, setLoggedInUser }}>
			{props.children}
		</UserContext>
	);
}
