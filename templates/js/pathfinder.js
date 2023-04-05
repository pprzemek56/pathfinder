const canvas = document.getElementById("game_canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener('mousemove', drawingElements);
canvas.addEventListener('mousedown', drawingElements);

const HORIZONTAL_SQUARES = 53;
const VERTICAL_SQUARES = 21;
const BOARD_WIDTH = 1272;
const BOARD_HEIGHT = 504;

const a_square = 24;

//0 = empty square
//1 = wall square
//2 = start square
//3 = end square
let board = initBoard();
let start = {x: 10, y: 10}
let end = {x: 41, y: 10}
let previousSquare = null;
let clickedSquare = null;

function drawingElements(event) {
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;

    if (x > 0 && x < 1272 && y > 0 && y < 504) {
        x = Math.floor(x / 24);
        y = Math.floor(y / 24);
    }

    if (event.type === "mousedown"){
        clickedSquare = board[y][x];
        if (clickedSquare === 2 || clickedSquare === 3) {
            // move the start/end sign
            previousSquare = {x: x, y: y};
        } else {
            // place/remove walls
            if (board[y][x] === 0){
                // place walls
                drawRectangle(x, y, "#0f3052");
                board[y][x] = 1;
            }else if(board[y][x] === 1){
                // remove walls
                drawRectangle(x, y, "#ffffff");
                board[y][x] = 0;
            }
            previousSquare = {x: x, y: y};
        }
    } else if (event.type === "mousemove" && event.buttons === 1) {
        if (clickedSquare === 2) {
            // move the start sign
            if (board[y][x] !== 3){
                drawRectangle(previousSquare.x, previousSquare.y, "#ffffff");
                drawStart(x, y);
                board[previousSquare.y][previousSquare.x] = 0;
                board[y][x] = 2;
                start = {x: x, y: y};
            }
            previousSquare = {x: x, y: y};
        } else if (clickedSquare === 3) {
            // move the end sign
            if (board[y][x] !== 2){
                drawRectangle(previousSquare.x, previousSquare.y, "#ffffff");
                drawEnd(x, y);
                board[previousSquare.y][previousSquare.x] = 0;
                board[y][x] = 3;
                end = {x: x, y: y};
            }
            previousSquare = {x: x, y: y};
        } else if (board[y][x] === 0 && (previousSquare.x !== x || previousSquare.y !== y) && clickedSquare === 0){
            // place walls
            drawRectangle(x, y, "#0f3052");
            board[y][x] = 1;
        }else if(board[y][x] === 1 && (previousSquare.x !== x || previousSquare.y !== y) && clickedSquare === 1){
            // remove walls
            drawRectangle(x, y, "#ffffff");
            board[y][x] = 0;
        }
        previousSquare = {x: x, y: y};
    } else if(event.type === "mousemove"){
        clickedSquare = null;
    }

}

function drawRectangle(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * 24, y * 24, 24, 24);
    ctx.strokeStyle = "#0f3052";
    ctx.strokeRect(x * 24, y * 24, 24, 24);
}

function drawStart(x, y){
    // Set up the drawing style
    ctx.fillStyle = "#0f3052";
    ctx.strokeStyle = "#0f3052";

    // Calculate the size and position of the triangle
    let triangleSize = a_square * 0.33;
    let triangleX = x * a_square + (a_square / 3);
    let triangleY = y * a_square + (a_square / 2);

    // Draw the triangle
    ctx.beginPath();
    ctx.moveTo(triangleX, triangleY - triangleSize);
    ctx.lineTo(triangleX + triangleSize, triangleY);
    ctx.lineTo(triangleX, triangleY + triangleSize);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawEnd(x, y){
    const radius = 9;
    const innerRadius = 4;
    ctx.beginPath();
    ctx.arc(x*24+12, y*24+12, radius, 0, 2*Math.PI, false);
    ctx.strokeStyle = "#0f3052";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x*24+12, y*24+12, innerRadius, 0, 2*Math.PI, false);
    ctx.fillStyle = "#0f3052";
    ctx.fill();
}

function initBoard() {

    let array = new Array(VERTICAL_SQUARES)
    for (let i = 0; i < VERTICAL_SQUARES; i++){
        array[i] = new Array(HORIZONTAL_SQUARES).fill(0);
    }

    array[10][10] = 2;
    array[10][41] = 3;
    return array
}


function drawBoard() {
    ctx.strokeStyle = "#0f3052"

    //Draw horizontal lines
    for(let i = 0; i < VERTICAL_SQUARES + 1; i++){
        ctx.beginPath();
        ctx.moveTo(0, i * a_square);
        ctx.lineTo(1272, i * a_square);
        ctx.stroke();
    }

    //Draw vertical lines
    for(let i = 0; i < HORIZONTAL_SQUARES + 1; i++){
        ctx.beginPath();
        ctx.moveTo(i * a_square, 0);
        ctx.lineTo(i * a_square, 504);
        ctx.stroke();
    }

    drawStart(start.x, start.y);
    drawEnd(end.x, end.y);
}

window.addEventListener('load', function (){

    drawBoard();

});