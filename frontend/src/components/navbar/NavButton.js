import {visualize} from "../../utils/api";

function NavButton({ id, isRunning, onToggleRunning, board }) {
    const onButtonClick = async () => {
        onToggleRunning();

        if (!isRunning) {
            const data = {
                board: board,
            };

            try {
                const result = await visualize(data);
                const { visited, shortest_path } = result;

                console.log("VISITED: " + visited);
                console.log("SHORTEST PATH: " + shortest_path);

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
