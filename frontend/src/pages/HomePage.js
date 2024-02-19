import React, {useEffect, useRef, useState} from 'react';

import './HomePage.css'
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Popup from "../components/popup/Popup";
import Board from "../components/board/Board";
import { UseDynamicSquareSize } from "../components/board/UseDynamicSquareSize";
import AlgorithmPseudocode from "../components/pseudocode/AlgorithmPseudocode";

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
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [currentNodes, setCurrentNodes] = useState([]);
    const [pseudocode, setPseudocode] = useState('');

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleClearBoard = () => {
        if (isRunning) return;

        const newBoard = initBoard(start, end);
        setBoard(newBoard);
        setSelectedPattern(null);
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
        let array = Array.from({ length: VERTICAL_SQUARES }, () =>
            Array.from({ length: HORIZONTAL_SQUARES }, () => ({ type: 0, weight: 1 }))
        );

        array[start.y][start.x] = { type: 2, weight: 1 };
        array[end.y][end.x] = { type: 3, weight: 1 };

        return array;
    }

    useEffect(() => {
      const websocket = new WebSocket('ws://localhost:8000/ws/visualize/');

      websocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        // Assuming 'message' contains the event type and details
        const message = JSON.parse(data.message);
        switch (message.event) {
          case 'Node Visitation':
          case 'Neighbor Evaluation':
          case 'Path Discovery':
            // Handle node updates for visualization
            // Possibly update a state that tracks the current nodes being processed
            break;
          case 'Algorithm Initialization':
          case 'Algorithm Completion':
            // Handle algorithm start/end messages
            // Update pseudocode or display completion message
            break;
          default:
            console.log('Unhandled message type:', message.event);
        }
      };

      return () => {
        websocket.close();
      };
    }, []);

    return (
        <div className='homePage'>
            <NavBar
                canvasRef={canvasRef}
                onClearBoard={handleClearBoard}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                board={board}
                setBoard={setBoard}
                start={start}
                end={end}
                setMessage={setMessage}
                setShowPopup={setShowPopup}
                squareSize={dynamicSquareSize}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                selectedPattern={selectedPattern}
                setSelectedPattern={setSelectedPattern}
            />
            <div className="homePage-content">
                <div className="homePage-conatainer">
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
                        currentNodes={currentNodes}
                        pseudocode={pseudocode}
                    />
                    {isRunning &&
                      <AlgorithmPseudocode
                          algorithm={selectedAlgorithm}
                          pseudocode={pseudocode}
                      />
                    }
                </div>
            </div>
            <Footer />
            {showPopup && <Popup message={message} onClose={handleClosePopup} />}
        </div>
    );
}

export default HomePage;