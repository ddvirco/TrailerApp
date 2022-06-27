
function TVcardComp({vote, image,data, dataToList }){

    const imagePath = `https://image.tmdb.org/t/p/w500/${image}`

    // if(image == null){
    //     const imagePath = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
    // }

    return (
        <>
        
         {image != null ?  
        <div className="card" onClick={()=> dataToList(data)}>
            {/* <div className="card-title">{title}</div> */}
            <img src={imagePath} alt="Image" />
            <div className='movie-vote'>
                <p>Rating {vote}</p>
             </div>
        </div>
        : null }
        
       </> 
    )
}

export default TVcardComp