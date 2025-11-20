import React, {useEffect, useState} from "react"
import "./MovieList.css"
// import { useParams } from "react-router-dom"
import Cards from "../cards/Card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    
    
    const getData = () => {
        // fetch('https://api.themoviedb.org/3/account/22484729/lists?page=1')

        fetch(`https://api.themoviedb.org/3/movie/${"top_rated"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }
    
    useEffect(() => {
        getData()
    }, [])

    

    

    return (
        <div className="movie__list">
            <h2 className="list__title">{("top rated").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList