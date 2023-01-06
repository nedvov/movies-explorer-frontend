import React from "react";

function StatusText({ text }) {    

    return (
        <div className="status">
            <span className="status__text">{text}</span>
        </div>        
    );
}

export default StatusText;
