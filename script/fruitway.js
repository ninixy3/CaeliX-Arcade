/* =========================================================
CAELIX ARCADE - FRUITYWAY
VERSION 1.0

50 FELDER
MATCH 3
8-18 ZÜGE
6 SPIELFELD-FORMEN
VOIDVORKA
ITEMS
STARON
RUNDEN
========================================================= */

/* =========================================================
SPIELKONSTANTEN
========================================================= */

const BOARD_SIZE = 50;

const ROWS = 5;
const COLS = 10;

/*
Die 16 normalen Früchte.

Die Bilder stammen aus den von dir angegebenen
Postimg-Links.

*/

const FRUITS = [

{
    id: "fr1",
    name: "Frucht 1",
    image: "https://i.postimg.cc/pd8QKgzP/fr1.png"
},

{
    id: "fr2",
    name: "Frucht 2",
    image: "https://i.postimg.cc/d0dRGzdr/fr2.png"
},

{
    id: "fr3",
    name: "Frucht 3",
    image: "https://i.postimg.cc/dVhjV7Vp/fr3.png"
},

{
    id: "fr4",
    name: "Frucht 4",
    image: "https://i.postimg.cc/J7Qq6Vg1/fr4.png"
},

{
    id: "fr5",
    name: "Frucht 5",
    image: "https://i.postimg.cc/mkVytC9K/fr5.png"
},

{
    id: "fr6",
    name: "Frucht 6",
    image: "https://i.postimg.cc/x1ZgvvZ8/fr6.png"
},

{
    id: "fr7",
    name: "Frucht 7",
    image: "https://i.postimg.cc/VvFDn3yN/fr7.png"
},

{
    id: "fr8",
    name: "Frucht 8",
    image: "https://i.postimg.cc/Kjb0KmHq/fr8.png"
},

{
    id: "fr9",
    name: "Frucht 9",
    image: "https://i.postimg.cc/VN3G8q9V/fr9.png"
},

{
    id: "fr11",
    name: "Frucht 11",
    image: "https://i.postimg.cc/G2s6ZVbM/fr11.png"
},

{
    id: "fr12",
    name: "Frucht 12",
    image: "https://i.postimg.cc/hj7NH6Ky/fr12.png"
},

{
    id: "fr13",
    name: "Frucht 13",
    image: "https://i.postimg.cc/HWbKThh3/fr13.png"
},

{
    id: "fr14",
    name: "Frucht 14",
    image: "https://i.postimg.cc/FzM8rZsw/fr14.png"
},

{
    id: "fr15",
    name: "Frucht 15",
    image: "https://i.postimg.cc/g0550Fp7/fr15.png"
},

{
    id: "fr16",
    name: "Frucht 16",
    image: "https://i.postimg.cc/RZgyjJD9/fr16.png"
},

{
    id: "fr19",
    name: "Frucht 19",
    image: "https://i.postimg.cc/QMxs7rvy/fr19.png"
}

];

/* =========================================================
ITEMS
========================================================= */

const ITEMS = {

planetenbeere: {

    name: "Planetenbeere",

    image:
        "https://i.postimg.cc/QdSZhyVS/fr18.png",

    description:
        "Entfernt ausgewählte Früchte."

},

kosmosKokusnuss: {

    name: "Kosmos-Kokusnuss",

    image:
        "https://i.postimg.cc/bJjZnXVJ/fr20.png",

    description:
        "Löscht eine komplette Reihe oder Spalte."

},

saturnpilz: {

    name: "Saturnpilz",

    image:
        "https://i.postimg.cc/6prJQDZ1/fr17.png",

    description:
        "Mischt das gesamte Spielfeld."

},

galaxieLotus: {

    name: "Galaxie Lotus",

    image:
        "https://i.postimg.cc/2yRgmG5Q/fr10.png",

    description:
        "Lässt Voidvorka zwei Runden schlafen."

}

};

/* =========================================================
SPIELFELD-FORMEN
========================================================= */

const BOARD_SHAPES = [

"rectangle",
"square",
"octagon",
"star",
"heart",
"triangle"

];

/* =========================================================
SPIELZUSTAND
========================================================= */

let board = [];

let currentShape =
"rectangle";

let currentRound = 1;

let movesLeft = 0;

let score = 0;

let combo = 0;

let resetAvailable = true;

let selectedCells = [];

let isBusy = false;

/*
Steine werden hier gespeichert.

Beispiel:

stoneCells = [12, 24, 31]

*/

let stoneCells = new Set();

/*
Voidvorka

1-3 = ruhig
ab 4 = aktiv

*/

let voidvorkaState =
"calm";

let voidvorkaSleepingRounds = 0;

/*
verhindert mehrfaches
Versteinern innerhalb
einer Runde
*/

let stonesPlacedThisRound = 0;

/* =========================================================
HILFSFUNKTION
========================================================= */

function randomNumber(min, max) {

return Math.floor(
    Math.random() *
    (max - min + 1)
) + min;

}

/* =========================================================
ZUFÄLLIGE FRUCHT
========================================================= */

function randomFruit() {

return FRUITS[
    Math.floor(
        Math.random() *
        FRUITS.length
    )
];

}

/* =========================================================
ZUFÄLLIGE FORM
========================================================= */

function randomShape() {

return BOARD_SHAPES[
    Math.floor(
        Math.random() *
        BOARD_SHAPES.length
    )
];

}

/* =========================================================
GÜLTIGE FELDER
========================================================= */

/*
Es bleiben immer maximal 50 aktive Felder.

Die Formen werden über Koordinaten
angenähert.

Dadurch kann die Form zufällig
wechseln, ohne dass das eigentliche
Match-3-System kompliziert wird.

*/

function generateActiveCells(shape) {

const cells = [];


/*
    Grundidee:
    Wir wählen 50 Felder aus dem
    5 × 10 Raster.

    Je nach Form werden andere
    Bereiche bevorzugt.
*/


const candidates = [];


for (
    let row = 0;
    row < ROWS;
    row++
) {

    for (
        let col = 0;
        col < COLS;
        col++
    ) {

        const index =
            row * COLS + col;


        let x =
            col / (COLS - 1);

        let y =
            row / (ROWS - 1);


        let active =
            true;


        if (shape === "rectangle") {

            active = true;

        }


        if (shape === "square") {

            /*
                Fast quadratische Auswahl.
            */

            active =
                col >= 2 &&
                col <= 7;

        }


        if (shape === "octagon") {

            active =
                !(
                    (row === 0 && (col < 2 || col > 7)) ||
                    (row === 4 && (col < 2 || col > 7))
                );

        }


        if (shape === "triangle") {

            const width =
                2 +
                Math.floor(
                    row * 2
                );

            const center =
                4.5;

            const left =
                center -
                width / 2;

            const right =
                center +
                width / 2;

            active =
                col >= left &&
                col <= right;

        }


        if (shape === "heart") {

            /*
                Herzform.
            */

            const dx =
                Math.abs(
                    x - .5
                );

            const top =
                row <= 1;

            if (top) {

                active =
                    dx < .48;

            } else {

                active =
                    x >
                    y * .42 &&
                    x <
                    1 -
                    y * .42;

            }

        }


        if (shape === "star") {

            /*
                Sternähnliche Form.
            */

            const centerDistance =
                Math.abs(
                    col - 4.5
                );

            if (row === 0) {

                active =
                    col === 4 ||
                    col === 5;

            } else if (row === 1) {

                active =
                    centerDistance <= 3;

            } else if (row === 2) {

                active = true;

            } else if (row === 3) {

                active =
                    centerDistance <= 3;

            } else {

                active =
                    col === 4 ||
                    col === 5;

            }

        }


        if (active) {

            candidates.push(index);

        }

    }

}


/*
    Wenn die Form mehr als 50 Kandidaten
    besitzt, nehmen wir zufällige 50.

    Wenn weniger als 50 vorhanden sind,
    ergänzen wir zufällig.
*/

while (
    candidates.length >
    BOARD_SIZE
) {

    const removeIndex =
        Math.floor(
            Math.random() *
            candidates.length
        );

    candidates.splice(
        removeIndex,
        1
    );

}


/*
    Immer exakt 50 aktive Felder.

    Falls eine Form zu wenig liefert,
    werden zusätzliche Felder genommen.
*/

if (
    candidates.length <
    BOARD_SIZE
) {

    const remaining = [];

    for (
        let i = 0;
        i < ROWS * COLS;
        i++
    ) {

        if (
            !candidates.includes(i)
        ) {

            remaining.push(i);

        }

    }


    while (
        candidates.length <
        BOARD_SIZE &&
        remaining.length
    ) {

        const index =
            Math.floor(
                Math.random() *
                remaining.length
            );

        candidates.push(
            remaining.splice(
                index,
                1
            )[0]
        );

    }

}


return new Set(
    candidates
);

}

/* =========================================================
SPIEL INITIALISIEREN
========================================================= */

function startGame() {

currentRound = 1;

score = 0;

combo = 0;

resetAvailable = true;

stoneCells.clear();

voidvorkaSleepingRounds = 0;

voidvorkaState =
    "calm";


startRound();

}

/* =========================================================
RUNDE STARTEN
========================================================= */

function startRound() {

isBusy = false;

selectedCells = [];

stoneCells.clear();

stonesPlacedThisRound = 0;

resetAvailable = true;


currentShape =
    randomShape();


/*
    8 bis 18 Züge.
*/

movesLeft =
    randomNumber(
        8,
        18
    );


createBoard();


/*
    In den ersten 3 Runden
    bleibt Voidvorka ruhig.

    Danach ist sie aktiv,
    sofern sie nicht schläft.
*/

updateVoidvorka();


updateUI();

}

/* =========================================================
SPIELFELD ERSTELLEN
========================================================= */

function createBoard() {

const activeCells =
    generateActiveCells(
        currentShape
    );


board = [];


for (
    let i = 0;
    i < ROWS * COLS;
    i++
) {

    if (
        !activeCells.has(i)
    ) {

        board.push(null);

        continue;

    }


    board.push(
        randomFruit()
    );

}


/*
    Matchs beim Start vermeiden.
*/

preventStartingMatches();


renderBoard();

}

/* =========================================================
START-MATCHES VERHINDERN
========================================================= */

function preventStartingMatches() {

let safety = 0;


while (
    findMatches().length > 0 &&
    safety < 100
) {

    const matches =
        findMatches();


    matches.forEach(
        index => {

            if (
                board[index]
            ) {

                board[index] =
                    randomFruit();

            }

        }
    );


    safety++;

}

}

/* =========================================================
SPIELFELD RENDERN
========================================================= */

function renderBoard() {

const boardElement =
    document.getElementById(
        "fruitywayBoard"
    );


if (!boardElement) {
    return;
}


boardElement.innerHTML =
    "";


boardElement.className =
    "fruityway-board";


boardElement.classList.add(
    `shape-${currentShape}`
);


board.forEach(
    (fruit, index) => {

        const cell =
            document.createElement(
                "div"
            );


        cell.className =
            "fruity-cell";


        cell.dataset.index =
            index;


        if (!fruit) {

            cell.classList.add(
                "inactive"
            );

        } else {

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                fruit.image;


            image.alt =
                fruit.name;


            cell.appendChild(
                image
            );


            if (
                stoneCells.has(index)
            ) {

                cell.classList.add(
                    "stoned"
                );


                const stone =
                    document.createElement(
                        "div"
                    );


                stone.className =
                    "stone-overlay";


                stone.textContent =
                    "🪨";


                cell.appendChild(
                    stone
                );

            }


            cell.addEventListener(
                "click",
                () => handleCellClick(index)
            );

        }


        boardElement.appendChild(
            cell
        );

    }
);

}

/* =========================================================
FELD KLICKEN
========================================================= */

function handleCellClick(index) {

if (isBusy) {
    return;
}


if (
    !board[index]
) {

    return;

}


if (
    stoneCells.has(index)
) {

    showFruityNotification(
        "🪨 Diese Frucht ist versteinert!"
    );

    return;

}


/*
    Für ein einfaches Match-3-System
    klicken Spieler zwei benachbarte
    Früchte an und tauschen sie.
*/

if (
    selectedCells.length === 0
) {

    selectedCells = [index];

    highlightSelected();

    return;

}


if (
    selectedCells.length === 1
) {

    const first =
        selectedCells[0];


    if (
        first === index
    ) {

        selectedCells = [];

        highlightSelected();

        return;

    }


    if (
        !areAdjacent(
            first,
            index
        )
    ) {

        selectedCells = [index];

        highlightSelected();

        return;

    }


    selectedCells = [
        first,
        index
    ];


    swapSelected();

}

}

/* =========================================================
BENACHBARTE FELDER
========================================================= */

function areAdjacent(a, b) {

const rowA =
    Math.floor(
        a / COLS
    );

const colA =
    a % COLS;


const rowB =
    Math.floor(
        b / COLS
    );

const colB =
    b % COLS;


const rowDifference =
    Math.abs(
        rowA - rowB
    );

const colDifference =
    Math.abs(
        colA - colB
    );


return (
    rowDifference +
    colDifference ===
    1
);

}

/* =========================================================
AUSWAHL HIGHLIGHTEN
========================================================= */

function highlightSelected() {

document
    .querySelectorAll(
        ".fruity-cell"
    )
    .forEach(
        cell => {

            cell.classList.remove(
                "selected"
            );

        }
    );


selectedCells.forEach(
    index => {

        const cell =
            document.querySelector(
                `.fruity-cell[data-index="${index}"]`
            );


        if (cell) {

            cell.classList.add(
                "selected"
            );

        }

    }
);

}

/* =========================================================
TAUSCHEN
========================================================= */

async function swapSelected() {

if (
    selectedCells.length !== 2
) {

    return;

}


isBusy = true;


const [a, b] =
    selectedCells;


selectedCells = [];


swapBoardCells(
    a,
    b
);


renderBoard();


/*
    Prüfen, ob dadurch ein Match
    entstanden ist.
*/

const matches =
    findMatches();


if (
    matches.length === 0
) {

    /*
        Kein Match:
        wieder zurücktauschen.
    */

    await delay(250);


    swapBoardCells(
        a,
        b
    );


    renderBoard();


    showFruityNotification(
        "Keine Kombination!"
    );


    isBusy = false;

    return;

}


movesLeft--;

updateUI();


await resolveMatches();


/*
    Wenn keine Züge mehr übrig sind,
    wird die Runde beendet.
*/

if (
    movesLeft <= 0
) {

    await delay(500);

    finishRound();

    return;

}


/*
    Voidvorka greift nach einem Zug an.
*/

await voidvorkaTurn();


isBusy = false;

}

/* =========================================================
ZWEI FELDER TAUSCHEN
========================================================= */

function swapBoardCells(a, b) {

const temp =
    board[a];

board[a] =
    board[b];

board[b] =
    temp;

}

/* =========================================================
MATCHES FINDEN
========================================================= */

function findMatches() {

const matches =
    new Set();


/*
    Horizontale Matches.
*/

for (
    let row = 0;
    row < ROWS;
    row++
) {

    let run = [];

    for (
        let col = 0;
        col < COLS;
        col++
    ) {

        const index =
            row * COLS + col;


        const fruit =
            board[index];


        if (
            !fruit ||
            stoneCells.has(index)
        ) {

            if (
                run.length >= 3
            ) {

                run.forEach(
                    i =>
                        matches.add(i)
                );

            }


            run = [];

            continue;

        }


        if (
            run.length === 0
        ) {

            run.push(index);

        } else {

            const previous =
                board[
                    run[
                        run.length - 1
                    ]
                ];


            if (
                previous &&
                previous.id ===
                fruit.id
            ) {

                run.push(index);

            } else {

                if (
                    run.length >= 3
                ) {

                    run.forEach(
                        i =>
                            matches.add(i)
                    );

                }


                run = [index];

            }

        }

    }


    if (
        run.length >= 3
    ) {

        run.forEach(
            i =>
                matches.add(i)
        );

    }

}


/*
    Vertikale Matches.
*/

for (
    let col = 0;
    col < COLS;
    col++
) {

    let run = [];


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        const index =
            row * COLS + col;


        const fruit =
            board[index];


        if (
            !fruit ||
            stoneCells.has(index)
        ) {

            if (
                run.length >= 3
            ) {

                run.forEach(
                    i =>
                        matches.add(i)
                );

            }


            run = [];

            continue;

        }


        if (
            run.length === 0
        ) {

            run.push(index);

        } else {

            const previous =
                board[
                    run[
                        run.length - 1
                    ]
                ];


            if (
                previous &&
                previous.id ===
                fruit.id
            ) {

                run.push(index);

            } else {

                if (
                    run.length >= 3
                ) {

                    run.forEach(
                        i =>
                            matches.add(i)
                    );

                }


                run = [index];

            }

        }

    }


    if (
        run.length >= 3
    ) {

        run.forEach(
            i =>
                matches.add(i)
        );

    }

}


return [
    ...matches
];

}

/* =========================================================
MATCHES AUFLÖSEN
========================================================= */

async function resolveMatches() {

let chain = 0;


while (true) {

    const matches =
        findMatches();


    if (
        matches.length === 0
    ) {

        break;

    }


    chain++;


    combo =
        chain;


    /*
        Punkte.
    */

    const gainedScore =
        matches.length *
        10 *
        chain;


    score +=
        gainedScore;


    /*
        Steine in der Nähe zerstören.
    */

    destroyNearbyStones(
        matches
    );


    /*
        Animation.
    */

    animateMatches(
        matches
    );


    await delay(550);


    /*
        Früchte entfernen.
    */

    matches.forEach(
        index => {

            board[index] =
                null;

        }
    );


    renderBoard();


    await delay(120);


    /*
        Neue Früchte nachfüllen.
    */

    refillBoard();


    renderBoard();


    await delay(450);


    showComboMessage(
        chain,
        gainedScore
    );

}


/*
    Wenn etwas versteinert wurde,
    bekommt der Spieler ein kleines
    Feedback.
*/

if (
    combo >= 2
) {

    addStaronSafe(
        combo * 2
    );

}


updateUI();

}

/* =========================================================
MATCH ANIMATION
========================================================= */

function animateMatches(
matches
) {

matches.forEach(
    index => {

        const cell =
            document.querySelector(
                `.fruity-cell[data-index="${index}"]`
            );


        if (cell) {

            cell.classList.add(
                "matching"
            );

        }

    }
);

}

/* =========================================================
STEINE IN DER NÄHE ZERSTÖREN
========================================================= */

function destroyNearbyStones(
matches
) {

const stonesToDestroy =
    new Set();


matches.forEach(
    index => {

        const neighbours =
            getNeighbours(
                index
            );


        neighbours.forEach(
            neighbour => {

                if (
                    stoneCells.has(
                        neighbour
                    )
                ) {

                    stonesToDestroy.add(
                        neighbour
                    );

                }

            }
        );

    }
);


stonesToDestroy.forEach(
    stone => {

        const cell =
            document.querySelector(
                `.fruity-cell[data-index="${stone}"]`
            );


        if (cell) {

            cell.classList.add(
                "stone-breaking"
            );

        }

    }
);


if (
    stonesToDestroy.size > 0
) {

    setTimeout(
        () => {

            stonesToDestroy.forEach(
                stone => {

                    stoneCells.delete(
                        stone
                    );

                }
            );


            renderBoard();


            updateStoneMessage();

        },
        450
    );

}

}

/* =========================================================
NACHBARN
========================================================= */

function getNeighbours(index) {

const row =
    Math.floor(
        index / COLS
    );

const col =
    index % COLS;


const result = [];


if (
    row > 0
) {

    result.push(
        index - COLS
    );

}


if (
    row < ROWS - 1
) {

    result.push(
        index + COLS
    );

}


if (
    col > 0
) {

    result.push(
        index - 1
    );

}


if (
    col < COLS - 1
) {

    result.push(
        index + 1
    );

}


return result.filter(
    i =>
        board[i] !== null
);

}

/* =========================================================
FRÜCHTE NACHFÜLLEN
========================================================= */

function refillBoard() {

for (
    let col = 0;
    col < COLS;
    col++
) {

    const column = [];


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        const index =
            row * COLS + col;


        if (
            board[index]
        ) {

            column.push(
                board[index]
            );

        }

    }


    while (
        column.length < ROWS
    ) {

        column.unshift(
            randomFruit()
        );

    }


    for (
        let row = 0;
        row < ROWS;
        row++
    ) {

        const index =
            row * COLS + col;


        /*
            Inaktive Felder bleiben leer.
        */

        if (
            board[index] === null &&
            !isPotentialActiveCell(index)
        ) {

            continue;

        }


        board[index] =
            column[row];

    }

}


preventStartingMatches();

}

/* =========================================================
AKTIVES FELD
========================================================= */

function isPotentialActiveCell(
index
) {

return board[index] !== null;

}

/* =========================================================
COMBO
========================================================= */

function showComboMessage(
chain,
points
) {

const element =
    document.getElementById(
        "comboMessage"
    );


if (!element) {
    return;
}


if (
    chain <= 1
) {

    element.textContent =
        `+${points} SCORE`;

} else {

    element.textContent =
        `COMBO x${chain}! +${points}`;

}


element.classList.remove(
    "show"
);


void element.offsetWidth;


element.classList.add(
    "show"
);

}

/* =========================================================
VOIDVORKA STATUS
========================================================= */

function updateVoidvorka() {

const image =
    document.getElementById(
        "fruitywayVoidvorka"
    );


const status =
    document.getElementById(
        "voidvorkaStatus"
    );


const message =
    document.getElementById(
        "voidvorkaMessage"
    );


const container =
    document.getElementById(
        "voidvorkaContainer"
    );


if (
    !image ||
    !status ||
    !message
) {

    return;

}


if (
    currentRound <= 3
) {

    voidvorkaState =
        "calm";


    image.src =
        "https://i.postimg.cc/Jz4cyXHL/voidvruhig.png";


    image.alt =
        "Voidvorka ruhig";


    status.textContent =
        "RUHIG";


    status.className =
        "voidvorka-status calm";


    message.textContent =
        "Die Voidvorka beobachtet dich ruhig...";


    if (container) {

        container.classList.remove(
            "angry"
        );

    }


    return;

}


if (
    voidvorkaSleepingRounds > 0
) {

    voidvorkaState =
        "sleeping";


    image.src =
        "https://i.postimg.cc/mkj1Rdwt/voidvrsleep.png";


    image.alt =
        "Voidvorka eingeschläfert";


    status.textContent =
        `SCHLÄFT (${voidvorkaSleepingRounds})`;


    status.className =
        "voidvorka-status sleeping";


    message.textContent =
        "Die Voidvorka schläft friedlich. Keine Versteinerung.";


    if (container) {

        container.classList.remove(
            "angry"
        );

    }


    return;

}


voidvorkaState =
    "angry";


image.src =
    "https://i.postimg.cc/tJnM6rqY/voidvrmad.png";


image.alt =
    "Voidvorka wütend";


status.textContent =
    "WÜTEND";


status.className =
    "voidvorka-status angry";


message.textContent =
    "Die Voidvorka ist erwacht! Sie versteinert Früchte!";


if (container) {

    container.classList.add(
        "angry"
    );

}

}

/* =========================================================
VOIDVORKA ZUG
========================================================= */

async function voidvorkaTurn() {

/*
    Erste drei Runden:
    nichts passiert.
*/

if (
    currentRound <= 3
) {

    return;

}


/*
    Schlafen.
*/

if (
    voidvorkaSleepingRounds > 0
) {

    voidvorkaSleepingRounds--;

    updateVoidvorka();

    return;

}


/*
    1-3 Früchte versteinern.
*/

const amount =
    randomNumber(
        1,
        3
    );


const possibleCells =
    board
        .map(
            (fruit, index) =>
                fruit &&
                !stoneCells.has(index)
                    ? index
                    : null
        )
        .filter(
            index =>
                index !== null
        );


shuffleArray(
    possibleCells
);


let placed = 0;


for (
    const index of possibleCells
) {

    if (
        placed >= amount
    ) {

        break;

    }


    stoneCells.add(
        index
    );


    placed++;

}


stonesPlacedThisRound =
    placed;


renderBoard();

updateStoneMessage();


if (
    placed > 0
) {

    showFruityNotification(
        `🪨 Voidvorka versteinert ${placed} Frucht${placed === 1 ? "" : "e"}!`
    );

}

}

/* =========================================================
STEIN-MELDUNG
========================================================= */

function updateStoneMessage() {

const element =
    document.getElementById(
        "stoneMessage"
    );


if (!element) {
    return;
}


const amount =
    stoneCells.size;


if (
    amount === 0
) {

    element.textContent =
        "Keine Versteinerung.";

} else {

    element.textContent =
        `🪨 ${amount} versteinert${amount === 1 ? "" : "e"} Frucht${amount === 1 ? "" : "e"} auf dem Feld`;

}

}

/* =========================================================
SPIELFELD RESET
========================================================= */

async function resetBoard() {

if (
    isBusy
) {

    return;

}


if (
    !resetAvailable
) {

    showFruityNotification(
        "Der Reset wurde bereits benutzt!"
    );

    return;

}


resetAvailable =
    false;


showFruityNotification(
    "↻ Spielfeld wird neu gemischt..."
);


isBusy = true;


await delay(500);


/*
    Neues zufälliges Spielfeld,
    aber gleiche Runde.
*/

currentShape =
    randomShape();


stoneCells.clear();


board = [];


for (
    let i = 0;
    i < BOARD_SIZE;
    i++
) {

    board.push(
        randomFruit()
    );

}


preventStartingMatches();


renderBoard();


updateUI();


await delay(300);


isBusy = false;

}

/* =========================================================
ITEM INVENTAR
========================================================= */

function refreshInventory() {

const inventory =
    document.getElementById(
        "fruitywayInventory"
    );


if (!inventory) {
    return;
}


inventory.innerHTML =
    "";


/*
    Spielerobjekt kommt aus Script.js.
*/

if (
    typeof playerData ===
    "undefined"
) {

    return;

}


Object.entries(
    ITEMS
).forEach(
    ([key, item]) => {

        const count =
            playerData.inventory[key] ||
            0;


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "fruity-inventory-item";


        if (
            count <= 0
        ) {

            element.classList.add(
                "empty"
            );

        }


        element.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <span class="fruity-item-name">
                ${item.name}
            </span>

            <span class="fruity-item-count">
                ${count}
            </span>

        `;


        if (
            count > 0
        ) {

            element.addEventListener(
                "click",
                () =>
                    useFruityItem(key)
            );

        }


        inventory.appendChild(
            element
        );

    }
);

}

/* =========================================================
ITEM BENUTZEN
========================================================= */

async function useFruityItem(
itemName
) {

if (isBusy) {
    return;
}


if (
    !playerData.inventory[itemName] ||
    playerData.inventory[itemName] <= 0
) {

    showFruityNotification(
        "Du hast dieses Item nicht."
    );

    return;

}


if (
    itemName ===
    "planetenbeere"
) {

    openPlanetBerrySelector();

    return;

}


if (
    itemName ===
    "kosmosKokusnuss"
) {

    openCoconutDirectionSelector();

    return;

}


if (
    itemName ===
    "saturnpilz"
) {

    useSaturnMushroom();

    return;

}


if (
    itemName ===
    "galaxieLotus"
) {

    useGalaxyLotus();

    return;

}

}

/* =========================================================
PLANETENBEERE
========================================================= */

function openPlanetBerrySelector() {

const active =
    board
        .map(
            (fruit, index) =>
                fruit &&
                !stoneCells.has(index)
                    ? index
                    : null
        )
        .filter(
            index =>
                index !== null
        );


if (
    active.length === 0
) {

    showFruityNotification(
        "Es gibt keine auswählbaren Früchte."
    );

    return;

}


let html = `

    <h2>🪐 PLANETENBEERE</h2>

    <p>
        Wähle die Früchte aus,
        die entfernt werden sollen.
    </p>

    <div class="fruit-selection-list">

`;


active.forEach(
    index => {

        const fruit =
            board[index];


        html += `

            <button
                class="fruit-selection-button"
                data-fruit-index="${index}"
                onclick="togglePlanetFruit(${index})"
            >

                <img
                    src="${fruit.image}"
                    alt="${fruit.name}"
                >

                <span>
                    Feld ${index + 1}
                </span>

            </button>

        `;

    }
);


html += `

    </div>

    <br>

    <button
        class="pixel-button"
        onclick="confirmPlanetBerry()"
    >
        FRÜCHTE ENTFERNEN
    </button>

`;


openFruityModal(
    html
);


window.planetBerrySelection =
    [];

}

/* =========================================================
PLANETENBEERE AUSWAHL
========================================================= */

window.planetBerrySelection =
[];

function togglePlanetFruit(index) {

const position =
    window.planetBerrySelection
        .indexOf(index);


const button =
    document.querySelector(
        `.fruit-selection-button[data-fruit-index="${index}"]`
    );


if (
    position >= 0
) {

    window.planetBerrySelection.splice(
        position,
        1
    );


    if (button) {

        button.classList.remove(
            "selected"
        );

    }

} else {

    window.planetBerrySelection.push(
        index
    );


    if (button) {

        button.classList.add(
            "selected"
        );

    }

}

}

/* =========================================================
PLANETENBEERE BESTÄTIGEN
========================================================= */

async function confirmPlanetBerry() {

const selected =
    window.planetBerrySelection;


if (
    !selected ||
    selected.length === 0
) {

    showFruityNotification(
        "Wähle zuerst Früchte aus!"
    );

    return;

}


if (
    !useItemFromInventory(
        "planetenbeere"
    )
) {

    return;

}


closeFruityModal();


isBusy = true;


selected.forEach(
    index => {

        board[index] =
            null;

    }
);


await delay(200);


refillBoard();


renderBoard();


addStaronSafe(
    selected.length * 5
);


updateUI();


isBusy = false;

}

/* =========================================================
KOSMOS-KOKUSNUSS
========================================================= */

function openCoconutDirectionSelector() {

openFruityModal(`

    <h2>🥥 KOSMOS-KOKUSNUSS</h2>

    <p>
        Wähle eine Richtung.
        Die gesamte Reihe oder Spalte
        wird entfernt.
    </p>

    <div class="fruit-selection-list">

        <button
            class="pixel-button"
            onclick="useCoconut('left')"
        >
            ← LINKS
        </button>

        <button
            class="pixel-button"
            onclick="useCoconut('right')"
        >
            → RECHTS
        </button>

        <button
            class="pixel-button"
            onclick="useCoconut('up')"
        >
            ↑ OBEN
        </button>

        <button
            class="pixel-button"
            onclick="useCoconut('down')"
        >
            ↓ UNTEN
        </button>

    </div>

`);

}

/* =========================================================
KOKOSNUSS BENUTZEN
========================================================= */

async function useCoconut(
direction
) {

if (
    !useItemFromInventory(
        "kosmosKokusnuss"
    )
) {

    return;

}


closeFruityModal();


isBusy = true;


/*
    Zufällige Ausgangsposition.
*/

const valid =
    board
        .map(
            (fruit, index) =>
                fruit &&
                !stoneCells.has(index)
                    ? index
                    : null
        )
        .filter(
            index =>
                index !== null
        );


if (
    valid.length === 0
) {

    isBusy = false;

    return;

}


const start =
    valid[
        Math.floor(
            Math.random() *
            valid.length
        )
    ];


const row =
    Math.floor(
        start / COLS
    );


const col =
    start % COLS;


let targets = [];


if (
    direction === "left" ||
    direction === "right"
) {

    for (
        let c = 0;
        c < COLS;
        c++
    ) {

        const index =
            row * COLS + c;


        if (
            board[index]
        ) {

            targets.push(
                index
            );

        }

    }

} else {

    for (
        let r = 0;
        r < ROWS;
        r++
    ) {

        const index =
            r * COLS + col;


        if (
            board[index]
        ) {

            targets.push(
                index
            );

        }

    }

}


targets.forEach(
    index => {

        board[index] =
            null;

    }
);


renderBoard();


await delay(350);


refillBoard();


renderBoard();


addStaronSafe(
    targets.length * 3
);


isBusy = false;


updateUI();

}

/* =========================================================
SATURNPILZ
========================================================= */

async function useSaturnMushroom() {

if (
    !useItemFromInventory(
        "saturnpilz"
    )
) {

    return;

}


isBusy = true;


showFruityNotification(
    "🍄 Der Saturnpilz wirbelt das Feld durcheinander!"
);


const boardElement =
    document.getElementById(
        "fruitywayBoard"
    );


if (boardElement) {

    boardElement.style.transform =
        "rotate(4deg) scale(1.04)";

}


await delay(500);


/*
    Früchte komplett mischen.
*/

const fruits =
    board.filter(
        fruit =>
            fruit !== null
    );


shuffleArray(
    fruits
);


let counter = 0;


for (
    let i = 0;
    i < board.length;
    i++
) {

    if (
        board[i] !== null
    ) {

        board[i] =
            fruits[counter++];

    }

}


/*
    Steine bleiben an ihren Positionen.
*/

preventStartingMatches();


renderBoard();


if (boardElement) {

    boardElement.style.transform =
        "";

}


await delay(300);


isBusy = false;


updateUI();

}

/* =========================================================
GALAXIE LOTUS
========================================================= */

function useGalaxyLotus() {

if (
    !useItemFromInventory(
        "galaxieLotus"
    )
) {

    return;

}


/*
    Zwei komplette Runden Schlaf.
*/

voidvorkaSleepingRounds =
    2;


updateVoidvorka();


showFruityNotification(
    "🌸 Voidvorka schläft für 2 Runden!"
);


updateUI();

}

/* =========================================================
ITEM AUS INVENTAR
========================================================= */

function useItemFromInventory(
itemName
) {

if (
    !playerData.inventory[itemName] ||
    playerData.inventory[itemName] <= 0
) {

    return false;

}


playerData.inventory[itemName]--;


if (
    typeof savePlayerData ===
    "function"
) {

    savePlayerData();

}


refreshInventory();


return true;

}

/* =========================================================
SHOP ÖFFNEN
========================================================= */

function openFruityShop() {

let html = `

    <h2>★ FRUITYWAY ITEM SHOP ★</h2>

    <p>
        Deine STARON:
        <strong>
            ${playerData.staron}
        </strong>
        ★
    </p>

    <div class="fruity-shop-list">

`;


const prices = {

    planetenbeere: 50,

    kosmosKokusnuss: 75,

    saturnpilz: 100,

    galaxieLotus: 125

};


Object.entries(
    ITEMS
).forEach(
    ([key, item]) => {

        html += `

            <div class="fruity-shop-entry">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        ${item.description}
                    </small>

                </div>

                <button
                    class="pixel-button"
                    onclick="buyFruityItem('${key}', ${prices[key]})"
                >
                    ${prices[key]} ★
                </button>

            </div>

        `;

    }
);


html += `

    </div>

`;


openFruityModal(
    html
);

}

/* =========================================================
SHOP ITEM KAUFEN
========================================================= */

function buyFruityItem(
itemName,
price
) {

if (
    playerData.staron <
    price
) {

    showFruityNotification(
        "Nicht genug STARON!"
    );

    return;

}


playerData.staron -=
    price;


playerData.inventory[itemName] =
    (playerData.inventory[itemName] || 0) +
    1;


if (
    typeof savePlayerData ===
    "function"
) {

    savePlayerData();

}


refreshInventory();


openFruityShop();


showFruityNotification(
    "★ Item gekauft!"
);

}

/* =========================================================
RUNDENENDE
========================================================= */

function finishRound() {

isBusy = true;


/*
    Rundenbonus.
*/

const reward =
    25 +
    currentRound * 10;


score +=
    reward;


addStaronSafe(
    reward
);


/*
    Highscore.
*/

if (
    typeof playerData !==
    "undefined"
) {

    if (
        score >
        playerData.highScore
    ) {

        playerData.highScore =
            score;

    }


    playerData.fruitywayRounds =
        currentRound;


    if (
        typeof savePlayerData ===
        "function"
    ) {

        savePlayerData();

    }

}


updateUI();


/*
    Alle 5 Runden:
    kostenloses Item.
*/

if (
    currentRound % 5 === 0
) {

    setTimeout(
        () => {

            giveFruitywayFreeItem();

        },
        700
    );

    return;

}


showRoundComplete(
    reward
);

}

/* =========================================================
RUNDENBELohnung
========================================================= */

function showRoundComplete(
reward
) {

openFruityModal(`

    <div class="round-complete">

        <h2>
            ★ RUNDE ${currentRound}
            GESCHAFFT! ★
        </h2>

        <div class="big-reward">
            +${reward} ★
        </div>

        <p class="round-message">
            Du erhältst STARON als
            Belohnung.
        </p>

        <button
            class="pixel-button"
            onclick="nextFruityRound()"
        >
            NÄCHSTE RUNDE
        </button>

    </div>

`);

}

/* =========================================================
NÄCHSTE RUNDE
========================================================= */

function nextFruityRound() {

closeFruityModal();


currentRound++;


/*
    Falls Lotus aktiv war,
    wird der Schlaf erst bei
    Voidvorkas Zug heruntergezählt.
*/

startRound();

}

/* =========================================================
GRATIS ITEM
========================================================= */

function giveFruitywayFreeItem() {

openFruityModal(`

    <div class="round-complete">

        <h2>
            ★ GRATIS ITEM ★
        </h2>

        <p>
            Du hast Runde ${currentRound}
            erreicht!
        </p>

        <p>
            Wähle ein Item:
        </p>

        <div class="fruit-selection-list">

            <button
                class="pixel-button"
                onclick="claimFruitywayFreeItem('planetenbeere')"
            >
                🪐
                PLANETENBEERE
            </button>

            <button
                class="pixel-button"
                onclick="claimFruitywayFreeItem('kosmosKokusnuss')"
            >
                🥥
                KOSMOS-KOKUSNUSS
            </button>

            <button
                class="pixel-button"
                onclick="claimFruitywayFreeItem('saturnpilz')"
            >
                🍄
                SATURNPILZ
            </button>

            <button
                class="pixel-button"
                onclick="claimFruitywayFreeItem('galaxieLotus')"
            >
                🌸
                GALAXIE LOTUS
            </button>

        </div>

    </div>

`);

}

/* =========================================================
GRATIS ITEM ANNEHMEN
========================================================= */

function claimFruitywayFreeItem(
itemName
) {

playerData.inventory[itemName] =
    (playerData.inventory[itemName] || 0) +
    1;


if (
    typeof savePlayerData ===
    "function"
) {

    savePlayerData();

}


refreshInventory();


closeFruityModal();


/*
    Nach der Belohnung geht es
    direkt zur nächsten Runde.
*/

currentRound++;


startRound();


showFruityNotification(
    "★ Gratis-Item erhalten!"
);

}

/* =========================================================
UI AKTUALISIEREN
========================================================= */

function updateUI() {

const round =
    document.getElementById(
        "fruitywayRound"
    );


const moves =
    document.getElementById(
        "fruitywayMoves"
    );


const scoreElement =
    document.getElementById(
        "fruitywayScore"
    );


const highScore =
    document.getElementById(
        "fruitywayHighScore"
    );


const comboElement =
    document.getElementById(
        "fruitywayCombo"
    );


const shape =
    document.getElementById(
        "fruitywayShape"
    );


const staron =
    document.getElementById(
        "fruitywayStaron"
    );


const reward =
    document.getElementById(
        "fruitywayRoundReward"
    );


const playerName =
    document.getElementById(
        "fruitywayPlayerName"
    );


if (round) {

    round.textContent =
        currentRound;

}


if (moves) {

    moves.textContent =
        movesLeft;

}


if (scoreElement) {

    scoreElement.textContent =
        score;

}


if (highScore) {

    highScore.textContent =
        playerData.highScore;

}


if (comboElement) {

    comboElement.textContent =
        combo;

}


if (shape) {

    shape.textContent =
        currentShape
            .toUpperCase();

}


if (staron) {

    staron.textContent =
        playerData.staron;

}


if (reward) {

    reward.textContent =
        `+${25 + currentRound * 10} ★`;

}


if (playerName) {

    playerName.textContent =
        (
            playerData.username ||
            "Gast"
        ).toUpperCase();

}


refreshInventory();


updateStoneMessage();

}

/* =========================================================
STARON SICHER HINZUFÜGEN
========================================================= */

function addStaronSafe(
amount
) {

if (
    typeof addStaron ===
    "function"
) {

    addStaron(
        amount
    );

    return;

}


if (
    typeof playerData !==
    "undefined"
) {

    playerData.staron +=
        amount;

}

}

/* =========================================================
FRUITY MODAL
========================================================= */

function openFruityModal(
html
) {

const modal =
    document.getElementById(
        "fruitywayModal"
    );


const content =
    document.getElementById(
        "fruitywayModalContent"
    );


if (
    !modal ||
    !content
) {

    return;

}


content.innerHTML =
    html;


modal.classList.remove(
    "hidden"
);


modal.setAttribute(
    "aria-hidden",
    "false"
);

}

/* =========================================================
MODAL SCHLIESSEN
========================================================= */

function closeFruityModal() {

const modal =
    document.getElementById(
        "fruitywayModal"
    );


if (!modal) {
    return;
}


modal.classList.add(
    "hidden"
);


modal.setAttribute(
    "aria-hidden",
    "true"
);

}

/* =========================================================
NOTIFICATION
========================================================= */

function showFruityNotification(
message
) {

if (
    typeof showNotification ===
    "function"
) {

    showNotification(
        message
    );

    return;

}


alert(
    message
);

}

/* =========================================================
ARRAY MISCHEN
========================================================= */

function shuffleArray(
array
) {

for (
    let i =
        array.length - 1;
    i > 0;
    i--
) {

    const j =
        Math.floor(
            Math.random() *
            (i + 1)
        );


    [
        array[i],
        array[j]
    ] = [
        array[j],
        array[i]
    ];

}


return array;

}

/* =========================================================
DELAY
========================================================= */

function delay(
milliseconds
) {

return new Promise(
    resolve =>
        setTimeout(
            resolve,
            milliseconds
        )
);

}

/* =========================================================
ZUR ARCADE
========================================================= */

function goBackToArcade() {

window.location.href =
    "../../Index.html";

}

/* =========================================================
DOM READY
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

    /*
        Start.
    */

    startGame();


    /*
        Zurück.
    */

    const back =
        document.getElementById(
            "backToArcade"
        );


    if (back) {

        back.addEventListener(
            "click",
            goBackToArcade
        );

    }


    /*
        Reset.
    */

    const reset =
        document.getElementById(
            "fruitywayReset"
        );


    if (reset) {

        reset.addEventListener(
            "click",
            resetBoard
        );

    }


    /*
        Shop.
    */

    const shop =
        document.getElementById(
            "fruitywayShop"
        );


    if (shop) {

        shop.addEventListener(
            "click",
            openFruityShop
        );

    }


    /*
        Modal schließen.
    */

    const close =
        document.getElementById(
            "fruitywayModalClose"
        );


    if (close) {

        close.addEventListener(
            "click",
            closeFruityModal
        );

    }


    /*
        Modal Hintergrund.
    */

    const modal =
        document.getElementById(
            "fruitywayModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modal
                ) {

                    closeFruityModal();

                }

            }
        );

    }

}

);

/* =========================================================
GLOBALE FUNKTIONEN
========================================================= */

window.refreshInventory =
refreshInventory;

window.resetBoard =
resetBoard;

window.openFruityShop =
openFruityShop;

window.buyFruityItem =
buyFruityItem;

window.togglePlanetFruit =
togglePlanetFruit;

window.confirmPlanetBerry =
confirmPlanetBerry;

window.useCoconut =
useCoconut;

window.useSaturnMushroom =
useSaturnMushroom;

window.useGalaxyLotus =
useGalaxyLotus;

window.nextFruityRound =
nextFruityRound;

window.claimFruitywayFreeItem =
claimFruitywayFreeItem;

window.closeFruityModal =
closeFruityModal;

/* =========================================================
ENDE FRUITYWAY
========================================================= */
