import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import { aboutMe } from "../../consts/texts"
import avatar from "../../images/avatar.jpeg"

function AboutMe() {    

    return (
        <section className="about-me">
            <SectionTitle title="Студент" id="student"/>
            <div className="about-me__block">
                <div className="about-me__text">
                    <p className="about-me__name">{aboutMe.name}</p>
                    <p className="about-me__info">{aboutMe.info}</p>
                    <p className="about-me__description">{aboutMe.description}</p>
                    <p className="about-me__sign">{aboutMe.sign}</p>
                </div>
                <img className="about-me__photo" alt="Фото. Студента практикума" src={avatar} />     
            </div>
        </section>
    );
}

export default AboutMe;