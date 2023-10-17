import React, {useState} from 'react';

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Board, { initBoard } from "../components/board/Board";
import './HomePage.css'

function HomePage() {
    const [start, setStart] = useState({ x: 10, y: 10 });
    const [end, setEnd] = useState({ x: 41, y: 10 });
    const [board, setBoard] = useState(initBoard(start, end));
    const [isRunning, setIsRunning] = useState(false);

    const onToggleRunning = () => {
        setIsRunning(prevState => !prevState);
    };

    const handleClearBoard = () => {
        const newBoard = initBoard(start, end);
        setBoard(newBoard);
    };

    const handleSetBoard = (newBoard) => {
        setBoard(newBoard);
    };

    const handleSetStart = (newStart) => {
        setStart(newStart);
    };

    const handleSetEnd = (newEnd) => {
        setEnd(newEnd);
    };

    return (
        <div className='homePage'>
            <NavBar onClearBoard={handleClearBoard} isRunning={isRunning} onToggleRunning={onToggleRunning} />
            <div className="homePage-content">
                <div className="board">
                    <Board
                        board={board}
                        start={start}
                        end={end}
                        onSetBoard={handleSetBoard}
                        onSetStart={handleSetStart}
                        onSetEnd={handleSetEnd}
                        isRunning={isRunning}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;