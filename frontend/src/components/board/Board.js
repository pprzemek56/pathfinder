import React, {useCallback, useEffect, useState} from 'react';

import "./Board.css"
import {HORIZONTAL_SQUARES, VERTICAL_SQUARES} from "../../pages/HomePage";

export function drawRectangle(ctx, x, y, a_square, color, lineThickness) {
    ctx.fillStyle = color;
    ctx.fillRect(x * a_square, y * a_square, a_square, a_square);
    ctx.strokeStyle = "#0f3052";
    ctx.lineWidth = lineThickness;
    ctx.strokeRect(x * a_square, y * a_square, a_square, a_square);
}

export function drawStart(ctx, x, y, a_square) {
    const triangleSize = a_square * 0.33;
    const triangleX = x * a_square + (a_square / 3);
    const triangleY = y * a_square + (a_square / 2);

    ctx.fillStyle = "#0f3052";
    ctx.strokeStyle = "#0f3052";
    ctx.beginPath();
    ctx.moveTo(triangleX, triangleY - triangleSize);
    ctx.lineTo(triangleX + triangleSize, triangleY);
    ctx.lineTo(triangleX, triangleY + triangleSize);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

export function drawEnd(ctx, x, y, a_square) {
    const radius = 9;
    const innerRadius = 4;
    const centerX = x * a_square + a_square / 2;
    const centerY = y * a_square + a_square / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.strokeStyle = "#0f3052";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#0f3052";
    ctx.fill();
}

export function clearPath(ctx, board, squareSize) {
    for (let y = 0; y < VERTICAL_SQUARES; y++) {
        for (let x = 0; x < HORIZONTAL_SQUARES; x++) {
            if (board[y][x].type !== 1 && board[y][x].type !== 2) {
                drawRectangle(ctx, x, y, squareSize, "#ffffff", squareSize / 12);
            }

            if (board[y][x].type === 3) {
                drawRectangle(ctx, x, y, squareSize, "#ffffff", squareSize / 12);
                drawEnd(ctx, x, y, squareSize);
            }
        }
    }
}


function Board( {board, start, end, onSetBoard, onSetStart, onSetEnd, isRunning, canvasRef, squareSize} ) {
    const [clickedSquare, setClickedSquare] = useState(null);

    const handleMouseDown = (event) => {
        if(isRunning) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const boardX = Math.floor(x / squareSize);
        const boardY = Math.floor(y / squareSize);
        const ctx = canvasRef.current.getContext('2d');

        if (boardX === start.x && boardY === start.y) {
            setClickedSquare('start');
            handleMouseMove(event);
            return;
        }

        if (boardX === end.x && boardY === end.y) {
            setClickedSquare('end');
            handleMouseMove(event);
            return;
        }

        if (board[boardY][boardX].type === 0) {
            let newBoard = board.map(row => row.map(cell => ({ ...cell })));
            newBoard[boardY][boardX].type = 1;
            drawRectangle(ctx, boardX, boardY, squareSize, "#0f3052", squareSize / 12);
            onSetBoard(newBoard);
            setClickedSquare('wall');
        } else if (board[boardY][boardX].type === 1) {
            let newBoard = board.map(row => row.map(cell => ({ ...cell })));
            newBoard[boardY][boardX].type = 0;
            drawRectangle(ctx, boardX, boardY, squareSize, "#ffffff", squareSize / 12);
            onSetBoard(newBoard);
            setClickedSquare('empty');
        }
    }

    const handleMouseMove = (event) => {
        if(isRunning) return;

        if (!clickedSquare || event.buttons !== 1) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const boardX = Math.floor(x / squareSize);
        const boardY = Math.floor(y / squareSize);
        const ctx = canvasRef.current.getContext('2d');
        const currentBoard = [...board];  // Clone the current board

        if (clickedSquare === 'start' || clickedSquare === 'end') {
            if (currentBoard[boardY][boardX].type === 0 && (boardX !== end.x || boardY !== end.y) && (boardX !== start.x || boardY !== start.y)) {
                const newCoord = { x: boardX, y: boardY };

                if (clickedSquare === 'start') {
                    currentBoard[start.y][start.x].type = 0;
                    currentBoard[boardY][boardX].type = 2;
                    onSetStart(newCoord);
                } else {
                    currentBoard[end.y][end.x].type = 0;
                    currentBoard[boardY][boardX].type = 3;
                    onSetEnd(newCoord);
                }
            }
        } else {
            if ((boardX === start.x && boardY === start.y) || (boardX === end.x && boardY === end.y)) {
                return;
            }

            if (clickedSquare === 'wall' && board[boardY][boardX].type !== 1) {
                let newBoard = [...board];
                newBoard[boardY][boardX].type = 1;
                drawRectangle(ctx, boardX, boardY, squareSize, "#0f3052", squareSize / 12);
                onSetBoard(newBoard);
            } else if (clickedSquare === 'empty' && board[boardY][boardX].type !== 0) {
                let newBoard = [...board];
                newBoard[boardY][boardX].type = 0;
                drawRectangle(ctx, boardX, boardY, squareSize, "#ffffff", squareSize / 12);
                onSetBoard(newBoard);
            }
        }
    }

    const handleMouseUp = () => {
        setClickedSquare(null);
    }

    const createBoard = useCallback((ctx) => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, HORIZONTAL_SQUARES * squareSize, VERTICAL_SQUARES * squareSize);

        for(let i = 0; i < VERTICAL_SQUARES + 1; i++){
            ctx.beginPath();
            ctx.moveTo(0, i * squareSize);
            ctx.lineTo(HORIZONTAL_SQUARES * squareSize, i * squareSize);
            ctx.stroke();
        }

        for(let i = 0; i < HORIZONTAL_SQUARES + 1; i++){
            ctx.beginPath();
            ctx.moveTo(i * squareSize, 0);
            ctx.lineTo(i * squareSize, VERTICAL_SQUARES * squareSize);
            ctx.stroke();
        }

        drawStart(ctx, start.x, start.y, squareSize);
        drawEnd(ctx, end.x, end.y, squareSize);

        for (let i = 0; i < VERTICAL_SQUARES; i++) {
            for (let j = 0; j < HORIZONTAL_SQUARES; j++) {
                if (board[i][j].type === 1) {
                    drawRectangle(ctx, j, i, squareSize, "#0f3052", squareSize / 12);
                }
            }
        }
    }, [board, start, end, squareSize]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        clearPath(ctx, board);
        createBoard(ctx);
    }, [board, start, end, createBoard, canvasRef]);

    // 6. Render
    return (
        <div className="canvas-container">
            <canvas
                ref={canvasRef}
                width={HORIZONTAL_SQUARES * squareSize}
                height={VERTICAL_SQUARES * squareSize}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
        </div>
    );
}

export default Board;