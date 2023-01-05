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
            setFilterName,
            filteredSavedMovies,
        } = useMoviesFilter(); 
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        email: "",
    });
    const history = useHistory();

    const handleSignIn = (password, email) => {
        setIsRenderLoading(true);
        mainApi
            .signIn(password, email)
            .then((data) => {
                localStorage.setItem("token", data.token);                
                setIsLoggedIn(true);
                history.push("/movies");
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignUp = (password, email, name) => {
        setIsRenderLoading(true);
        mainApi
            .signUp(password, email, name)
            .then(() => {
                console.log("Успешно")
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setIsRenderLoading(false));
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setCurrentUser({name: "", email: ""});
        localStorage.removeItem("token");
        history.push("sign-in");
    };

    function handleCheckbox(e) {
        e.preventDefault();        
        setIsCheckboxOn(!isCheckboxOn);
    }

    // function handleSavedCheckbox(e) {
    //     e.preventDefault();        
    //     if (!isSavedCheckboxOn) {
    //         setIsSavedCheckboxOn(true)
    //         setSavedMovies(savedMovies.filter(movie => movie.duration <= 40))
    //     }
    //     else {
    //         setIsSavedCheckboxOn(false)
    //         setSavedMovies(films2)
    //     }       
    // }

    const handleSignCheck = () => {
        mainApi
            .getUserInfo(localStorage.getItem("token"))
            .then(() => {
                setIsLoggedIn(true);
                history.push("/movies");
            })
            .catch((err) => {
                console.log(err);
                setIsLoggedIn(false);
                history.push("/sign-in");
            });
    };

    const handleUpdateUser = (email, name) => {
        setIsRenderLoading(true);
        mainApi.setUserInfo(email, name, localStorage.getItem("token"))
            .then((values) => {
                setCurrentUser(values);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    };

    const handleGetMovies = (filter) => {
        setIsRenderLoading(true);
        Promise.all([moviesApi.getMovies(), mainApi.getMovies(localStorage.getItem("token"))])
        .then((values) => {
            const [initialMovies, dbMovies] = values;
            setInitialMovies(initialMovies);
            setSavedMovies(dbMovies);
            setFilterName(filter);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsRenderLoading(false));     
    }

    const handleGetSavedMovies = () => {
        console.log('1')
        setIsRenderLoading(true);
        mainApi.getMovies(localStorage.getItem("token"))
            .then((values) => {
                setSavedMovies(values);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    }

    const handleFilterSavedMovies = (filter) => {
        setFilterName(filter);
    }

    const handleSaveMovie = (movie) => {
        setIsRenderLoading(true);
        mainApi.saveMovie(movie, localStorage.getItem("token"))
            .then((newMovie) => {
                setSavedMovies([newMovie, ...savedMovies]);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    }

    const handleDeleteMovie = (movieId) => {
        setIsRenderLoading(true);
        mainApi.deleteMovie(movieId, localStorage.getItem("token"))
            .then((movieToDelete) => {
                setSavedMovies(savedMovies.filter(movie => movie._id !== movieToDelete._id));
            })
            .catch((err) => console.log(err))
            .finally(() => setIsRenderLoading(false));
    }

    React.useEffect(() => {
        localStorage.getItem("token") &&
            handleSignCheck();
    }, []);

    React.useEffect(() => {
        isLoggedIn &&
            mainApi.getUserInfo(localStorage.getItem("token"))
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => console.log(err));
    }, [isLoggedIn]);

    return (     
        <CurrentUserContext.Provider value={currentUser}> 
            <Switch>
                <Route exact path="/" >
                    <Header loggedIn={isLoggedIn}/>
                    <Main />
                    <Footer />
                </Route>
                <ProtectedRoute path="/movies" loggedIn={isLoggedIn}>
                    <Header loggedIn={isLoggedIn}/>
                    <SearchForm isCheckboxOn={isCheckboxOn} handleCheckbox={handleCheckbox} onSubmit={handleGetMovies}/>
                    {
                        isRenderLoading 
                        ? <Preloader />
                        :<MoviesCardList movies={filteredMovies} onSave={handleSaveMovie} onDelete={handleDeleteMovie} />
                    }
                    <Footer />
                </ProtectedRoute>
                <ProtectedRoute path="/saved-movies" loggedIn={isLoggedIn}>
                    <Header loggedIn={isLoggedIn}/>
                    <SearchForm isCheckboxOn={isCheckboxOn} handleCheckbox={handleCheckbox} onSubmit={handleFilterSavedMovies} type="saved"/>
                    {
                        isRenderLoading 
                        ? <Preloader />
                        : <MoviesCardList movies={filteredSavedMovies} onDelete={handleDeleteMovie}  onRender={handleGetSavedMovies} type="saved"/>
                    }
                    <Footer />
                </ProtectedRoute>
                <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
                    <Header loggedIn={isLoggedIn}/>
                    <Profile 
                        onButtonClick={handleSignOut} 
                        onSubmit={handleUpdateUser}
                        buttonText={
                            isRenderLoading 
                            ? "Сохранение..." 
                            : "Сохранить"
                        }/>
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
                    />
                </Route>        
                <ProtectedRoute path="*">
                    <Page404 />
                </ProtectedRoute>
            </Switch>
        </CurrentUserContext.Provider>
    );
}

export default App;
