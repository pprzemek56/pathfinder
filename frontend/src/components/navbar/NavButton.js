import {visualize, visualize_with_debug} from "../../utils/api";
import {animateShortestPath, animateVisited} from "../board/animations";
import "./NavButton.css"
import {clearPath} from "../board/Board";
import {useEffect} from "react";
function NavButton({ id, isRunning, setIsRunning, board, algorithm, canvasRef, start, end, speed, setMessage, setShowPopup, squareSize }) {

    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8000/ws/visualize/');

        websocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            handleDebugMessage(data);
        };

        return () => {
            websocket.close();
        };
    }, []);

    const handleDebugMessage = (data) => {
        const messageData = JSON.parse(data.message);

        switch(messageData.event) {
            case 'algorithm_initialization':
                console.log(messageData.detail);
                break;
            case 'node_visitation':
                console.log(messageData.detail);
                break;
            case 'path_discovery':
                console.log(messageData.detail);
                break;
            case 'neighbor_evaluation':
                console.log(messageData.detail);
                break;
            case 'algorithm_completion':
                console.log(messageData.detail);
                break;
            default:
                break;
        }
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
                if (speed.id === "debug") {
                    visualize_with_debug(data).then();
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
