import {visualize, visualize_with_debug} from "../../utils/api";
import {animateShortestPath, animateSingleNode, animateVisited, highlightNeighborEvaluation} from "../board/animations";
import "./NavButton.css"
import {clearPath} from "../board/Board";
import {useEffect} from "react";
function NavButton({ id, isRunning, setIsRunning, board, algorithm, canvasRef, start, end, speed, setMessage, setShowPopup, squareSize, setCurrentMessage }) {

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8000/ws/visualize/');

        websocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            handleDebugMessage(data).then();
        };

        return () => {
            websocket.close();
        };
    }, [start, end]);

    const handleDebugMessage = async (data) => {
        const ctx = canvasRef.current.getContext('2d');
        const messageData = JSON.parse(data.message);

        setCurrentMessage(messageData.detail);

        switch (messageData.event) {
            case 'node_visitation':
                const visitCoords = extractCoordinates(messageData.detail);
                animateSingleNode({ x: visitCoords.x, y: visitCoords.y }, ctx, squareSize, start, end);
                break;
            case 'neighbor_evaluation':
                const evalCoords = extractCoordinates(messageData.detail);
                highlightNeighborEvaluation({ x: evalCoords.x, y: evalCoords.y }, ctx, squareSize, start, end);
                break;
            default:
                break;
        }
    };

    const extractCoordinates = (detail) => {
        const regex = /at (\d+), (\d+)/;
        const match = detail.match(regex);
        return match ? { x: parseInt(match[1], 10), y: parseInt(match[2], 10) } : null;
    };
    const onButtonClick = async () => {
        const ctx = canvasRef.current.getContext('2d');
        const animationSpeed = parseInt(speed, 10);

        if (!algorithm) {
            setMessage("Please select an algorithm.");
            setShowPopup(true);
            return;
        }

        const data = {
            board: board,
            algorithm: algorithm,
        };

        if (!isRunning) {
            try {
                if (speed === "0") {
                    clearPath(ctx, board, squareSize);
                    setIsRunning(true);
                    const result = await visualize_with_debug(data);
                    const { visited, shortest_path } = result;
                    animateShortestPath(shortest_path, ctx, start, end, 50, squareSize, squareSize / 12);
                    setIsRunning(false);
                } else {
                    const result = await visualize(data);
                    const { visited, shortest_path } = result;

                    clearPath(ctx, board, squareSize);
                    const totalVisitedAnimationDuration = visited.length * animationSpeed;
                    const totalShortestPathAnimationDuration = shortest_path.length * animationSpeed;
                    setIsRunning(true);
                    animateVisited(visited, ctx, start, end, animationSpeed, squareSize, squareSize / 12);

                    setTimeout(() => {
                        animateShortestPath(shortest_path, ctx, start, end, animationSpeed, squareSize, squareSize / 12);

                        setTimeout(() => {
                            setIsRunning(false);
                        }, totalShortestPathAnimationDuration);
                    }, totalVisitedAnimationDuration);
                }

            } catch (error) {
                setMessage("The shortest path doesn't exist.");
                setShowPopup(true);
                setIsRunning(false);
            }
        }
    };

    return (
        <li className="nav-item">
            <button 
                type="button" 
                className={`btn btn-lg btn-fixed-width ${isRunning ? "btn-danger" : "btn-primary"}`}
                id={id}
                onClick={onButtonClick}
            >
                {isRunning ? "Visualizing..." : "Start Visualization"}
            </button>
        </li>
    );
}

export default NavButton;
