import Box from '@mui/system/Box';
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';

export function Header() {
	return (
		<Box>
			<h1>NC News</h1>
			<NavBar />
		</Box>
	);
}
