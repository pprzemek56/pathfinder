import React, { useState } from 'react';

function NavButton({ id, label }) {
    const [isRunning, setIsRunning] = useState(false);

    const onButtonClick = () => {
        setIsRunning(!isRunning);
        if (!isRunning) {
            console.log("Starting the visualization algorithm...");
        } else {
            console.log("Stopping the visualization algorithm...");
        }
    };

    return (
        <li className="nav-item">
            <button 
                type="button" 
                className={`btn btn-lg ${isRunning ? "btn-danger" : "btn-primary"}`} 
                id={id}
                onClick={onButtonClick}
            >
                {label}
            </button>
        </li>
    );
}

export default NavButton;
