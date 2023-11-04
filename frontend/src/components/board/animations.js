import {a_square, drawRectangle} from "./Board";

export const animateVisited = (visited, ctx) => {
    const visitedSquares = visited.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;
    let timeouts = [];

    visitedSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05e1f5");
        }, delay);
        timeouts.push(timeout);
        delay += animationSpeed;
    });
    return timeouts;
};

export const animateShortestPath = (shortestPath, ctx) => {
    const pathSquares = shortestPath.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;
    const shortestPathTimeouts = [];

    pathSquares.forEach(square => {
        const timeout = setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05fa46");
        }, delay);
        shortestPathTimeouts.push(timeout);
        delay += animationSpeed;
    });
    return shortestPathTimeouts;
};