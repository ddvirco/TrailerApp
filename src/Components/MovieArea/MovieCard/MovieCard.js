import './MovieCard.css';

function MovieCard({image, title, data, dataFromCard}){

    const imagePath = `https://image.tmdb.org/t/p/w500/${image}`
    
    return (
    <div className="card" >
        {/* <div className='card-title'><h5>{title}</h5></div> */}
        <img src={imagePath} alt={title} onClick={()=> {dataFromCard(data)} }/>
        {/* <img src={imagePath} alt={title} onClick={()=> {dataFromCard(data.backdrop_path, title)} }/> */}
        <div className='movie-vote'>
            <p>{data.vote_average}</p>
        </div>
            
    </div>)
}

export default  MovieCard