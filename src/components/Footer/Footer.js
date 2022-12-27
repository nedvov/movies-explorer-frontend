import React from "react";

function Footer() {    

    return (
        <div className="footer">
            <p className="footer__tittle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
                <p className="footer__year">&copy; {new Date().getFullYear()}</p>
                <div className="footer__links">
                    <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    <a className="footer__link" href="https://github.com/">Github</a>
                </div>
            </div>
        </div>
    );
}

export default Footer;