import { useLoggedInUser } from '../hooks/useLoggedInUser';

export function LoggedInUser() {
	const { loggedInUser } = useLoggedInUser();

	return (
		<div className="logged_in_user">
			<img
				src={loggedInUser.avatar_url}
				alt="user avatar"
				className="user_avatar"
			/>
			<p>{loggedInUser.username}</p>
		</div>
	);
}
