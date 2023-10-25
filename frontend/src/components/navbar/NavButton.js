import {visualize} from "../../utils/api";
import {animateShortestPath, animateVisited} from "../board/animations";

function NavButton({ id, isRunning, onToggleRunning, board, algorithm, canvasRef }) {
    const onButtonClick = async () => {
        const ctx = canvasRef.current.getContext('2d');
        onToggleRunning();

        if (!isRunning) {
            const data = {
                board: board,
                algorithm: algorithm,
            };

            try {
                const result = await visualize(data);
                console.log(result);
                const { visited, shortest_path } = result;

                const totalVisitedAnimationDuration = visited.length * 50;

                animateVisited(visited, ctx);

                setTimeout(() => {
                    animateShortestPath(shortest_path, ctx);
                }, totalVisitedAnimationDuration);

            } catch (error) {
                console.error("Error visualizing the path:", error.message);
            }
        } else {
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
