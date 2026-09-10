/* =========================================================
FRUITYWAY
SPIEL-SPEZIFISCHES DESIGN
========================================================= */

/* =========================================================
FRUITYWAY GRUNDLAYOUT
========================================================= */

.fruityway-game {
min-height: 100vh;

padding: 12px;

position: relative;

overflow: hidden;

background:
    radial-gradient(
        circle at 50% 45%,
        #32114c 0%,
        #160922 42%,
        #05030a 100%
    );

}

/* =========================================================
HEADER
========================================================= */

.fruityway-header {

position: relative;

z-index: 5;

min-height: 72px;

display: grid;

grid-template-columns:
    180px
    1fr
    180px;

align-items: center;

gap: 15px;

padding: 10px 15px;

margin-bottom: 15px;

background:
    linear-gradient(
        90deg,
        #10071b,
        #241035,
        #10071b
    );

border: 3px solid #00eaff;

box-shadow:
    0 0 15px rgba(0,234,255,.7),
    inset 0 0 20px rgba(0,234,255,.1);

}

/* =========================================================
ZURÜCK BUTTON
========================================================= */

.back-button {

justify-self: start;

border-color: #00eaff;

color: #00eaff;

}

/* =========================================================
LOGO
========================================================= */

.fruityway-logo {

display: flex;

align-items: center;

justify-content: center;

gap: 15px;

text-align: center;

}

.fruityway-logo h1 {

font-size:
    clamp(
        25px,
        4vw,
        48px
    );

color: #ffe600;

letter-spacing: 4px;

text-shadow:
    3px 3px 0 #ff00aa,
    0 0 12px #ffe600,
    0 0 25px #ff00aa;

animation:
    fruityLogoPulse
    1.5s
    ease-in-out
    infinite
    alternate;

}

@keyframes fruityLogoPulse {

from {
    transform: scale(1);
}

to {
    transform: scale(1.025);
}

}

.logo-star {

color: #ff00aa;

font-size: 25px;

text-shadow:
    0 0 10px #ff00aa;

}

/* =========================================================
STARON
========================================================= */

.fruityway-staron {

justify-self: end;

display: flex;

align-items: center;

gap: 7px;

color: #ffe600;

text-shadow:
    0 0 8px #ffe600;

white-space: nowrap;

}

.fruityway-staron > span {

font-size: 22px;

}

.fruityway-staron strong {

font-size: 20px;

}

.fruityway-staron small {

font-size: 9px;

}

/* =========================================================
HAUPTLAYOUT
========================================================= */

.fruityway-layout {

position: relative;

z-index: 3;

width: min(
    1500px,
    100%
);

margin: auto;

display: grid;

grid-template-columns:
    185px
    minmax(
        450px,
        1fr
    )
    240px;

gap: 18px;

align-items: start;

}

/* =========================================================
LINKE SEITE
========================================================= */

.fruityway-left-panel {

padding: 12px;

background:
    linear-gradient(
        180deg,
        #170a25,
        #0b0612
    );

border: 3px solid #ff00aa;

box-shadow:
    0 0 15px rgba(255,0,170,.45);

}

.fruit-stat {

padding: 10px;

margin-bottom: 9px;

text-align: center;

background:
    rgba(
        255,
        255,
        255,
        .025
    );

border: 2px solid #503c5e;

}

.fruit-stat span {

display: block;

color: #9e8daa;

font-size: 9px;

letter-spacing: 1px;

margin-bottom: 5px;

}

.fruit-stat strong {

display: block;

color: #00eaff;

font-size: 24px;

text-shadow:
    0 0 8px #00eaff;

}

.moves-stat strong {

color: #ffe600;

text-shadow:
    0 0 8px #ffe600;

}

.board-shape-stat strong {

font-size: 13px;

color: #ff00aa;

text-shadow:
    0 0 7px #ff00aa;

}

.reset-board-button,
.item-shop-button {

width: 100%;

margin-top: 8px;

}

.reset-board-button {

border-color: #00eaff;

color: #00eaff;

}

.reset-board-button small {

display: block;

margin-top: 4px;

font-size: 8px;

color: #777;

}

.item-shop-button {

border-color: #ffe600;

color: #ffe600;

}

/* =========================================================
SPIELFELD-BEREICH
========================================================= */

.fruityway-center {

min-width: 0;

display: flex;

flex-direction: column;

align-items: center;

}

.match-instruction {

margin-bottom: 10px;

color: #ffe600;

font-size: 13px;

font-weight: bold;

letter-spacing: 2px;

text-align: center;

text-shadow:
    0 0 8px #ffe600;

}

.match-instruction span {

color: #ff00aa;

margin: 0 5px;

}

/* =========================================================
COMBO TEXT
========================================================= */

.combo-message {

height: 30px;

margin-bottom: 3px;

color: #00ff66;

font-size: 18px;

font-weight: bold;

text-align: center;

text-shadow:
    0 0 10px #00ff66;

}

.combo-message.show {

animation:
    comboPop
    .6s
    ease-out;

}

@keyframes comboPop {

0% {

    opacity: 0;

    transform:
        scale(.4)
        translateY(10px);

}

50% {

    opacity: 1;

    transform:
        scale(1.3)
        translateY(0);

}

100% {

    opacity: 0;

    transform:
        scale(1);

}

}

/* =========================================================
SPIELFELD
========================================================= */

.fruityway-board {

position: relative;

width: min(
    680px,
    76vw
);

height: min(
    680px,
    76vw
);

padding: 12px;

display: grid;

grid-template-columns:
    repeat(
        10,
        1fr
    );

grid-template-rows:
    repeat(
        5,
        1fr
    );

gap: 5px;

background:
    radial-gradient(
        circle,
        #190b29,
        #07030c
    );

border: 5px solid #00eaff;

box-shadow:
    0 0 15px #00eaff,
    0 0 45px rgba(0,234,255,.3),
    inset 0 0 35px rgba(0,234,255,.1);

transition:
    clip-path .5s ease,
    border-radius .5s ease;

}

/* =========================================================
SPIELFELD-FORMEN
========================================================= */

.fruityway-board.shape-rectangle {

clip-path: none;

border-radius: 8px;

}

.fruityway-board.shape-square {

border-radius: 8px;

}

.fruityway-board.shape-octagon {

clip-path:
    polygon(
        8% 0%,
        92% 0%,
        100% 15%,
        100% 85%,
        92% 100%,
        8% 100%,
        0% 85%,
        0% 15%
    );

}

.fruityway-board.shape-star {

clip-path:
    polygon(
        50% 0%,
        61% 34%,
        98% 35%,
        68% 55%,
        79% 100%,
        50% 72%,
        21% 100%,
        32% 55%,
        2% 35%,
        39% 34%
    );

}

.fruityway-board.shape-heart {

clip-path:
    path(
        "M50 95 C43 88 5 63 5 30 C5 5 35 0 50 22 C65 0 95 5 95 30 C95 63 57 88 50 95Z"
    );

}

.fruityway-board.shape-triangle {

clip-path:
    polygon(
        50% 0%,
        100% 100%,
        0% 100%
    );

}

/* =========================================================
BOARD CELLS
========================================================= */

.fruity-cell {

position: relative;

min-width: 0;

min-height: 0;

display: flex;

align-items: center;

justify-content: center;

overflow: visible;

background:
    rgba(
        255,
        255,
        255,
        .035
    );

border:
    2px solid
    rgba(
        255,
        255,
        255,
        .08
    );

cursor: pointer;

user-select: none;

transition:
    transform .12s ease,
    background .12s ease,
    border-color .12s ease,
    filter .12s ease;

}

/* Zellen außerhalb der Form */

.fruity-cell.inactive {

visibility: hidden;

pointer-events: none;

}

/* Hover */

.fruity-cell:not(.inactive):hover {

transform:
    scale(1.08);

border-color:
    rgba(
        0,
        234,
        255,
        .8
    );

background:
    rgba(
        0,
        234,
        255,
        .12
    );

z-index: 10;

}

/* Auswahl */

.fruity-cell.selected {

transform:
    scale(1.12);

border-color: #ffe600;

background:
    rgba(
        255,
        230,
        0,
        .12
    );

box-shadow:
    0 0 12px #ffe600;

z-index: 20;

}

/* =========================================================
FRUCHT
========================================================= */

.fruity-cell img {

width: 85%;

height: 85%;

object-fit: contain;

user-select: none;

pointer-events: none;

filter:
    drop-shadow(
        0 2px 2px
        rgba(
            0,
            0,
            0,
            .7
        )
    );

transition:
    transform .12s ease;

}

.fruity-cell:hover img {

transform:
    scale(1.08);

}

/* =========================================================
VERSTEINERTE FRUCHT
========================================================= */

.fruity-cell.stoned {

cursor:
    not-allowed;

background:
    rgba(
        70,
        70,
        75,
        .25
    );

}

.fruity-cell.stoned img {

filter:
    grayscale(1)
    brightness(.55)
    contrast(1.2);

}

.stone-overlay {

position: absolute;

inset: 0;

z-index: 5;

display: flex;

align-items: center;

justify-content: center;

font-size:
    clamp(
        18px,
        3vw,
        35px
    );

background:
    rgba(
        40,
        40,
        45,
        .38
    );

text-shadow:
    0 2px 3px #000;

pointer-events: none;

}

/* =========================================================
STEIN WIRD ZERSTÖRT
========================================================= */

.fruity-cell.stone-breaking {

animation:
    stoneBreak
    .5s
    ease-out
    forwards;

}

@keyframes stoneBreak {

0% {

    transform:
        scale(1);

    filter:
        grayscale(1);

}

45% {

    transform:
        scale(1.2)
        rotate(8deg);

    filter:
        grayscale(0)
        brightness(1.4);

}

100% {

    transform:
        scale(0)
        rotate(25deg);

    opacity: 0;

}

}

/* =========================================================
MATCH ANIMATION
========================================================= */

.fruity-cell.matching {

z-index: 30;

animation:
    fruitMatch
    .55s
    ease-in-out
    forwards;

}

@keyframes fruitMatch {

0% {

    opacity: 1;

    transform:
        scale(1)
        rotate(0deg);

}

35% {

    opacity: 1;

    transform:
        scale(1.25)
        rotate(-8deg);

}

65% {

    transform:
        scale(1.4)
        rotate(8deg);

    filter:
        brightness(1.8);

}

100% {

    opacity: 0;

    transform:
        scale(.05)
        rotate(30deg);

}

}

/* =========================================================
NEUE FRUCHT
========================================================= */

.fruity-cell.falling {

animation:
    fruitFall
    .4s
    cubic-bezier(
        .2,
        .8,
        .2,
        1
    );

}

@keyframes fruitFall {

0% {

    opacity: 0;

    transform:
        translateY(-80px)
        scale(.5);

}

70% {

    transform:
        translateY(7px)
        scale(1.05);

}

100% {

    opacity: 1;

    transform:
        translateY(0)
        scale(1);

}

}

/* =========================================================
SPECIAL ITEM EFFECT
========================================================= */

.fruity-cell.item-highlight {

animation:
    itemHighlight
    .8s
    infinite
    alternate;

}

@keyframes itemHighlight {

from {

    box-shadow:
        0 0 5px #ffe600;

    border-color:
        #ffe600;

}

to {

    box-shadow:
        0 0 20px #ff00aa;

    border-color:
        #ff00aa;

}

}

/* =========================================================
RUNDE REWARD
========================================================= */

.round-reward-box {

display: flex;

align-items: center;

gap: 12px;

margin-top: 12px;

padding: 8px 16px;

border: 2px solid #ffe600;

background:
    rgba(
        255,
        230,
        0,
        .05
    );

color: #aaa;

font-size: 11px;

}

.round-reward-box strong {

color: #ffe600;

font-size: 16px;

text-shadow:
    0 0 8px #ffe600;

}

/* =========================================================
RECHTE SEITE
========================================================= */

.fruityway-right-panel {

padding: 12px;

background:
    linear-gradient(
        180deg,
        #170a25,
        #0b0612
    );

border: 3px solid #ff00aa;

box-shadow:
    0 0 15px rgba(255,0,170,.45);

}

/* =========================================================
VOIDVORKA
========================================================= */

.voidvorka-title {

text-align: center;

margin-bottom: 10px;

color: #ff00aa;

font-weight: bold;

font-size: 17px;

letter-spacing: 2px;

text-shadow:
    0 0 10px #ff00aa;

}

.voidvorka-title span {

color: #ffe600;

}

.voidvorka-container {

min-height: 190px;

display: flex;

align-items: center;

justify-content: center;

padding: 8px;

background:
    radial-gradient(
        circle,
        #2a123b,
        #07030b
    );

border: 3px solid #503c5e;

}

.voidvorka-container img {

width: 100%;

height: 180px;

object-fit: contain;

transition:
    transform .3s ease,
    filter .3s ease;

}

.voidvorka-container.angry img {

animation:
    voidAngry
    .7s
    ease-in-out
    infinite
    alternate;

}

@keyframes voidAngry {

from {

    transform:
        translateX(-3px)
        rotate(-1deg)
        scale(1);

}

to {

    transform:
        translateX(3px)
        rotate(1deg)
        scale(1.04);

}

}

/* =========================================================
VOIDVORKA STATUS
========================================================= */

.voidvorka-status {

margin-top: 8px;

padding: 8px;

text-align: center;

font-weight: bold;

font-size: 12px;

border: 2px solid;

}

.voidvorka-status.calm {

color: #00ff66;

border-color: #00ff66;

background:
    rgba(
        0,
        255,
        102,
        .05
    );

text-shadow:
    0 0 7px #00ff66;

}

.voidvorka-status.angry {

color: #ff3333;

border-color: #ff3333;

background:
    rgba(
        255,
        40,
        40,
        .08
    );

text-shadow:
    0 0 8px #ff3333;

animation:
    angryStatus
    .6s
    infinite
    alternate;

}

.voidvorka-status.sleeping {

color: #9b7cff;

border-color: #9b7cff;

background:
    rgba(
        155,
        124,
        255,
        .08
    );

text-shadow:
    0 0 8px #9b7cff;

}

@keyframes angryStatus {

from {
    opacity: .65;
}

to {
    opacity: 1;
}

}

/* =========================================================
VOIDVORKA TEXT
========================================================= */

.voidvorka-message {

min-height: 50px;

padding: 9px;

margin-top: 8px;

color: #ddd;

font-size: 10px;

line-height: 1.5;

text-align: center;

border:
    2px solid
    #3f304a;

}

.stone-message {

margin-top: 7px;

padding: 8px;

text-align: center;

font-size: 9px;

color: #aaa;

border:
    2px solid
    #453b4b;

}

/* =========================================================
INVENTAR
========================================================= */

.inventory-heading {

margin-top: 18px;

margin-bottom: 8px;

text-align: center;

color: #ffe600;

font-size: 12px;

letter-spacing: 1px;

text-shadow:
    0 0 8px #ffe600;

}

.fruityway-inventory {

display: grid;

grid-template-columns:
    repeat(
        2,
        1fr
    );

gap: 6px;

}

.fruity-inventory-item {

position: relative;

min-height: 67px;

padding: 4px;

display: flex;

flex-direction: column;

align-items: center;

justify-content: center;

border:
    2px solid
    #493a54;

background:
    #110a18;

cursor: pointer;

transition:
    transform .15s,
    border-color .15s,
    box-shadow .15s;

}

.fruity-inventory-item:hover {

transform:
    translateY(-2px);

border-color:
    #00eaff;

box-shadow:
    0 0 8px #00eaff;

}

.fruity-inventory-item.empty {

opacity: .35;

cursor:
    not-allowed;

}

.fruity-inventory-item img {

width: 42px;

height: 42px;

object-fit: contain;

}

.fruity-item-name {

font-size: 7px;

color: #aaa;

text-align: center;

}

.fruity-item-count {

position: absolute;

right: 2px;

bottom: 2px;

min-width: 17px;

padding: 2px 4px;

color: #ffe600;

background:
    #000;

font-size: 9px;

text-align: center;

}

/* =========================================================
TIPP
========================================================= */

.fruityway-tip {

margin-top: 15px;

padding: 9px;

border:
    2px dashed
    #493a54;

font-size: 9px;

line-height: 1.45;

color: #999;

}

.fruityway-tip strong {

display: block;

margin-bottom: 5px;

color: #00eaff;

}

/* =========================================================
FOOTER
========================================================= */

.fruityway-footer {

position: relative;

z-index: 3;

width: min(
    1500px,
    100%
);

margin:
    12px
    auto
    0;

padding: 8px;

display: flex;

justify-content: space-between;

gap: 10px;

font-size: 8px;

color: #71607a;

border-top:
    1px solid
    #302439;

}

/* =========================================================
MODAL
========================================================= */

.fruityway-modal {

position: fixed;

inset: 0;

z-index: 5000;

display: flex;

align-items: center;

justify-content: center;

padding: 20px;

background:
    rgba(
        0,
        0,
        0,
        .82
    );

backdrop-filter:
    blur(5px);

}

.fruityway-modal-window {

position: relative;

width: min(
    650px,
    100%
);

max-height: 90vh;

overflow-y: auto;

padding: 25px;

background:
    linear-gradient(
        135deg,
        #28103d,
        #0d0716
    );

border:
    4px solid
    #ffe600;

box-shadow:
    0 0 25px #ffe600,
    0 0 60px
    rgba(
        255,
        230,
        0,
        .3
    );

}

.fruityway-modal-close {

position: absolute;

top: 8px;

right: 10px;

width: 35px;

height: 35px;

border:
    2px solid
    #ff00aa;

background:
    #17091f;

color:
    #ffffff;

font-size: 24px;

cursor: pointer;

}

.fruityway-modal-content {

padding-top: 10px;

}

.fruityway-modal-content h2 {

margin-bottom: 15px;

color: #ffe600;

text-shadow:
    0 0 10px #ffe600;

}

.fruityway-modal-content p {

margin-bottom: 12px;

color: #ddd;

font-size: 12px;

line-height: 1.6;

}

/* =========================================================
ITEM-AUSWAHL
========================================================= */

.fruit-selection-list {

display: grid;

grid-template-columns:
    repeat(
        auto-fit,
        minmax(
            100px,
            1fr
        )
    );

gap: 8px;

margin-top: 15px;

}

.fruit-selection-button {

min-height: 100px;

padding: 8px;

display: flex;

flex-direction: column;

align-items: center;

justify-content: center;

gap: 5px;

border:
    2px solid
    #493a54;

background:
    #110a18;

color: #fff;

cursor: pointer;

}

.fruit-selection-button:hover {

border-color:
    #ffe600;

box-shadow:
    0 0 10px #ffe600;

}

.fruit-selection-button.selected {

border-color:
    #00ff66;

box-shadow:
    0 0 12px #00ff66;

}

.fruit-selection-button img {

width: 50px;

height: 50px;

object-fit: contain;

}

/* =========================================================
SHOP
========================================================= */

.fruity-shop-list {

display: grid;

gap: 10px;

}

.fruity-shop-entry {

display: grid;

grid-template-columns:
    65px
    1fr
    auto;

align-items: center;

gap: 10px;

padding: 10px;

border:
    2px solid
    #493a54;

background:
    #110a18;

}

.fruity-shop-entry img {

width: 55px;

height: 55px;

object-fit: contain;

}

.fruity-shop-entry strong {

display: block;

color: #ffffff;

font-size: 11px;

}

.fruity-shop-entry small {

display: block;

margin-top: 4px;

color: #999;

font-size: 9px;

line-height: 1.4;

}

.fruity-shop-price {

color: #ffe600;

font-weight: bold;

}

/* =========================================================
RUNDE GEWONNEN
========================================================= */

.round-complete {

text-align: center;

}

.round-complete .big-reward {

margin: 15px 0;

color: #00ff66;

font-size: 28px;

font-weight: bold;

text-shadow:
    0 0 15px #00ff66;

}

.round-complete .round-message {

color: #aaa;

font-size: 11px;

}

/* =========================================================
RESPONSIVE
========================================================= */

@media (
max-width: 1100px
) {

.fruityway-layout {

    grid-template-columns:
        155px
        minmax(
            350px,
            1fr
        )
        200px;

    gap: 10px;

}


.fruityway-board {

    width:
        min(
            600px,
            68vw
        );

    height:
        min(
            600px,
            68vw
        );

}

}

@media (
max-width: 850px
) {

.fruityway-header {

    grid-template-columns:
        1fr;

    justify-items: center;

}


.back-button {

    justify-self: center;

}


.fruityway-staron {

    justify-self: center;

}


.fruityway-layout {

    grid-template-columns:
        1fr;

}


.fruityway-left-panel {

    display: grid;

    grid-template-columns:
        repeat(
            3,
            1fr
        );

    gap: 7px;

}


.fruit-stat {

    margin: 0;

}


.reset-board-button,
.item-shop-button {

    margin: 0;

}


.fruityway-board {

    width:
        min(
            90vw,
            680px
        );

    height:
        min(
            90vw,
            680px
        );

}


.fruityway-right-panel {

    display: grid;

    grid-template-columns:
        1fr
        1fr;

    gap: 10px;

}


.voidvorka-title {

    grid-column:
        1 / -1;

}


.inventory-heading {

    margin-top: 0;

}


.fruityway-tip {

    display: none;

}

}

@media (
max-width: 600px
) {

.fruityway-game {

    padding: 7px;

}


.fruityway-logo h1 {

    font-size: 26px;

    letter-spacing: 2px;

}


.logo-star {

    display: none;

}


.fruityway-left-panel {

    grid-template-columns:
        repeat(
            2,
            1fr
        );

}


.fruityway-board {

    width:
        94vw;

    height:
        94vw;

    padding: 6px;

    gap: 2px;

    border-width: 3px;

}


.match-instruction {

    font-size: 10px;

    letter-spacing: 1px;

}


.fruityway-right-panel {

    grid-template-columns:
        1fr;

}


.fruityway-footer {

    flex-direction:
        column;

    text-align:
        center;

}


.fruity-shop-entry {

    grid-template-columns:
        55px
        1fr;

}


.fruity-shop-entry button {

    grid-column:
        1 / -1;

}

}

/* =========================================================
ENDE
========================================================= */
