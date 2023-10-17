import React, { useState } from 'react';

function NavButton({ id, isRunning, onToggleRunning }) {
    const onButtonClick = () => {
        onToggleRunning();
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
                {isRunning ? "Stop Visualization" : "Start Visualization"}
            </button>
        </li>
    );
}

export default NavButton;
