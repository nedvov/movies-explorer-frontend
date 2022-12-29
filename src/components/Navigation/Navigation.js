import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
    
    const [isBurgerOpened, setIsBurgerOpened] = React.useState(false);

    function clickBurger() {
        setIsBurgerOpened((isBurgerOpened) => (!isBurgerOpened));
    }

    function closeBurger() {
        setIsBurgerOpened(false);
    }

    return (
    <>
        <div className={isBurgerOpened ? "navigation navigation_opened" : "navigation"}>
                <nav className="navigation__links">
                    <NavLink to="/" className="navigation__link navigation__link_hidden">Главная</NavLink>
                    <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active" onClick={closeBurger}>Фильмы</NavLink>                    
                    <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active" onClick={closeBurger}>Сохраненные фильмы</NavLink>
                </nav>              
                <NavLink to="/profile" className="navigation__account" activeClassName="navigation__account_active" onClick={closeBurger}>
                    <p className="navigation__account-text">Аккаунт</p>
                    <div className="navigation__account-image"></div>
                </NavLink>            
        </div>
        <button type="button" className={isBurgerOpened ? "navigation__burger navigation__burger_opened" : "navigation__burger"} onClick={clickBurger}></button>
    </>
    );
}

export default Navigation;