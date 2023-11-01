import {visualize} from "../../utils/api";
import {animateShortestPath, animateVisited} from "../board/animations";
import {useState} from "react";

function NavButton({ id, isRunning, setIsRunning, board, algorithm, canvasRef, start, end }) {
    const [timeouts, setTimeouts] = useState([]);
    const onButtonClick = async () => {
        const ctx = canvasRef.current.getContext('2d');

        if (!isRunning) {
            const data = {
                board: board,
                algorithm: algorithm,
            };

            try {
                const result = await visualize(data);
                const { visited, shortest_path } = result;

                const totalVisitedAnimationDuration = visited.length * 50;
                const visitedTimeouts = animateVisited(visited, start, end, ctx);

                const shortestPathDelay = setTimeout(() => {
                    const shortestPathTimeouts = animateShortestPath(shortest_path, start, end, ctx);
                    setTimeouts(prev => [...prev, ...shortestPathTimeouts]);
                }, totalVisitedAnimationDuration);

                setTimeouts([...visitedTimeouts, shortestPathDelay]);
            } catch (error) {
                console.error("Error visualizing the path:", error.message);
            }
        } else {
            timeouts.forEach(timeout => clearTimeout(timeout));
            console.log("Stopping the visualization algorithm...");
        }
    };

    return (
        <li className="nav-item">
            <button 
                type="button" 
                className={`btn btn-lg ${isRunning ? "btn-danger" : "btn-primary"}`} 
                id={id}
                onClick={onButtonClick}
            >
                {isRunning ? "Stop Visualization" : "Start Visualization"}
            </button>
        </li>
    );
}

export default NavButton;
