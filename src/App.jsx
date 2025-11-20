import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<h1>Movie Detail page</h1>} />
          <Route path="movies/:type" element={<h1>Movie List page</h1>} />
          <Route path="movie/favorite" element={<h1>Favorite Movies</h1>} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}