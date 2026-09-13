const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.getElementById('score');
const statusDisplay = document.getElementById('game-status');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const overlayText = document.getElementById('overlay-text');
const startBtn = document.getElementById('start-btn');

// Sprite laden
const playerImg = new Image();
playerImg.src = 'https://i.postimg.cc/GmxXK8VK/1789260875978.png';

// Spielvariablen
let gameRunning = false;
let score = 0;
let frameCount = 0;

// Spieler-Eigenschaften
const player = {
    x: 60,
    y: 200,
    width: 38,
    height: 38,
    gravity: 0.35,
    lift: -6.5,
    velocity: 0,
    hasShield: false
};

// Hindernisse & Sterne
let obstacles = [];
let stars = [];
let bgStars = [];

// Hintergrund-Sterne generieren
for (let i = 0; i < 50; i++) {
    bgStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function jump() {
    if (!gameRunning) return;
    player.velocity = player.lift;
}

// Steuerung
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameRunning && overlay.style.display !== 'none') {
            startGame();
        } else {
            jump();
        }
    }
});

canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!gameRunning && overlay.style.display !== 'none') {
        startGame();
    } else {
        jump();
    }
});

startBtn.addEventListener('click', startGame);

function startGame() {
    gameRunning = true;
    score = 0;
    frameCount = 0;
    player.y = 200;
    player.velocity = 0;
    player.hasShield = false;
    obstacles = [];
    stars = [];
    
    scoreDisplay.innerText = "0";
    statusDisplay.innerText = "Sammle Sterne für Schild-Schutz!";
    overlay.style.display = 'none';

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameRunning = false;
    overlayTitle.innerText = "GAME OVER";
    overlayText.innerText = `Erreichte Distanz: ${Math.floor(score)}m`;
    startBtn.innerText = "NOCHMAL";
    overlay.style.display = 'flex';
}

function spawnObstacle() {
    const gapHeight = 130;
    const minHeight = 40;
    const maxHeight = canvas.height - gapHeight - minHeight;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    const bottomY = topHeight + gapHeight;

    const isComet = Math.random() > 0.5;

    obstacles.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: bottomY,
        bottomHeight: canvas.height - bottomY,
        width: 45,
        type: isComet ? 'komet' : 'raumschiff',
        passed: false
    });

    // Chance auf Schild-Stern in der Lücke
    if (Math.random() < 0.4) {
        stars.push({
            x: canvas.width + 12,
            y: topHeight + gapHeight / 2 - 10,
            size: 20,
            collected: false
        });
    }
}

function update() {
    frameCount++;

    // Distanz-Punkte (pro Meter)
    score += 0.1;
    scoreDisplay.innerText = Math.floor(score);

    // Physik
    player.velocity += player.gravity;
    player.y += player.velocity;

    // Boden / Decken-Kollision
    if (player.y + player.height >= canvas.height || player.y <= 0) {
        if (player.hasShield) {
            player.hasShield = false;
            player.velocity = -4;
            statusDisplay.innerText = "Schild hat dich gerettet!";
        } else {
            gameOver();
            return;
        }
    }

    // Hintergrund-Parallax
    bgStars.forEach(s => {
        s.x -= s.speed;
        if (s.x < 0) s.x = canvas.width;
    });

    // Hindernisse bewegen & erzeugen
    if (frameCount % 100 === 0) {
        spawnObstacle();
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= 2.5;

        // Kollision mit Hindernis
        const hitTop = player.x + player.width > obs.x &&
                       player.x < obs.x + obs.width &&
                       player.y < obs.topHeight;

        const hitBottom = player.x + player.width > obs.x &&
                          player.x < obs.x + obs.width &&
                          player.y + player.height > obs.bottomY;

        if (hitTop || hitBottom) {
            if (player.hasShield) {
                player.hasShield = false;
                obstacles.splice(i, 1);
                statusDisplay.innerText = "Schild absorbiert Treffer!";
                continue;
            } else {
                gameOver();
                return;
            }
        }

        // Hindernis verlassen
        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
        }
    }

    // Sterne bewegen & einsammeln
    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.x -= 2.5;

        if (!star.collected &&
            player.x < star.x + star.size &&
            player.x + player.width > star.x &&
            player.y < star.y + star.size &&
            player.y + player.height > star.y) {
            
            star.collected = true;
            player.hasShield = true;
            statusDisplay.innerText = "SCHILD AKTIV!";
            stars.splice(i, 1);
        } else if (star.x + star.size < 0) {
            stars.splice(i, 1);
        }
    }
}

function draw() {
    // Canvas leeren
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Galaxie Sterne zeichnen
    ctx.fillStyle = "#ffffff";
    bgStars.forEach(s => {
        ctx.fillRect(s.x, s.y, s.size, s.size);
    });

    // Hindernisse zeichnen
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.type === 'raumschiff' ? '#ff0080' : '#ff9900';
        
        // Oberes Hindernis
        ctx.fillRect(obs.x, 0, obs.width, obs.topHeight);
        
        // Unteres Hindernis
        ctx.fillRect(obs.x, obs.bottomY, obs.width, obs.bottomHeight);

        // Retro Border auf Hindernissen
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(obs.x, 0, obs.width, obs.topHeight);
        ctx.strokeRect(obs.x, obs.bottomY, obs.width, obs.bottomHeight);
    });

    // Schild-Sterne zeichnen
    stars.forEach(star => {
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(star.x + star.size/2, star.y + star.size/2, star.size/2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
    });

    // Schild-Aura um Spieler zeichnen
    if (player.hasShield) {
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(player.x + player.width/2, player.y + player.height/2, player.width/2 + 6, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Spieler-Sprite zeichnen
    if (playerImg.complete) {
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
    } else {
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
}

function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

