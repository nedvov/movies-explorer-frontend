import React from "react";
import { portfolio } from "../../consts/texts" 

function Portfolio() {    

    return (
        <div className="portfolio">
            <p className="portfolio__title">Портфолио</p>
            <ul className="portfolio__items">
                {portfolio.map((item) => 
                    <li className="portfolio__item">
                        <a className="portfolio__item-link" href={item.siteUrl}>
                            <p className="portfolio__link-title">{item.siteName}</p>
                            <div className="portfolio__link-icon"></div>
                        </a>
                    </li>                
                )}
            </ul>   
        </div>
    );
}

export default Portfolio;