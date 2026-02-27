import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from './components/Home';
import { Articles } from './components/Articles';
import { ArticleCard } from './components/ArticleCard';
import { Users } from './components/Users';
import { Topics } from './components/Topics';
import { UserProvider } from './contexts/UserContext';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/articles/:article_id" element={<ArticleCard />} />
					<Route path="/authors" element={<Users />} />
					<Route path="/topics" element={<Topics />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
