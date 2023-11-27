import React, {useState} from 'react';

import './NavBar.css';
import Dropdown from "./Dropdown";
import NavButton from "./NavButton";
import NavLink from "./NavLink";


function NavBar({ onClearBoard, isRunning, setIsRunning, board, canvasRef, start, end, setMessage, setShowPopup, squareSize }) {
    const [selectedSpeed, setSelectedSpeed] = useState({ id: '50', label: 'Medium' });
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);

    const speedItems = [
        {id: '10', label: 'Fast'},
        {id: '50', label: 'Medium'},
        {id: '250', label: 'Slow'}
    ]

    const algorithmItems = [
        { id: 'dfs', label: 'DFS Algorithm' },
        { id: 'bfs', label: 'BFS Algorithm' },
        { id: 'dijkstras', label: "Dijkstra's Algorithm" },
        { id: 'a_star', label: "A* Algorithm" },
        { id: 'greedy_bfs', label: "Greedy BFS Algorithm" }
    ];

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavLink id="pathfinder-logo" label="Pathfinder" isLogo={true} />
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
                        <NavButton
                            canvasRef={canvasRef}
                            isRunning={isRunning}
                            setIsRunning={setIsRunning}
                            board={board}
                            algorithm={selectedAlgorithm?.id}
                            start={start}
                            end={end}
                            speed={selectedSpeed?.id}
                            setMessage={setMessage}
                            setShowPopup={setShowPopup}
                            squareSize={squareSize}
                        />
                        <NavLink id="clear-board" label="Clear Board" onClick={onClearBoard} isRunning={isRunning}/>
                        <NavLink id="about-project" label="About Project" />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;