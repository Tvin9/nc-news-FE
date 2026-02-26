import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from './components/Home';
import { ArticleCard } from './components/ArticleCard';
import { Users } from './components/Users';
import { UserProvider } from './contexts/UserContext';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/articles/:article_id" element={<ArticleCard />} />
					<Route path="/authors" element={<Users />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
