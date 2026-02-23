import Box from '@mui/system/Box';
import { NavBar } from './NavBar';
import { useState, useEffect } from 'react';

export function Header() {
	return (
		<Box>
			NC News
			<NavBar />
		</Box>
	);
}
