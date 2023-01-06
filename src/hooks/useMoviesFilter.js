import React from "react";

export function useMoviesFilter() {
    const [isCheckboxOn, setIsCheckboxOn] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [initialMovies, setInitialMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
    const [filterName, setFilterName] = React.useState("");

    const handleFilter = (array) => {
        const result = isCheckboxOn
            ? array.filter(
                  (movie) =>
                      movie.duration <= 40 &&
                      (movie.nameRU
                          .toLowerCase()
                          .includes(filterName.toLowerCase()) ||
                          movie.nameEN
                              .toLowerCase()
                              .includes(filterName.toLowerCase()))
              )
            : array.filter(
                  (movie) =>
                      movie.nameRU
                          .toLowerCase()
                          .includes(filterName.toLowerCase()) ||
                      movie.nameEN
                          .toLowerCase()
                          .includes(filterName.toLowerCase())
              );
        return result;
    };

    React.useEffect(() => {
        setFilteredMovies(handleFilter(initialMovies));
    }, [initialMovies, filterName, isCheckboxOn]);

    React.useEffect(() => {
        setFilteredSavedMovies(handleFilter(savedMovies));
    }, [savedMovies, filterName, isCheckboxOn]);

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
