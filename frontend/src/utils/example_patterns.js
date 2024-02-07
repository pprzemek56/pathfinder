export function generateRandomPattern(board) {
    const resetBoard = board.map(row =>
        row.map(cell => ({
            ...cell,
            type: cell.type === 2 || cell.type === 3 ? cell.type : 0,
        }))
    );

    return resetBoard.map(row =>
        row.map(cell => ({
            ...cell,
            type: (cell.type === 0 && Math.random() < 0.3) ? 1 : cell.type,
        }))
    );
}

export function generateMazePattern(board) {
    const HORIZONTAL_SQUARES = board[0].length;
    const VERTICAL_SQUARES = board.length;

    function addCellAndItsWalls(x, y, maze, walls) {
        maze[y][x].type = 0;
        [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([dx, dy]) => {
            const nx = x + dx, ny = y + dy;
            if (nx >= 0 && nx < HORIZONTAL_SQUARES && ny >= 0 && ny < VERTICAL_SQUARES && maze[ny][nx].type === 1) {
                walls.push({x: nx, y: ny, dx: dx, dy: dy});
            }
        });
    }

    let maze = board.map(row => row.map(cell => ({
        ...cell,
        type: (cell.type === 2 || cell.type === 3) ? cell.type : 1
    })));

    let walls = [];
    let startX = Math.floor(Math.random() * HORIZONTAL_SQUARES);
    let startY = Math.floor(Math.random() * VERTICAL_SQUARES);
    addCellAndItsWalls(startX, startY, maze, walls);

    while (walls.length > 0) {
        let wallIndex = Math.floor(Math.random() * walls.length);
        let {x, y, dx, dy} = walls[wallIndex];
        walls.splice(wallIndex, 1);

        let nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < HORIZONTAL_SQUARES && ny >= 0 && ny < VERTICAL_SQUARES && maze[ny][nx].type === 1) {
            maze[y][x].type = 0;
            addCellAndItsWalls(nx, ny, maze, walls);
        }
    }

    return maze;
}