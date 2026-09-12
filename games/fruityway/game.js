const gridBoard = document.getElementById('grid-board');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('game-status');

const width = 6;
const tiles = [];
let score = 0;

// Vorläufige Emoji-Früchte (ersetzen wir später durch deine eigenen Bilder)
const candyTypes = ['🍓', '🍇', '🍎', '🍋', '🍐'];

let firstTile = null;
let secondTile = null;

function createBoard() {
    gridBoard.innerHTML = '';
    for (let i = 0; i < width * width; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', i);
        
        const randomType = candyTypes[Math.floor(Math.random() * candyTypes.length)];
        tile.innerText = randomType;
        
        tile.addEventListener('click', handleTileClick);
        gridBoard.appendChild(tile);
        tiles.push(tile);
    }
}

function handleTileClick(e) {
    const clickedTile = e.target;

    if (!firstTile) {
        firstTile = clickedTile;
        firstTile.classList.add('selected');
    } else if (!secondTile && clickedTile !== firstTile) {
        secondTile = clickedTile;
        
        const firstId = parseInt(firstTile.id);
        const secondId = parseInt(secondTile.id);

        const validMoves = [
            firstId - 1,
            firstId + 1,
            firstId - width,
            firstId + width
        ];

        const isNeighbor = validMoves.includes(secondId);

        if (isNeighbor) {
            swapTiles(firstTile, secondTile);
            checkMatches();
        }

        firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;
    } else {
        firstTile.classList.remove('selected');
        firstTile = clickedTile;
        firstTile.classList.add('selected');
    }
}

function swapTiles(tile1, tile2) {
    const temp = tile1.innerText;
    tile1.innerText = tile2.innerText;
    tile2.innerText = temp;
}

function checkMatches() {
    let matchFound = false;

    // Horizontale Prüfungen
    for (let i = 0; i < 36; i++) {
        if (i % width > width - 3) continue;
        const row = [i, i + 1, i + 2];
        const symbol = tiles[i].innerText;

        if (symbol && row.every(index => tiles[index].innerText === symbol)) {
            score += 30;
            scoreDisplay.innerText = score;
            row.forEach(index => {
                tiles[index].innerText = candyTypes[Math.floor(Math.random() * candyTypes.length)];
            });
            matchFound = true;
        }
    }

    // Vertikale Prüfungen
    for (let i = 0; i < 24; i++) {
        const col = [i, i + width, i + (width * 2)];
        const symbol = tiles[i].innerText;

        if (symbol && col.every(index => tiles[index].innerText === symbol)) {
            score += 30;
            scoreDisplay.innerText = score;
            col.forEach(index => {
                tiles[index].innerText = candyTypes[Math.floor(Math.random() * candyTypes.length)];
            });
            matchFound = true;
        }
    }

    if (matchFound) {
        statusDisplay.innerText = "Match! Weiter so!";
    }
}

createBoard();

