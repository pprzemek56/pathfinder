import {drawEnd, drawRectangle, drawStart} from "./Board";

export const animateVisited = (visited, ctx, start, end, speed, squareSize) => {
    const visitedSquares = visited.map(node => ({x: node.x, y: node.y}));
    let delay = 0;
    let timeouts = [];

    visitedSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, squareSize, "#05e1f5");

            if (start.x === square.x && start.y === square.y) {
                drawStart(ctx, square.x, square.y, squareSize);
            } else if (end.x === square.x && end.y === square.y) {
                drawEnd(ctx, square.x, square.y, squareSize);
            }
        }, delay);
        timeouts.push(timeout);
        delay += speed;
    });
    return timeouts;
};

export const animateShortestPath = (shortestPath, ctx, start, end, speed, squareSize) => {
    const pathSquares = shortestPath.map(node => ({x: node.x, y: node.y}));
    let delay = 0;
    const shortestPathTimeouts = [];

    pathSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, squareSize, "#05fa46");

            if (start.x === square.x && start.y === square.y) {
                drawStart(ctx, square.x, square.y, squareSize);
            } else if (end.x === square.x && end.y === square.y) {
                drawEnd(ctx, square.x, square.y, squareSize);
            }
        }, delay);
        shortestPathTimeouts.push(timeout);
        delay += speed;
    });
    return shortestPathTimeouts;
};