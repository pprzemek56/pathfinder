import React, {useRef, useState} from 'react';

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Board, { initBoard } from "../components/board/Board";
import './HomePage.css'
import Popup from "../components/popup/Popup";

function HomePage() {
    const [start, setStart] = useState({ x: 10, y: 10 });
    const [end, setEnd] = useState({ x: 41, y: 10 });
    const [board, setBoard] = useState(initBoard(start, end));
    const [isRunning, setIsRunning] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const canvasRef = useRef(null);

    const handleShowPopup = (message) => {
        setMessage(message);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleClearBoard = () => {
        if (isRunning) return;

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
            <NavBar
                canvasRef={canvasRef}
                onClearBoard={handleClearBoard}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                board={board}
                start={start}
                end={end}
                setMessage={setMessage}
                setShowPopup={setShowPopup}
            />
            <div className="homePage-content">
                <div className="board">
                    <Board
                        canvasRef={canvasRef}
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
            {showPopup && <Popup message={message} onClose={handleClosePopup} />}
        </div>
    );
}

export default HomePage;