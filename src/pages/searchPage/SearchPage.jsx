import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../../components/cards/Card';
import NavHeader from '../../components/header/NavHeader';

export default function SearchPage() {
  const location = useLocation();
  const query = location.state?.query || new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState(location.state?.results || []);
  const [loading, setLoading] = useState(!location.state?.results);
  
  useEffect(() => {
    // If results already passed via navigate state, skip fetch
    if (location.state?.results) return;

    if (!query) return;

    setLoading(true);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => setResults(data.results || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query, location.state]);

    
  return (
    <>
    <NavHeader  />
    <div style={{ padding: 20 }}>
      
      <h2 style={{color:"white"}}>Search results for "{query}"</h2>

      {loading && <p>Loading...</p>}
      {!loading && results.length === 0 && <p>No results found.</p>}

      <div className="movie-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {results.map(movie => <Card key={movie.id} movie={movie} />)}
      </div>
    </div>
    </>
  );
}
