import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import MovieDetail from './pages/movieDetail/MovieDetail';
import SearchPage from './pages/searchPage/SearchPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import GenrePage from './pages/genre/GenrePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="search" element={<SearchPage />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="movie/favorite" element={<FavoritesPage />} /> 
        <Route path="/*" element={<div style={{color: 'white', textAlign: 'center', padding: '50px', fontSize: '2rem'}}><h1>404 Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}
