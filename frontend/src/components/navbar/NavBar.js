import React, {useState} from 'react';

import './NavBar.css';
import Dropdown from "./Dropdown";
import NavButton from "./NavButton";
import NavLink from "./NavLink";

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
                        <NavButton id="start_btn" label="Start Visualization!" />
                        <NavLink id="clear-board" label="Clear Board" />
                        <NavLink id="about-project" label="About Project" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;