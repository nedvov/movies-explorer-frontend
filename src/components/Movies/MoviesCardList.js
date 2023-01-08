import React from "react";
import MoviesCard from "./MoviesCard";
import StatusText from "../StatusText/StatusText";

function MoviesCardList({ movies, type, onSave, onDelete, text, savedMoviesIds, status }) {    
   
    const [width, setWidth] = React.useState(window.innerWidth);    

    const moviesInString = 
       (width > 1279) ? 4 :
       (width > 1023) ? 3 :
       (width > 767) ? 2 : 1;
    ;

    const [moviesCount, setMoviesCount] = React.useState( 7 * moviesInString);

    function handleAddClick() {
        setMoviesCount(
            moviesInString === 1
            ? moviesCount + 5
            : moviesCount + (moviesInString - (moviesCount % moviesInString)) 
        );
    }

    function updateWidth () { 
        setWidth(window.innerWidth);
    }; 

    const slicedMovies = type !== "saved" ? movies.slice(0, moviesCount) : movies;

    const moviesElements = slicedMovies.map((movie) => (
        <MoviesCard
            key={type === "saved" ? movie.movieId : movie.id}
            movie={movie}
            type={type}
            onSave={onSave}
            onDelete={onDelete}
            savedMoviesIds={savedMoviesIds}
        />
    ));

    React.useEffect(() => { 
        window.addEventListener("resize", updateWidth); 
        return () => window.removeEventListener("resize", updateWidth);
    });


    return (
        <main className="movies">
            {
            movies.length === 0
            ? <StatusText text={text}/>
            : 
                <>
                    <ul className="movies__items">{moviesElements}</ul>
                    {
                        ((moviesCount < movies.length) && type !== "saved") &&
                        <button className="movies__button" onClick={handleAddClick} type="button">Ещё</button>
                    }    
                </>
            }               
        </main>
       
    );
}

export default MoviesCardList;