import React from "react";
import { apiURL } from "../../consts/links";

function MoviesCard({ movie, type, onSave, onDelete }) {  
    
    function handleLikeClick() {
        onSave(movie);
    }

    function handleDislikeClick() {
        onDelete(movie.dbId);
    }

    function handleDeleteClick() {
        onDelete(movie._id);
    }

    const durationM = movie.duration % 60;
    const durationH = (movie.duration - durationM) / 60;
        
    

    return (
        <li className="movies__item" id={type === "saved" ? movie.movieId : movie.id}>
            <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="movies__image"
                    src={apiURL.moviesApiUrl + movie.image.url}
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
                            movie.dbId
                                ? "movies__like movies__like_active"
                                : "movies__like"
                    }
                    onClick={
                        type === "saved"
                            ? handleDeleteClick
                            :
                            movie.dbId
                                ? handleDislikeClick
                                : handleLikeClick
                    }
                    type="button"
                />
            </div>
        </li>   
    );
}

export default MoviesCard;