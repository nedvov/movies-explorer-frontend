import React from "react";
import MoviesCard from "./MoviesCard";

function MoviesCardList({ movies, type, onSave, onDelete, onRender }) {    
   
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
    }; 

    const slicedMovies = type !== "saved" ? movies.slice(0, moviesCount) : movies;

    const moviesElements = slicedMovies.map((movie) => (
        <MoviesCard
            key={type === "saved" ? movie.movieId : movie.id}
            movie={movie}
            type={type}
            onSave={onSave}
            onDelete={onDelete}
        />
    ));

    React.useEffect(() => { 
        window.addEventListener("resize", updateWidth); 
        return () => window.removeEventListener("resize", updateWidth);
    });

    React.useEffect(() => {
        if (type === "saved" && movies.length === 0) {
            onRender();
            console.log(`saved: ${movies.length}`)
        }         
    }, [movies.length, type]);

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