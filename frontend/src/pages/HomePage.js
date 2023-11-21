import React, {useRef, useState} from 'react';

import './HomePage.css'
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Popup from "../components/popup/Popup";
import Board from "../components/board/Board";
import { UseDynamicSquareSize } from "../components/board/UseDynamicSquareSize";

export const HORIZONTAL_SQUARES = 53;
export const VERTICAL_SQUARES = 21;

function HomePage() {
    const [start, setStart] = useState({ x: 10, y: 10 });
    const [end, setEnd] = useState({ x: 41, y: 10 });
    const [board, setBoard] = useState(initBoard(start, end));
    const [isRunning, setIsRunning] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const canvasRef = useRef(null);
    const dynamicSquareSize = UseDynamicSquareSize();

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

    function initBoard(start, end) {
        let array = Array.from({ length: VERTICAL_SQUARES }, () => Array(HORIZONTAL_SQUARES).fill(0));
        array[start.y][start.x] = 2;
        array[end.y][end.x] = 3;
        return array;
    }

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
                squareSize={dynamicSquareSize}
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
                        squareSize={dynamicSquareSize}
                    />
                </div>
            </div>
            <Footer />
            {showPopup && <Popup message={message} onClose={handleClosePopup} />}
        </div>
    );
}

export default HomePage;