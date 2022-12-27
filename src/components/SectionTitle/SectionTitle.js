import React from "react";

function SectionTitle({ title, id }) {    

    return (
        <div className="section-title" id={id}>
            <h2 className="section-title__text">{title}</h2>
        </div>
    );
}

export default SectionTitle;