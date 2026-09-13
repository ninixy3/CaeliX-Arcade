const gridBoard = document.getElementById('grid-board');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('game-status');

const width = 6;
const tiles = [];
let score = 0;
let isProcessing = false;

// Deine 13 Frucht-Bilder
const candyTypes = [
    'https://i.postimg.cc/G2s6ZVbM/fr11.png',
    'https://i.postimg.cc/hj7NH6Ky/fr12.png',
    'https://i.postimg.cc/QMxs7rvy/fr19.png',
    'https://i.postimg.cc/RZgyjJD9/fr16.png',
    'https://i.postimg.cc/g0550Fp7/fr15.png',
    'https://i.postimg.cc/HWbKThh3/fr13.png',
    'https://i.postimg.cc/VN3G8q9V/fr9.png',
    'https://i.postimg.cc/Kjb0KmHq/fr8.png',
    'https://i.postimg.cc/VvFDn3yN/fr7.png',
    'https://i.postimg.cc/pd8QKgzP/fr1.png',
    'https://i.postimg.cc/J7Qq6Vg1/fr4.png',
    'https://i.postimg.cc/mkVytC9K/fr5.png',
    'https://i.postimg.cc/dVhjV7Vp/fr3.png'
];

let firstTile = null;
let secondTile = null;

function createBoard() {
    gridBoard.innerHTML = '';
    for (let i = 0; i < width * width; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', i);
        
        const randomImg = candyTypes[Math.floor(Math.random() * candyTypes.length)];
        tile.innerHTML = `<img src="${randomImg}" alt="fruit">`;
        
        tile.addEventListener('click', handleTileClick);
        gridBoard.appendChild(tile);
        tiles.push(tile);
    }
}

function handleTileClick(e) {
    if (isProcessing) return;

    // Klick-Ziel auf die Kachel (tile) festlegen, falls das Bild angeklickt wurde
    const clickedTile = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;

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
    const tempHTML = tile1.innerHTML;
    tile1.innerHTML = tile2.innerHTML;
    tile2.innerHTML = tempHTML;
}

async function processMatches() {
    isProcessing = true;
    
    const matchedIndices = findMatches();
    if (matchedIndices.length > 0) {
        score += matchedIndices.length * 10;
        scoreDisplay.innerText = score;
        statusDisplay.innerText = "Combo!";

        // Matched Felder leeren
        matchedIndices.forEach(index => {
            tiles[index].innerHTML = '';
        });

        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;

        await new Promise(r => setTimeout(r, 250));

        await dropTiles();
        await processMatches();
    } else {
        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;
        statusDisplay.innerText = "Finde 3er Kombis!";
    }

    isProcessing = false;
}

function getTileSrc(tile) {
    const img = tile.querySelector('img');
    return img ? img.src : '';
}

function findMatches() {
    const matched = new Set();

    // Horizontale Prüfungen
    for (let i = 0; i < 36; i++) {
        if (i % width > width - 3) continue;
        const row = [i, i + 1, i + 2];
        const src = getTileSrc(tiles[i]);

        if (src !== '' && row.every(index => getTileSrc(tiles[index]) === src)) {
            row.forEach(index => matched.add(index));
        }
    }

    // Vertikale Prüfungen
    for (let i = 0; i < 24; i++) {
        const col = [i, i + width, i + (width * 2)];
        const src = getTileSrc(tiles[i]);

        if (src !== '' && col.every(index => getTileSrc(tiles[index]) === src)) {
            col.forEach(index => matched.add(index));
        }
    }

    return Array.from(matched);
}

async function dropTiles() {
    for (let i = 35; i >= 0; i--) {
        if (tiles[i].innerHTML === '') {
            let upperIndex = i - width;
            while (upperIndex >= 0 && tiles[upperIndex].innerHTML === '') {
                upperIndex -= width;
            }

            if (upperIndex >= 0) {
                tiles[i].innerHTML = tiles[upperIndex].innerHTML;
                tiles[upperIndex].innerHTML = '';
            } else {
                const randomImg = candyTypes[Math.floor(Math.random() * candyTypes.length)];
                tiles[i].innerHTML = `<img src="${randomImg}" alt="fruit">`;
            }
        }
    }
}

createBoard();
