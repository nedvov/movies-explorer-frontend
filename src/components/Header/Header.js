import React from "react";
import { Link, useHistory } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({
    type,
    loggedIn,
}) {
    const history = useHistory();

    function handleClick() {
        history.push("/sign-in")
    };
    
    return (
        <header className={type ? `header header_${type}` : "header"}>
            <Link className={type === "form" ? `header__logo header__logo_form` : "header__logo"} to="/"/>
            {type !== "form" && (
                loggedIn 
                ?
                <Navigation />
                :
                <div className="header__navigation">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                    <button
                        type="button"
                        className="header__button"
                        onClick={handleClick}
                    >
                    Войти
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
