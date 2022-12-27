import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {    

    return (
        <section className="about-project">
            <SectionTitle title="О проекте" id="about"/>            
            <div className="about-project__stages">
                <div className="about-project__stage">
                    <p className="about-project__stage-title">Дипломный проект включал 5 этапов</p>
                    <p className="about-project__stage-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__stage">
                    <p className="about-project__stage-title">На выполнение диплома ушло 5 недель</p>
                    <p className="about-project__stage-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>                
            </div>
            <div className="about-project__timetable">
                <p className="about-project__timetable-scale about-project__timetable-scale_active">1 неделя</p>
                <p className="about-project__timetable-scale">4 недели</p>
                <p className="about-project__timetable-agenda">Back-end</p>
                <p className="about-project__timetable-agenda">Front-end</p>
            </div>

        </section>        
    );
}

export default AboutProject;