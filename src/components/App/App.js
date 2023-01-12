import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Sign from "../Sign/Sign";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import Popup from "../Popup/Popup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useMoviesFilter } from "../../hooks/useMoviesFilter";

function App() {
    const [isRenderLoading, setIsRenderLoading] = React.useState(false);
    const { 
            setInitialMovies, 
            savedMovies, 
            setSavedMovies, 
            filteredMovies, 
            isCheckboxOn, 
            setIsCheckboxOn,
            isSavedCheckboxOn,
            setIsSavedCheckboxOn,
            setFilterName,
            filterName,
            setFilterSavedName,
            filterSavedName,
            filteredSavedMovies,
            setFilteredMovies,
            setFilteredSavedMovies,
        } = useMoviesFilter();
    const [savedMoviesIds, setSavedMoviesIds] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        email: "",
    });
    const [initialMoviesStatusText, setInitialMoviesStatusText] = React.useState("Вы еще не искали фильмы");
    const [savedMoviesStatusText, setSavedMoviesStatusText] = React.useState("У Вас еще нет сохраненных фильмов");
    const [initialPath, setInitialPath] = React.useState("/");
    const [isOnEdit, setIsOnEdit] = React.useState(false);
    const [errorProfileText, setErrorProfileText] = React.useState("");
    const [errorProfileStatus, setErrorProfileStatus] = React.useState(false);
    const [errorSignText, setErrorSignText] = React.useState("");
    const [errorSignStatus, setErrorSignStatus] = React.useState(false);
    const [errorInitialMoviesStatus, setErrorInitialMoviesStatus] = React.useState(false);
    const [errorSavedMoviesStatus, setErrorSavedMoviesStatus] = React.useState(false);
    const [errorInitialMoviesText, setErrorInitialMoviesText] = React.useState("");
    const [errorSavedMoviesText, setErrorSavedMoviesText] = React.useState("");
    const history = useHistory();

    const handleSignIn = (password, email) => {
        setIsRenderLoading(true);
        mainApi
            .signIn(password, email)
            .then((data) => {
                setErrorSignStatus(false);
                setErrorSignText("Вход успешно выполнен")
                localStorage.setItem("token", data.token);                
                setIsLoggedIn(true);
                history.push("/movies");
            })
            .catch((err) => {
                console.log(err);
                setErrorSignStatus(true);
                setErrorSignText(err);
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignUp = (password, email, name) => {
        setIsRenderLoading(true);
        mainApi
            .signUp(password, email, name)
            .then(() => {
                setErrorSignStatus(false);
                setErrorSignText("Регистрация успешно завершена")
            })
            .then(() => {
                handleSignIn(password, email);
            })
            .catch((err) => {
                console.log(err);
                setErrorSignStatus(true);
                setErrorSignText(err);
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setCurrentUser({name: "", email: ""});
        setInitialMovies([]);
        setSavedMovies([]);
        setSavedMoviesIds([]);
        setIsOnEdit(false);
        localStorage.removeItem("token");
        setFilteredMovies([]);
        setFilteredSavedMovies([]);
        setIsCheckboxOn(false);
        setIsSavedCheckboxOn(false);
        setFilterName("");
        setFilterSavedName("");
        localStorage.removeItem("token");
        localStorage.removeItem("movies");
        localStorage.removeItem("filter");
        localStorage.removeItem("isShortMovie");
        history.push("/");
    };

    function handleCheckbox(e) {
        e.preventDefault();  
        setIsCheckboxOn(!isCheckboxOn);
        localStorage.setItem("isShortMovie", !isCheckboxOn);
    }

    function handleSavedCheckbox(e) {
        e.preventDefault();  
        setIsSavedCheckboxOn(!isSavedCheckboxOn);
    }

    const handleSignCheck = () => {
        mainApi
            .getUserInfo(localStorage.getItem("token"))
            .then(() => {
                setIsLoggedIn(true);
                history.push(initialPath);
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
                history.push("/sign-in");
            });
    };

    const handleEdit = () => {
        setIsOnEdit(true);
    }

    const handleStopEdit = () => {
        setIsOnEdit(false);
    }

    const handleClosePopups = () => {
        setErrorSavedMoviesStatus(false);
        setErrorInitialMoviesStatus(false);
    }

    const handleUpdateUser = (email, name) => {
        setIsRenderLoading(true);
        mainApi.setUserInfo(email, name, localStorage.getItem("token"))
            .then((values) => {
                setCurrentUser(values);
                setIsOnEdit(false);
                setErrorProfileStatus(false);
                setErrorProfileText("Обновление данных успешно выполнено");
            })
            .catch((err) => {
                setErrorProfileStatus(true);
                setErrorProfileText(err);
                console.log(err)
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleGetMovies = () => {
        setIsRenderLoading(true);
        moviesApi.getMovies()
        .then((values) => {
            setInitialMovies(values);
            localStorage.setItem("movies", JSON.stringify(values));
        })
        .catch((err) => {
            setErrorInitialMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз...");
            setErrorInitialMoviesStatus(true);
            console.log(err)
        })
        .finally(() => setIsRenderLoading(false));     
    }

    const handleFilterMovies = (filter) => {
        !localStorage.getItem("movies") && handleGetMovies();
        localStorage.setItem("filter", filter);
        setFilterName(filter);
    }

    const handleFilterSavedMovies = (filter) => {
        savedMovies.length === 0 && handleGetSavedMovies();
        setFilterSavedName(filter);
    }

    const handleSaveMovie = (movie) => {
        mainApi.saveMovie(movie, localStorage.getItem("token"))
            .then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
                setSavedMoviesIds([newMovie.movieId, ...savedMoviesIds]);
            })
            .catch((err) => {
                setErrorInitialMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз...");
                setErrorInitialMoviesStatus(true);
                console.log(err)
            })
    }

    const handleDeleteMovie = (movieId, type) => {
        type === "saved" && setIsRenderLoading(true);
        let id = type === "saved" ? movieId : savedMovies.find(movie => movie.movieId === movieId)._id;    
        mainApi.deleteMovie(id, localStorage.getItem("token"))
            .then((movieToDelete) => {
                setSavedMovies(savedMovies.filter(movie => movie._id !== movieToDelete._id));
                setSavedMoviesIds(savedMoviesIds.filter(id => id !== movieToDelete.movieId));
            })
            .catch((err) => {
                console.log(err)
                if (type === "saved") {
                    setErrorSavedMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз...");
                    setErrorSavedMoviesStatus(true);
                }
                else {
                    setErrorInitialMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз..."); 
                    setErrorInitialMoviesStatus(true);
                }
            })
            .finally(() => setIsRenderLoading(false));
    }

    const handleGetSavedMovies = () => {
        setIsRenderLoading(true);
        mainApi.getMovies(localStorage.getItem("token"))
            .then((values) => {
                setSavedMovies(values);
                values.length === 0 
                    ? setSavedMoviesStatusText("У Вас еще нет сохраненных фильмов")
                    : setSavedMoviesIds(values.map((movie) => movie.movieId));
            })
            .catch((err) => {
                setErrorSavedMoviesText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз...");
                setErrorSavedMoviesStatus(true);
                console.log(err)
            })
            .finally(() => setIsRenderLoading(false));     
    }

    const handleGetCurrentUser = () => {
        mainApi.getUserInfo(localStorage.getItem("token"))
            .then((values) => {
                setCurrentUser(values);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    React.useEffect(() => {
        isLoggedIn && handleGetCurrentUser()
    }, [isLoggedIn]);

    React.useEffect(() => {
        localStorage.getItem("token") &&
            handleSignCheck();
    }, [initialPath]);

    React.useEffect(() => {
        if (isLoggedIn) {
            localStorage.getItem("movies") && setInitialMovies(JSON.parse(localStorage.getItem("movies")));
            localStorage.getItem("filter") && setFilterName(localStorage.getItem("filter"));
            localStorage.getItem("isShortMovie") && setIsCheckboxOn(localStorage.getItem("isShortMovie") === "true");
            setFilterSavedName("");
            setIsSavedCheckboxOn("");
            handleGetSavedMovies();
        }
    }, [isLoggedIn]);

    return (     
        <CurrentUserContext.Provider value={currentUser}> 
            <Switch>
                <Route exact path="/" >
                    <Header loggedIn={isLoggedIn} type="landing"/>
                    <Main />
                    <Footer />
                </Route>
                <ProtectedRoute path="/movies" loggedIn={isLoggedIn} setInitialPath={setInitialPath}>
                    <Header loggedIn={isLoggedIn}/>
                    <SearchForm isCheckboxOn={isCheckboxOn} handleCheckbox={handleCheckbox} onSubmit={handleFilterMovies} filter={filterName}/>
                    <Popup text={errorInitialMoviesText} isOpened={errorInitialMoviesStatus} onClose={handleClosePopups}/>
                    {
                        isRenderLoading 
                        ? <Preloader />
                        :<MoviesCardList movies={filteredMovies} onSave={handleSaveMovie} onDelete={handleDeleteMovie} text={initialMoviesStatusText} savedMoviesIds={savedMoviesIds} type="initial"/>
                    }
                    <Footer />
                </ProtectedRoute>
                <ProtectedRoute path="/saved-movies" loggedIn={isLoggedIn} setInitialPath={setInitialPath}>
                    <Header loggedIn={isLoggedIn}/>
                    <SearchForm isCheckboxOn={isSavedCheckboxOn} handleCheckbox={handleSavedCheckbox} onSubmit={handleFilterSavedMovies} type="saved" filter={filterSavedName} />
                    <Popup text={errorSavedMoviesText} isOpened={errorSavedMoviesStatus} onClose={handleClosePopups}/>
                    {
                        isRenderLoading 
                        ? <Preloader />
                        : <MoviesCardList movies={filteredSavedMovies} onDelete={handleDeleteMovie} text={savedMoviesStatusText} type="saved"/>
                    }
                    <Footer />
                </ProtectedRoute>
                <ProtectedRoute path="/profile" loggedIn={isLoggedIn} setInitialPath={setInitialPath}>
                    <Header loggedIn={isLoggedIn}/>
                    <Profile 
                        onButtonClick={handleSignOut} 
                        onSubmit={handleUpdateUser}
                        buttonText={
                            isRenderLoading 
                            ? "Сохранение..." 
                            : "Сохранить"
                        }
                        isOnEdit={isOnEdit}
                        handleEdit={handleEdit}
                        handleStopEdit={handleStopEdit}
                        errorText={errorProfileText}
                        setErrorText={setErrorProfileText}
                        errorStatus={errorProfileStatus}
                        setErrorStatus={setErrorProfileStatus}
                        isRenderLoading={isRenderLoading}                 
                        />
                </ProtectedRoute>
                <Route path="/sign-in" >
                    <Header loggedIn={isLoggedIn} type={"form"}/>
                    <Sign
                        name="in"
                        title="Рады видеть!"
                        onSubmit={handleSignIn}
                        buttonText={
                            isRenderLoading 
                            ? "Вход..." 
                            : "Войти"
                        }
                        linkDescription="Ещё не зарегистрированы?"
                        linkText="Регистрация"
                        link="/sign-up"
                        errorText={errorSignText}
                        errorStatus={errorSignStatus}
                        setErrorSignText={setErrorSignText}
                        setErrorSignStatus={setErrorSignStatus}
                        isRenderLoading={isRenderLoading}
                    />
                </Route>
                <Route path="/sign-up" >
                    <Header loggedIn={isLoggedIn} type={"form"}/>
                    <Sign
                        name="up"
                        title="Добро пожаловать!"
                        onSubmit={handleSignUp}
                        buttonText={
                            isRenderLoading
                                ? "Регистрация..."
                                : "Зарегистрироваться"
                        }
                        linkDescription="Уже зарегистрированы?"
                        linkText="Войти"
                        link="/sign-in"
                        errorText={errorSignText}
                        errorStatus={errorSignStatus}
                        setErrorSignText={setErrorSignText}
                        setErrorSignStatus={setErrorSignStatus}
                        isRenderLoading={isRenderLoading}
                    />
                </Route>        
                <ProtectedRoute path="*" loggedIn={isLoggedIn} setInitialPath={setInitialPath}>
                    <Page404 />
                </ProtectedRoute>
            </Switch>
        </CurrentUserContext.Provider>
    );
}

export default App;
