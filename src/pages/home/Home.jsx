import React, { useEffect, useState } from 'react';
import './Home.css';
export default function Home() {

    const [ popularMovies, setPopularMovies] = useState([]);

    useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`)
        .then(res=>res.json())
        .then(data=>setPopularMovies(data.results))
    },[])

  return (
    <div>Home</div>
  )
}
