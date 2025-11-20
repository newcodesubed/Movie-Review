
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<h1>Welcome to MovieApp</h1>} />
          <Route path="movie/:id" element={<h1>Movie Detail page</h1>} />
          <Route path="movies/:type" element={<h1>Movie List page</h1>} />
          <Route path="movie/favorite" element={<h1>Favorite Movies</h1>} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}