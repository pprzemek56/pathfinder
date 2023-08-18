import React, {useState} from 'react';

import './NavBar.css';
import Dropdown from "./Dropdown";

function NavBar() {
    const [selectedSpeed, setSelectedSpeed] = useState(null);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    const speedItems = [
        {id: 'fast', label: 'Fast'},
        {id: 'medium', label: 'Medium'},
        {id: 'slow', label: 'Slow'}
    ]

    const algorithmItems = [
        { id: 'dfs', label: 'DFS Search' },
        { id: 'bfs', label: 'BFS Search' }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">Pathfinder</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Dropdown
                            id="speed"
                            label="Speed"
                            items={speedItems}
                            selectedItem={selectedSpeed}
                            onSelectItem={setSelectedSpeed}
                        />
                        <Dropdown
                            id="algorithms"
                            label="Algorithms"
                            items={algorithmItems}
                            selectedItem={selectedAlgorithm}
                            onSelectItem={setSelectedAlgorithm}
                        />
                        <li className="nav-item">
                            <button type="button" className="btn btn-primary btn-lg" id="start_btn">Start
                                Visualization!
                            </button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="clear_board">Clear Board</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">About Project</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;