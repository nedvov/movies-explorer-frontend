import React from "react";
import { useHistory } from "react-router-dom";

function Page404() {
    const history = useHistory();

    function handleClick() {
        history.goBack();        
    };
    
    return (
        <div className="page404__container">
            <p className="page404__title">404</p>
            <p className="page404__text">Страница не найдена</p>   
            <button
                type="button"
                className="page404__button"
                onClick={handleClick}
            >
            Назад
            </button>


        </div>
    );
}

export default Page404;