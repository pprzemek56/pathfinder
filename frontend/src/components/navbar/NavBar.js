import React from 'react';

import './NavBar.css';
import Dropdown from "./Dropdown";
import NavButton from "./NavButton";
import NavLink from "./NavLink";
import {generateMazePattern, generateRandomPattern} from "../../utils/example_patterns";
import {speedItems} from "../../pages/HomePage";


function NavBar({ onClearBoard, isRunning, setIsRunning, board, setBoard, canvasRef, start, end, setMessage, setShowPopup, squareSize, selectedAlgorithm, setSelectedAlgorithm, selectedPattern, setSelectedPattern, selectedSpeed, setSelectedSpeed, setCurrentMessage }) {

    const patternItems = [
        {id: 'random', label: 'Random Pattern'},
        {id: 'maze', label: 'Maze Pattern'},
    ]

    const algorithmItems = [
        { id: 'dfs', label: 'DFS Algorithm' },
        { id: 'bfs', label: 'BFS Algorithm' },
        { id: 'dijkstras', label: "Dijkstra's Algorithm" },
        { id: 'a_star', label: "A* Algorithm" },
        { id: 'greedy_bfs', label: "Greedy BFS Algorithm" },
    ];

    const handleSelectPattern = (item) => {
        if (isRunning) return;

        let newBoard;
        switch (item.id) {
            case 'random':
                newBoard = generateRandomPattern(board);
                break;
            case 'maze':
                newBoard = generateMazePattern(board);
                break;
            default:
                return;
        }

        setSelectedPattern(item);
        setBoard(newBoard);
    };

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
                            setCurrentMessage={setCurrentMessage}
                        />
                        <NavLink id="clear-board" label="Clear Board" onClick={onClearBoard} isRunning={isRunning}/>
                        <Dropdown
                            id="patterns"
                            label="Example Patterns"
                            items={patternItems}
                            selectedItem={selectedPattern}
                            onSelectItem={item => handleSelectPattern(item)}
                        />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;