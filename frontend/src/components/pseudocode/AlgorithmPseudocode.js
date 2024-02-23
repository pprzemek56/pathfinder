import React from 'react';
import './AlgorithmPseudocode.css';
function AlgorithmPseudocode({ currentMessage, selectedSpeed }) {

    if (selectedSpeed.id !== "debug") {
        return null;
    }

    return (
        <div className="algorithm-pseudocode">
            <pre>{currentMessage}</pre>
        </div>
    );
}

export default AlgorithmPseudocode;
