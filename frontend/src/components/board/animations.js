import {a_square, drawRectangle, drawEnd, drawStart} from "./Board";

export const animateVisited = (visited, start, end, ctx) => {
    const visitedSquares = visited.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;
    let timeouts = [];

    visitedSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05e1f5");

            if (square.x === start.x && square.y === start.y) {
                drawStart(ctx, square.x, square.y, a_square);
            } else if (square.x === end.x && square.y === end.y) {
                drawEnd(ctx, square.x, square.y, a_square);
            }

        }, delay);
        timeouts.push(timeout);
        delay += animationSpeed;
    });
    return timeouts;
};

export const animateShortestPath = (shortestPath, start, end, ctx) => {
    const pathSquares = shortestPath.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;
    const shortestPathTimeouts = [];

    pathSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05fa46");

            if (square.x === start.x && square.y === start.y) {
                drawStart(ctx, square.x, square.y, a_square);
            } else if (square.x === end.x && square.y === end.y) {
                drawEnd(ctx, square.x, square.y, a_square);
            }

        }, delay);
        shortestPathTimeouts.push(timeout);
        delay += animationSpeed;
    });
    return shortestPathTimeouts;
};