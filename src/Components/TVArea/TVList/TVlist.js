import './TVlist.css';
import axios from "axios"
import { useEffect, useState } from "react"
import TVcardComp from "../TVcard/TVcard"


function TVlistComp() {

    const [tvData, setTvData] = useState([])
    const [dataFromCard, setDataFromCard] = useState({})
    const [searchTV, setSearchTV] = useState('')
    const [trailerKey,setTrailerKey] = useState('')

    const api_key = 'api_key=a3153f9d5bde0472161f72f7c1dbedd5'
    const url = 'https://api.themoviedb.org/3'
    // const TV_URL = url+`/discover/tv?sort_by=popularity.desc&${api_key}`
    const TV_URL = url + `/tv/popular?${api_key}&language=en-US&page=1`
    const imagePoster = `https://image.tmdb.org/t/p/original/${dataFromCard.backdrop_path}`
    const SEARCH_TVsHOW = url + `/search/tv?${api_key}&query=${searchTV}`

    const TVSeason = url + `/tv/${dataFromCard.id}/season/${5}?${api_key}&language=en-US`
    // const episode = url + `/tv/${dataFromCard.id}//episode_groups?${api_key}&language=en-US`
    const TVvideo = url + `/tv/${dataFromCard.id}/videos?${api_key}&language=en-US`

    const getTvData = async () => {
        const resp = await axios.get(TV_URL)
        const gooArr = resp.data.results.filter((x) => {
            if(x.vote_average > 0){
                return true
            }
            else{
                return false
            }
        })
        setTvData(gooArr)
    }

    const getDataFromCard = (data) => {
        setDataFromCard(data)
        setTrailerKey('')
        window.scrollTo(
            {
                top: 100,
                left: 100,
                behavior: 'smooth'
              }
        );
    }

    const searchTvShow = async (e) => {
        e.preventDefault()
        const resp = await axios.get(SEARCH_TVsHOW)
        const gooArr = resp.data.results.filter((x) => {
            if(x.vote_average > 0 || x.poster_path !== null){
                return true
            }
            else{
                return false
            }
        })
        setTvData(gooArr)
        setDataFromCard('')
    }

    const playTrailer = async()=> {
        const resp = await axios.get(TVvideo)
        console.log(resp.data)
        const trailerKey1 = resp.data.results.find(x => x.name === "Trailer ")
        if(trailerKey1){
            setTrailerKey(trailerKey1.key)
        }
        else{
            const trailerKey2 = resp.data.results[0].key
            setTrailerKey(trailerKey2)
        }
    }

    useEffect(() => {
        getTvData()
    }, [])

    return (
        <>
            <div className='search-movie'>
                <form onSubmit={searchTvShow}>
                    <div className="input-container">
                        <input type='text'
                            onChange={(e) => setSearchTV(e.target.value)}
                            placeholder='Search a TV show' />
                    </div>
                </form>
            </div>

            {dataFromCard.backdrop_path ?
                <div className='cover-photo'>
                    <div className='youtube-TV'>
                        <button onClick={playTrailer}>Play Trailer</button>
                        {trailerKey ? 
                            <div className='trailer'>
                                <iframe className='iframe-class'
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    frameborder="0"
                                    allow="autoplay; encrypted-media"
                                    allowfullscreen
                                    title="video" />
                            </div>
                        : null}
                    </div>
                    <div className='poster'> <img src={imagePoster} />
                        <div className='tv-title'>{dataFromCard.name}</div>
                        <div className='overview'>{dataFromCard.overview}</div>
                    </div>
                </div>
            : null}
            
            <div className="TVlist">
                {tvData?.map((item) => {
                    return <TVcardComp key={item.id} title={item.name} vote={item.vote_average}
                        image={item.poster_path} data={item} dataToList={getDataFromCard} />
                })}
            </div>
        </>
    )
}

export default TVlistComp