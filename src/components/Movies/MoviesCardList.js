import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList({ movies, type }) {    
   
    const [width, setWidth] = React.useState(window.innerWidth);    

    const moviesInString = 
       (width > 1279) ? 4 :
       (width > 1023) ? 3 :
       (width > 767) ? 2 : 1;
    ;

    const [moviesCount, setMoviesCount] = React.useState( 7 * moviesInString);

    function handleAddClick() {
        setMoviesCount( moviesCount + (moviesInString - (moviesCount % moviesInString)) );
    }

    function updateWidth () { 
        setWidth(window.innerWidth);
        console.log(width);
    }; 

    const slicedMovies = type !== "saved" ? movies.slice(0, moviesCount) : movies;

    const moviesElements = slicedMovies.map((movie) => (
        <MoviesCard
            key={movie.id}
            movie={movie}
            type={type}
        />
    ));

    React.useEffect(() => { 
        window.addEventListener("resize", updateWidth); 
        return () => window.removeEventListener("resize", updateWidth);
    });

    return (
        <main className="movies">
            <ul className="movies__items">{moviesElements}</ul>
            {
                ((moviesCount < movies.length) && type !== "saved") &&
                <button className="movies__button" onClick={handleAddClick} type="button">Ещё</button>
            }            
        </main>
       
    );
}

export default MoviesCardList;