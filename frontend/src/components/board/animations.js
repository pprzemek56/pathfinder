import {a_square, drawRectangle} from "./Board";

export const animateVisited = (visited, ctx) => {
    const visitedSquares = visited.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;  // Adjust this value to change the speed of the animation

    visitedSquares.forEach(square => {
        setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05e1f5");
        }, delay);
        delay += animationSpeed;
    });
};

export const animateShortestPath = (shortestPath, ctx) => {
    const pathSquares = shortestPath.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;  // Adjust this value to change the speed of the animation

    pathSquares.forEach(square => {
        setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05fa46");
        }, delay);
        delay += animationSpeed;
    });
};