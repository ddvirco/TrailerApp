import './MovieList.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MovieListComp() {

    const [movieData, setMovieData] = useState([])
    const [moviePoster, setMoviePoster] = useState({})
    const [searchMovie, setSearchMovie] = useState()
    const [trailerKey, setTrailerKey] = useState('')

    const api_key = 'api_key=a3153f9d5bde0472161f72f7c1dbedd5'
    const url = 'https://api.themoviedb.org/3'
    const API_URL = url + `/discover/movie?sort_by=popularity.desc&${api_key}`
    const SEARCH_MOVIE = url + `/search/movie?${api_key}&query=${searchMovie}`
    const imagePoster = `https://image.tmdb.org/t/p/original/${moviePoster.backdrop_path}`
    const TRAILER = url+`/movie/${moviePoster.id}?${api_key}&append_to_response=videos`

    const getMovieData = async () => {
        const resp = await axios.get(API_URL)
        const allMovie = resp.data.results.filter(x => {
            if( x.vote_average > 0){
                return true
            }
            else{
                return false
            }
        })
        setMovieData(allMovie)
    }

    const getTitle = (data) => {
        setMoviePoster(data)
        setTrailerKey('')
        window.scrollTo(
            {
                top: 100,
                left: 100,
                behavior: 'smooth'
              }
        );
    }

    const movieSearch = async (e) => {
        e.preventDefault()
        const resp = await axios.get(SEARCH_MOVIE)
        const movieFromSearch = resp.data.results.filter((x) => {
            if((x.vote_average > 0  )){
                return true
            }
            else{
                return false
            }
        });
        console.log(movieFromSearch)
        setMovieData(movieFromSearch)
        setMoviePoster('')
    }

    const fetchMovie = async() =>{
        const resp = await axios.get(TRAILER)
        const allResp = await resp.data
        console.log(allResp)
        const findT =  allResp.videos.results.find( x => x.name === `Official Trailer`)
        if(findT){
            setTrailerKey(findT.key)
            console.log(findT.key)
        }
        else{
            const findT2 = allResp.videos.results.find( x => x.name = `Official Trailer`)
            setTrailerKey(findT2.key)
        }
    }

    useEffect(() => {
        getMovieData()
    }, [])

    return (
        <>
            <div className='search-movie'>
                <form onSubmit={movieSearch}>
                    <div className="input-container">
                        <input type='text'
                            onChange={(e) => setSearchMovie(e.target.value)}
                            placeholder='Search a movie' />
                    </div>
                </form>
            </div>
            <div className='cover-photo' >
                {moviePoster.backdrop_path  ?
                    <>
                        <div className='trailerButton'>
                            <button onClick={fetchMovie}>Play trailer</button>
                            <div className='trailer-movie'>
                                {trailerKey && < iframe className='iframe-movie' 
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    frameborder="0"
                                    allow="autoplay; encrypted-media"
                                    allowfullscreen
                                    title="video" ></iframe>
                                    }
                            </div>
                        </div>
                        
                        <div className='poster'>{moviePoster.backdrop_path ? <img src={imagePoster} /> : null}</div>
                        <div className='movie-title'>{moviePoster.title}
                        
                        </div>
                        <div className='movie-overview'><p>{moviePoster.overview}</p></div>
                    </>
                    : null}
            </div>
            <div className='movieList'>
                {movieData?.map((item) => {
                    return <MovieCard key={item.id} image={item.poster_path} data={item}
                        title={item.title} dataFromCard={getTitle} />
                })}
            </div>
        </>
    )
}

export default MovieListComp