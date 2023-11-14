import {visualize} from "../../utils/api";
import {animateShortestPath, animateVisited} from "../board/animations";
import "./NavButton.css"
import {clearPath} from "../board/Board";
function NavButton({ id, isRunning, setIsRunning, board, algorithm, canvasRef, start, end, speed, setMessage, setShowPopup, squareSize }) {
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
                const result = await visualize(data);
                const { visited, shortest_path } = result;

                clearPath(ctx, board, squareSize);
                const totalVisitedAnimationDuration = visited.length * animationSpeed;
                const totalShortestPathAnimationDuration = shortest_path.length * animationSpeed;
                setIsRunning(true);
                animateVisited(visited, ctx, start, end, animationSpeed,squareSize);

                setTimeout(() => {
                    animateShortestPath(shortest_path, ctx, start, end, animationSpeed, squareSize);

                    setTimeout(() => {
                        setIsRunning(false);
                    }, totalShortestPathAnimationDuration);
                }, totalVisitedAnimationDuration);

            } catch (error) {
                console.log("ERROR");
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
