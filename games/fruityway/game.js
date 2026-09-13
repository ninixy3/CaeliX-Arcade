const gridBoard = document.getElementById('grid-board');
const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('game-status');

const bossSprite = document.getElementById('boss-sprite');
const hpBar = document.getElementById('hp-bar');
const hpText = document.getElementById('hp-text');

const width = 6;
const tiles = [];
let score = 0;
let isProcessing = false;

// Boss Status
let bossMaxHp = 1000;
let bossHp = 1000;
let sleepTurns = 0;

const BOSS_SPRITES = {
    calm: 'https://i.postimg.cc/Jz4cyXHL/voidvruhig.png',
    angry: 'https://i.postimg.cc/tJnM6rqY/voidvrmad.png',
    sleep: 'https://i.postimg.cc/mkj1Rdwt/voidvrsleep.png'
};

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
    tiles.length = 0;
    for (let i = 0; i < width * width; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id', i);
        tile.dataset.petrified = "false";
        
        const randomImg = candyTypes[Math.floor(Math.random() * candyTypes.length)];
        tile.innerHTML = `<img src="${randomImg}" alt="fruit">`;
        
        tile.addEventListener('click', handleTileClick);
        gridBoard.appendChild(tile);
        tiles.push(tile);
    }
    updateBossUI();
}

function handleTileClick(e) {
    if (isProcessing) return;

    const clickedTile = e.target.tagName === 'IMG' ? e.target.parentElement : e.target;

    // Versteinertes Feld sperren
    if (clickedTile.dataset.petrified === "true") {
        if (statusDisplay) statusDisplay.innerText = "Das Feld ist versteinert!";
        return;
    }

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
            processMatches(true);
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

    const tempPetrified = tile1.dataset.petrified;
    tile1.dataset.petrified = tile2.dataset.petrified;
    tile2.dataset.petrified = tempPetrified;

    updateTileState(tile1);
    updateTileState(tile2);
}

function updateTileState(tile) {
    if (tile.dataset.petrified === "true") {
        tile.classList.add('petrified');
    } else {
        tile.classList.remove('petrified');
    }
}

async function processMatches(isPlayerMove = false) {
    isProcessing = true;
    
    const matchedIndices = findMatches();
    if (matchedIndices.length > 0) {
        const damage = matchedIndices.length * 15;
        score += matchedIndices.length * 10;
        bossHp = Math.max(0, bossHp - damage);

        if (scoreDisplay) scoreDisplay.innerText = score;
        if (statusDisplay) statusDisplay.innerText = `Treffer! -${damage} HP bei Voidvorka!`;

        // Entsteinert Nachbarfelder bei einer Combo
        unpetrifyNeighbors(matchedIndices);

        // Gematchte Felder leeren
        matchedIndices.forEach(index => {
            tiles[index].innerHTML = '';
        });

        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;

        updateBossUI();

        await new Promise(r => setTimeout(r, 250));

        await dropTiles();
        await processMatches(false);
    } else {
        if (firstTile) firstTile.classList.remove('selected');
        firstTile = null;
        secondTile = null;

        if (isPlayerMove) {
            handleBossAction();
        }
        if (statusDisplay && bossHp > 0) statusDisplay.innerText = "Finde 3er Kombis!";
    }

    isProcessing = false;
}

function unpetrifyNeighbors(matchedIndices) {
    matchedIndices.forEach(index => {
        const neighbors = [
            index - 1,
            index + 1,
            index - width,
            index + width
        ];

        neighbors.forEach(n => {
            if (n >= 0 && n < width * width && tiles[n].dataset.petrified === "true") {
                if (Math.abs((index % width) - (n % width)) <= 1) {
                    tiles[n].dataset.petrified = "false";
                    updateTileState(tiles[n]);
                }
            }
        });
    });
}

function handleBossAction() {
    if (sleepTurns > 0) {
        sleepTurns--;
        updateBossUI();
        return;
    }

    const hpPercent = (bossHp / bossMaxHp) * 100;

    // Boss versteinert nur im wütenden Zustand (≤ 60% HP)
    if (hpPercent <= 60 && bossHp > 0) {
        let petrifyCount = 1;
        if (hpPercent <= 30 || score > 2000) petrifyCount = 2;
        if (hpPercent <= 15 || score > 4000) petrifyCount = 3;

        const availableTiles = tiles.filter(t => t.dataset.petrified === "false" && t.innerHTML !== '');
        
        for (let i = 0; i < petrifyCount && availableTiles.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableTiles.length);
            const targetTile = availableTiles.splice(randomIndex, 1)[0];
            targetTile.dataset.petrified = "true";
            updateTileState(targetTile);
        }

        if (statusDisplay) statusDisplay.innerText = `Voidvorka wütet und versteinert ${petrifyCount} Feld(er)!`;
    }
}

function updateBossUI() {
    const hpPercent = Math.max(0, (bossHp / bossMaxHp) * 100);
    if (hpBar) hpBar.style.width = `${hpPercent}%`;
    if (hpText) hpText.innerText = `${bossHp} / ${bossMaxHp} HP`;

    if (!bossSprite) return;

    if (bossHp <= 0) {
        if (statusDisplay) statusDisplay.innerText = "Sieg! Voidvorka wurde besiegt!";
        bossSprite.src = BOSS_SPRITES.sleep;
        return;
    }

    if (sleepTurns > 0) {
        bossSprite.src = BOSS_SPRITES.sleep;
    } else if (hpPercent <= 60) {
        bossSprite.src = BOSS_SPRITES.angry;
    } else {
        bossSprite.src = BOSS_SPRITES.calm;
    }
}

function getTileSrc(tile) {
    const img = tile.querySelector('img');
    return img ? img.src : '';
}

function findMatches() {
    const matched = new Set();

    // Horizontale Prüfungen (versteinerte Felder zählen nicht)
    for (let i = 0; i < 36; i++) {
        if (i % width > width - 3) continue;
        const row = [i, i + 1, i + 2];
        const src = getTileSrc(tiles[i]);

        if (src !== '' && row.every(idx => getTileSrc(tiles[idx]) === src && tiles[idx].dataset.petrified === "false")) {
            row.forEach(index => matched.add(index));
        }
    }

    // Vertikale Prüfungen (versteinerte Felder zählen nicht)
    for (let i = 0; i < 24; i++) {
        const col = [i, i + width, i + (width * 2)];
        const src = getTileSrc(tiles[i]);

        if (src !== '' && col.every(idx => getTileSrc(tiles[idx]) === src && tiles[idx].dataset.petrified === "false")) {
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
                tiles[i].dataset.petrified = tiles[upperIndex].dataset.petrified;
                tiles[upperIndex].innerHTML = '';
                tiles[upperIndex].dataset.petrified = "false";
            } else {
                const randomImg = candyTypes[Math.floor(Math.random() * candyTypes.length)];
                tiles[i].innerHTML = `<img src="${randomImg}" alt="fruit">`;
                tiles[i].dataset.petrified = "false";
            }
            updateTileState(tiles[i]);
            if (upperIndex >= 0) updateTileState(tiles[upperIndex]);
        }
    }
}

createBoard();
