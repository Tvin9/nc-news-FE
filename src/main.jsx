import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ArticleCard } from './components/ArticleCard.jsx';
import { Users } from './components/Users.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<UserProvider>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/articles/:article_id" element={<ArticleCard />} />{' '}
				<Route path="/authors" element={<Users />} />
			</Routes>
		</UserProvider>
	</BrowserRouter>,
);
