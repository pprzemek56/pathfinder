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

export const animateSingleNode = (node, ctx, squareSize, start, end) => {
    setTimeout(() => {
        drawRectangle(ctx, node.x, node.y, squareSize, "#05e1f5");
        if (node.x === start.x && node.y === start.y) {
            drawStart(ctx, node.x, node.y, squareSize);
        } else if (node.x === end.x && node.y === end.y) {
            drawEnd(ctx, node.x, node.y, squareSize);
        }
    }, 500);
};

export const highlightNeighborEvaluation = (node, ctx, squareSize, start, end) => {
    const originalColor = "#ffffff";
    const evaluationColor = "#f0e68c";

    if (node.x === end.x && node.y === end.y) {
        drawRectangle(ctx, node.x, node.y, squareSize, evaluationColor);
        drawEnd(ctx, node.x, node.y, squareSize);
    } else {
        drawRectangle(ctx, node.x, node.y, squareSize, evaluationColor);
        setTimeout(() => {
            drawRectangle(ctx, node.x, node.y, squareSize, originalColor);
            if (node.x === start.x && node.y === start.y) {
                drawStart(ctx, node.x, node.y, squareSize);
            }
        }, 1000);
    }
};