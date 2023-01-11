import React from "react";
import { moviesAttributes } from "../consts/consts"

export function useMoviesFilter() {
    const [isCheckboxOn, setIsCheckboxOn] = React.useState(false);
    const [isSavedCheckboxOn, setIsSavedCheckboxOn] = React.useState(false);
    const [savedMovies, setSavedMovies] = React.useState([]);
    const [initialMovies, setInitialMovies] = React.useState([]);
    const [filteredMovies, setFilteredMovies] = React.useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
    const [filterName, setFilterName] = React.useState("");
    const [filterSavedName, setFilterSavedName] = React.useState("");

    const handleFilter = (array, filter, checkbox) => {
        const result = checkbox
            ? array.filter(
                  (movie) =>
                      movie.duration <= moviesAttributes.shortMovieDuration &&
                      (movie.nameRU
                          .toLowerCase()
                          .includes(filter.toLowerCase()) ||
                          movie.nameEN
                              .toLowerCase()
                              .includes(filter.toLowerCase()))
              )
            : array.filter(
                  (movie) =>
                      movie.nameRU
                          .toLowerCase()
                          .includes(filter.toLowerCase()) ||
                      movie.nameEN
                          .toLowerCase()
                          .includes(filter.toLowerCase())
              );
        return result;
    };


    React.useEffect(() => {
        setFilteredMovies(handleFilter(initialMovies, filterName, isCheckboxOn));
    }, [initialMovies, filterName, isCheckboxOn]);

    React.useEffect(() => {
        console.log(filteredSavedMovies)
        setFilteredSavedMovies(handleFilter(savedMovies, filterSavedName, isSavedCheckboxOn));
        console.log(filteredSavedMovies)
    }, [savedMovies, filterSavedName, isSavedCheckboxOn]);

    return {
        initialMovies,
        savedMovies,
        filteredMovies,
        filterName,
        filterSavedName,
        isCheckboxOn,
        isSavedCheckboxOn,
        setInitialMovies,
        setSavedMovies,
        setIsCheckboxOn,
        setIsSavedCheckboxOn,
        setFilterName,
        setFilterSavedName,
        handleFilter,
        filteredSavedMovies,
        setFilteredMovies,
        setFilteredSavedMovies,
    };
}
