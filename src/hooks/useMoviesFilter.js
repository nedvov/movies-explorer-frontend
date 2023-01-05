import React from "react";

export function useMoviesFilter() {
    const [isCheckboxOn, setIsCheckboxOn] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [initialMovies, setInitialMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
    const [filterName, setFilterName] = React.useState([]);

    const handleFilter = (array) => {
        const result = 
            isCheckboxOn 
                ? array.filter(movie => (movie.duration <= 40 && movie.nameRU.includes(filterName)))
                : array.filter(movie => (movie.nameRU.includes(filterName)))
        return result
    }

    const handleAggregate = (initailArray, saveArray) => {
        const relations = {}
        saveArray.forEach((movie) => {
            relations[movie.movieId] =  movie._id
        })
        const aggregateArray = initailArray.map((movie) => (movie))
        aggregateArray.forEach((movie) => {Object.keys(relations).includes(movie.id.toString()) ? movie.dbId = relations[movie.id] : movie.dbId = false})
    return aggregateArray
    }

    React.useEffect(() => {
        setFilteredMovies(handleFilter(handleAggregate(initialMovies, savedMovies)));
        setFilteredSavedMovies(handleFilter(savedMovies));
    }, [initialMovies, savedMovies, isCheckboxOn, filterName]);

    return {
        initialMovies, 
        savedMovies, 
        filteredMovies, 
        filterName, 
        isCheckboxOn,
        setInitialMovies,
        setSavedMovies,
        setIsCheckboxOn,
        setFilterName,
        handleFilter,
        filteredSavedMovies,
        setFilteredSavedMovies,
    };
}
