import {HORIZONTAL_SQUARES, VERTICAL_SQUARES} from "../pages/HomePage";

export function generateRandomPattern(board) {
    return board.map(row =>
        row.map(cell => ({
            ...cell,
            type: Math.random() < 0.3 && cell.type === 0 ? 1 : cell.type
        }))
    );
}

export function generateMazePattern(board) {
    // Initialize all cells to walls except start and end
    let maze = board.map((row, y) => row.map((cell, x) => ({
        ...cell,
        type: (cell.type === 2 || cell.type === 3) ? cell.type : 1
    })));

    // Define start point for maze generation (could be random or fixed)
    let startX = Math.floor(Math.random() * HORIZONTAL_SQUARES);
    let startY = Math.floor(Math.random() * VERTICAL_SQUARES);
    if (maze[startY][startX].type !== 2 && maze[startY][startX].type !== 3) {
        maze[startY][startX].type = 0; // Set to empty to start carving the maze
    }

    // Implementation of Prim's algorithm goes here
    // Note: This is a placeholder for the actual maze generation logic

    return maze;
}