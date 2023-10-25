import {a_square, drawRectangle, drawEnd, drawStart} from "./Board";

export const animateVisited = (visited, start, end, ctx) => {
    const visitedSquares = visited.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;  // Adjust this value to change the speed of the animation

    visitedSquares.forEach(square => {
        setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05e1f5");

            if (square.x === start.x && square.y === start.y) {
                drawStart(ctx, square.x, square.y, a_square);
            } else if (square.x === end.x && square.y === end.y) {
                drawEnd(ctx, square.x, square.y, a_square);
            }

        }, delay);
        delay += animationSpeed;
    });
};

export const animateShortestPath = (shortestPath, start, end, ctx) => {
    const pathSquares = shortestPath.map(node => ({x: node.x, y: node.y}));

    let delay = 0;
    const animationSpeed = 50;  // Adjust this value to change the speed of the animation

    pathSquares.forEach(square => {
        setTimeout(() => {
            drawRectangle(ctx, square.x, square.y, a_square, "#05fa46");

            if (square.x === start.x && square.y === start.y) {
                drawStart(ctx, square.x, square.y, a_square);
            } else if (square.x === end.x && square.y === end.y) {
                drawEnd(ctx, square.x, square.y, a_square);
            }

        }, delay);
        delay += animationSpeed;
    });
};