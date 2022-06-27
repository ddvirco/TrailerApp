import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {Routes ,Route} from 'react-router-dom'
import axios from 'axios';
import MovieCard from './Components/MovieArea/MovieCard/MovieCard';
import HeaderComp from './Components/Header/Header';
import NavbarComp from './Components/Navbar/Navbar';
import ContactComp from './Components/Contact/Contact';
import TVlistComp from './Components/TVArea/TVList/TVlist';
import MovieListComp from './Components/MovieArea/MovieList/MovieList';

function App() {

    const [allData, setAllData]= useState([])
    const [searchMovie, setSearchMovie] = useState()

    const api_key = 'api_key=a3153f9d5bde0472161f72f7c1dbedd5'
    const url = 'https://api.themoviedb.org/3'
    const API_URL = url+`/discover/movie?sort_by=popularity.desc&${api_key}`
    const SEARCH_MOVIE = url + `/search/movie?${api_key}&query=${searchMovie}`

    const getData = async () => {
        const resp = await axios.get(API_URL)
        const finalResp = await resp.data 
        setAllData(finalResp)
    }

    const movieSearch = async(e) => {
        e.preventDefault()
        // fetch(SEARCH_MOVIE).then(resp => resp.json()).then(data => console.log(data))
        const resp = await axios.get(SEARCH_MOVIE)
        setAllData(resp.data)
    }

    useEffect( () => {
        getData()
    },[])

  return (
    <div className="container">
      <HeaderComp />
      <NavbarComp />
      <br></br>

      <Routes>
        <Route path='/TVshow' element={<TVlistComp/>} />
        <Route path='/contact' element={<ContactComp />} />
        <Route path='/movies' element={<MovieListComp />} />
      </Routes>
      
      {/* <div className='search-movie'>
        <form onSubmit={movieSearch}>
            <div className="input-container">
            <input type='text' onChange={(e) => setSearchMovie(e.target.value) } placeholder='Search a movie'/>
            </div>
            <div>
                <button ><p>Search</p></button>
            </div>
        </form>
      </div> */}

    </div>
  );
}

export default App;
