import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { techs } from "../../consts/texts" 

function Techs() {    

    return (
        <section className="techs">
            <SectionTitle title="Технологии" id="techs"/>
            <p className="techs__tittle">{techs.title}</p>
            <p className="techs__text">{techs.description}</p>
            <ul className="techs__items">
                {techs.items.map((tech, i) => 
                    <li key={i} className="techs__item">{tech}</li>               
                )}
            </ul>   
        </section>
    );
}

export default Techs;