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
            } else{
                // switch the focus to the end sign
                clickedSquare = 3;
            }
        } else if (clickedSquare === 3) {
            // move the end sign
            if (board[y][x] !== 2){
                drawRectangle(previousSquare.x, previousSquare.y, "#ffffff");
                drawEnd(x, y);
                board[previousSquare.y][previousSquare.x] = 0;
                board[y][x] = 3;
                end = {x: x, y: y};
            } else {
                // switch the focus to the start sign
                clickedSquare = 2;
            }
        }else if (board[y][x] === 0 && (previousSquare.x !== x || previousSquare.y !== y) && clickedSquare === 0){
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
    ctx.lineWidth = 2;

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

document.getElementById('dfs').addEventListener('click', selectAlgorithm);
document.getElementById('bfs').addEventListener('click', selectAlgorithm);
document.getElementById('dijkstra').addEventListener('click', selectAlgorithm);
document.getElementById("start_btn").addEventListener('click', startVisualization);
document.getElementById('fast').addEventListener('click', initSpeed);
document.getElementById('medium').addEventListener('click', initSpeed);
document.getElementById('slow').addEventListener('click', initSpeed);

let algorithm = null
let duration = 600;

function initSpeed(event){
    let speed = event.target.id;
    if (speed === "fast") duration = 10;
    else if(speed === "medium") duration = 50;
    else duration = 300;
}

function selectAlgorithm(event){
    event.preventDefault();

    algorithm = event.target.id;
}

async function startVisualization(){
    const response = await fetch('http://localhost:8000/visualize/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({board, algorithm})
    });

    if (response.ok){
        const result = await response.json();

        let visited = result["visited"];
        let shortestPath = result["shortest_path"];
        if(visited === null && shortestPath === null){
            console.log("Path not exist");
            // TODO
        }

        await animateAlgorithm(visited, shortestPath);
    }else{
        console.error("Error fetching data from the server: ", response.statusText);
    }
}

async function animateAlgorithm(visited, shortestPath) {
    const animationDuration = 10;

    async function animateSquare(x, y, color, startSize, endSize, duration) {
        const steps = Math.ceil(duration / animationDuration);
        const deltaSize = (endSize - startSize) / steps;

        for (let i = 0; i <= steps; i++) {
            let size = startSize + deltaSize * i;

            ctx.fillStyle = color;
            ctx.fillRect(x * a_square + (a_square - size) / 2, y * a_square + (a_square - size) / 2, size, size);
            ctx.strokeStyle = "#0f3052";
            ctx.strokeRect(x * a_square, y * a_square, a_square, a_square);

            await new Promise(resolve => setTimeout(resolve, animationDuration));
        }
    }

    // Animate visited squares
    for (const square of visited) {
        const {x, y} = square;
        await animateSquare(x, y, "yellow", 0, a_square, duration / 4);
        drawRectangle(x, y, "#ffffff");
        await animateSquare(x, y, "skyblue", 0, a_square, duration);
        if (board[y][x] === 2){
            drawStart(x, y);
        } else if(board[y][x] === 3){
            drawEnd(x, y);
        }
    }

    // Animate the shortest path squares
    for (const square of shortestPath) {
        const {x, y} = square;
        await animateSquare(x, y, "#86c232", 0, a_square, duration);
        if (board[y][x] === 2){
            drawStart(x, y);
        } else if(board[y][x] === 3){
            drawEnd(x, y);
        }
    }
}


document.getElementById("clear_board").addEventListener("click", clearBoard);

function clearBoard() {
    // Initialize the board with empty squares
    board = initBoard();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the empty board
    drawBoard();
}