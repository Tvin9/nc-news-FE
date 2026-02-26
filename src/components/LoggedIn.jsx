import { useLoggedInUser } from '../hooks/useLoggedInUser';

export function LoggedInUser() {
	const { loggedInUser } = useLoggedInUser();

	return (
		<div className="logged-in-user">
			<p>Logged in as: {loggedInUser.username}</p>
			<img
				src={loggedInUser.avatar_url}
				alt="user avatar"
				className="user_avatar"
			/>
		</div>
	);
}
