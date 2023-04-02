const canvas = document.getElementById("game_canvas");
const context = canvas.getContext("2d");

const HORIZONTAL_SQUARES = 53;
const VERTICAL_SQUARES = 21;
const BOARD_WIDTH = canvas.offsetWidth;
const BOARD_HEIGHT = initHeight();

function initHeight() {
    let square_height = BOARD_WIDTH / 53;
    canvas.style.height = square_height * 21 + "px";
    return canvas.height;
}

function drawBoard() {
    // let horizontal = BOARD_WIDTH;
    // let vertical =;
    //
    // for(let i = 0; i < )
}

window.addEventListener('load', function (){

    drawBoard();

});