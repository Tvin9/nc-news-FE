import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export function useLoggedInUser() {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	return { loggedInUser, setLoggedInUser };
}
