import React from "react";

function MoviesCard({ movie, type }) {  
    const [isLiked, setIsLiked] = React.useState(false);
    
    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    const durationM = movie.duration % 60;
    const durationH = (movie.duration - durationM) / 60;
        
    

    return (
        <li className="movies__item" id={movie.id}>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="movies__image"
                    src={"https://api.nomoreparties.co" + movie.image.url}
                    alt={movie.nameRU}
                />
            </a>            
            <div className="movies__info">
                <div className="movies__container">
                    <h2 className="movies__title">{movie.nameRU}</h2>
                    <p className="movies__duration">{`${durationH}ч${durationM}м`}</p>
                </div>
                <button
                    className={
                        type === "saved" 
                            ? "movies__delete"
                            :
                            isLiked
                                ? "movies__like movies__like_active"
                                : "movies__like"
                    }
                    onClick={handleLikeClick}
                    type="button"
                />
            </div>
        </li>   
    );
}

export default MoviesCard;