const gridBoard = document.getElementById('grid-board');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('game-status');

const width = 6;
const tiles = [];
let score = 0;
let isProcessing = false; // Verhindert Klicks während Steine fallen

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
    if (isProcessing) return;

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
            processMatches();
        } else {
            firstTile.classList.remove('selected');
            firstTile = clickedTile;
            firstTile.classList.add('selected');
            secondTile = null;
        }
    } else {
        firstTile.classList.remove('selected');
        firstTile = clickedTile;
        firstTile.classList.add('selected');
        secondTile = null;
    }
}

function swapTiles(tile1, tile2) {
    const temp = tile1.innerText;
    tile1.innerText = tile2.innerText;
    tile2.innerText = temp;
}

async function processMatches() {
    isProcessing = true;
    let hasMatches = false;

    // Matches finden & leeren
    const matchedIndices = findMatches();
    if (matchedIndices.length > 0) {
        hasMatches = true;
        score += matchedIndices.length * 10;
        scoreDisplay.innerText = score;
        statusDisplay.innerText = "Combo!";

        // Feld leeren
        matchedIndices.forEach(index => {
            tiles[index].innerText = '';
        });

        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;

        await new Promise(r => setTimeout(r, 250)); // kurze Pause für den Effekt

        // Nachfallen & Neue Früchte von oben generieren
        await dropTiles();
        
        // Kettenreaktion prüfen!
        await processMatches();
    } else {
        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;
        statusDisplay.innerText = "Finde 3er Kombis!";
    }

    isProcessing = false;
}

function findMatches() {
    const matched = new Set();

    // Horizontale Prüfungen
    for (let i = 0; i < 36; i++) {
        if (i % width > width - 3) continue;
        const row = [i, i + 1, i + 2];
        const symbol = tiles[i].innerText;

        if (symbol !== '' && row.every(index => tiles[index].innerText === symbol)) {
            row.forEach(index => matched.add(index));
        }
    }

    // Vertikale Prüfungen
    for (let i = 0; i < 24; i++) {
        const col = [i, i + width, i + (width * 2)];
        const symbol = tiles[i].innerText;

        if (symbol !== '' && col.every(index => tiles[index].innerText === symbol)) {
            col.forEach(index => matched.add(index));
        }
    }

    return Array.from(matched);
}

async function dropTiles() {
    for (let i = 35; i >= 0; i--) {
        if (tiles[i].innerText === '') {
            // Suche den nächsten Stein darüber
            let upperIndex = i - width;
            while (upperIndex >= 0 && tiles[upperIndex].innerText === '') {
                upperIndex -= width;
            }

            if (upperIndex >= 0) {
                // Stein nach unten verschieben
                tiles[i].innerText = tiles[upperIndex].innerText;
                tiles[upperIndex].innerText = '';
            } else {
                // Keine Steine mehr darüber -> Von oben neu generieren
                tiles[i].innerText = candyTypes[Math.floor(Math.random() * candyTypes.length)];
            }
        }
    }
}

createBoard();
