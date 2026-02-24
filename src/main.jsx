import { BrowserRouter, Routes, Route } from 'react-router';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ArticleCard } from './components/ArticleCard.jsx';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/articles/:article_id" element={<ArticleCard />} />
		</Routes>
	</BrowserRouter>,
);
