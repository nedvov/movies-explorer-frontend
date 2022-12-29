import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Sign from "../Sign/Sign";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import Page404 from "../Page404/Page404";
import { films } from "../../consts/movies";
import { films2 } from "../../consts/movies2";

function App() {
    const [isRenderLoading, setIsRenderLoading] = React.useState(false);
    const [movies, setMovies] = React.useState(films);
    const [savedMovies, setSavedMovies] = React.useState(films2);
    const [isCheckboxOn, setIsCheckboxOn] = React.useState(false);
    const [isSavedCheckboxOn, setIsSavedCheckboxOn] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({
        name: "",
        email: "",
    });
    const history = useHistory();

    const handleSignIn = (password, email) => {
        setIsRenderLoading(!isRenderLoading);
    };

    const handleSignUp = (password, email, name) => {
        setIsRenderLoading(!isRenderLoading);
    };

    const handleUpdate = (email, name) => {
        setIsRenderLoading(!isRenderLoading);
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setCurrentUser({name: "", email: ""});
        localStorage.removeItem("token");
        history.push("sign-in");
    };

    function handleCheckbox(e) {
        e.preventDefault();        
        if (!isCheckboxOn) {
            setIsCheckboxOn(true)
            setMovies(movies.filter(movie => movie.duration <= 40))
        }
        else {
            setIsCheckboxOn(false)
            setMovies(films)
        }       
    }

    function handleSavedCheckbox(e) {
        e.preventDefault();        
        if (!isSavedCheckboxOn) {
            setIsSavedCheckboxOn(true)
            setSavedMovies(savedMovies.filter(movie => movie.duration <= 40))
        }
        else {
            setIsSavedCheckboxOn(false)
            setSavedMovies(films2)
        }       
    }

    return (        
            <Switch>
                <Route exact path="/" >
                    <Header type={"landing"}/>
                    <Main />
                    <Footer />
                </Route>
                <Route path="/movies" >
                    <Header />
                    <Navigation />
                    <SearchForm isCheckboxOn={isCheckboxOn} handleCheckbox={handleCheckbox} />
                    {
                        isRenderLoading 
                        ? <Preloader />
                        :<MoviesCardList movies={movies}/>
                    }
                    <Footer />
                </Route>
                <Route path="/saved-movies" >
                    <Header />
                    <Navigation />
                    <SearchForm isCheckboxOn={isSavedCheckboxOn} handleCheckbox={handleSavedCheckbox}/>
                    {
                        isRenderLoading 
                        ? <Preloader />
                        : <MoviesCardList movies={savedMovies} type="saved"/>
                    }
                    <Footer />
                </Route>
                <Route path="/profile" >
                    <Header />
                    <Navigation />
                    <Profile 
                        onButtonClick={handleSignOut} 
                        onSubmit={handleUpdate}
                        buttonText={
                            isRenderLoading 
                            ? "Сохранение..." 
                            : "Сохранить"
                        }/>
                </Route>
                <Route path="/sign-in" >
                    <Header type={"form"}/>
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
                    <Header type={"form"}/>
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
                <Route path="*">
                    <Page404 />
                </Route>
            </Switch>
    );
}

export default App;
