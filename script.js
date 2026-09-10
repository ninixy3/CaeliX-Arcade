/* =========================================================
CAELIX ARCADE
GLOBAL SCRIPT
========================================================= */

/* =========================================================
SPIELERDATEN
========================================================= */

const defaultPlayerData = {
    username: "Gast",
    staron: 0,
    highScore: 0,
    fruitywayRounds: 0,
    inventory: {
        planetenbeere: 0,
        kosmosKokusnuss: 0,
        saturnpilz: 0,
        galaxieLotus: 0
    }
};

/* =========================================================
SPIELERDATEN LADEN
========================================================= */

function loadPlayerData() {
    const savedData = localStorage.getItem("caelixArcadePlayer");

    if (!savedData) {
        return {
            ...defaultPlayerData,
            inventory: { ...defaultPlayerData.inventory }
        };
    }

    try {
        const parsed = JSON.parse(savedData);
        return {
            ...defaultPlayerData,
            ...parsed,
            inventory: {
                ...defaultPlayerData.inventory,
                ...(parsed.inventory || {})
            }
        };
    } catch (error) {
        console.error("Spielstand konnte nicht geladen werden:", error);
        return {
            ...defaultPlayerData,
            inventory: { ...defaultPlayerData.inventory }
        };
    }
}

let playerData = loadPlayerData();

/* =========================================================
SPIELERDATEN SPEICHERN
========================================================= */

function savePlayerData() {
    localStorage.setItem("caelixArcadePlayer", JSON.stringify(playerData));
    updatePlayerUI();
}

/* =========================================================
STARON HINZUFÜGEN
========================================================= */

function addStaron(amount) {
    amount = Number(amount) || 0;
    playerData.staron += amount;

    if (playerData.staron < 0) {
        playerData.staron = 0;
    }

    savePlayerData();
    showNotification(`★ +${amount} STARON`);
}

/* =========================================================
STARON AUSGEBEN
========================================================= */

function spendStaron(amount) {
    amount = Number(amount) || 0;

    if (playerData.staron < amount) {
        showNotification("Nicht genug STARON!");
        return false;
    }

    playerData.staron -= amount;
    savePlayerData();
    return true;
}

/* =========================================================
UI AKTUALISIEREN
========================================================= */

function updatePlayerUI() {
    const homeStaron = document.getElementById("homeStaron");
    const staronAmount = document.getElementById("staronAmount");
    const accountStatus = document.getElementById("accountStatus");
    const gameAccount = document.getElementById("gameAccount");
    const highScore = document.getElementById("highScore");

    if (homeStaron) homeStaron.textContent = playerData.staron;
    if (staronAmount) staronAmount.textContent = playerData.staron;
    
    if (accountStatus) {
        accountStatus.textContent = playerData.username === "Gast" ? "Gastmodus" : playerData.username;
    }
    
    if (gameAccount) {
        gameAccount.textContent = playerData.username.toUpperCase();
    }
    
    if (highScore) {
        highScore.textContent = playerData.highScore;
    }
}

/* =========================================================
SPIEL ÖFFNEN
========================================================= */

function openGame(gameName) {
    if (!gameName) return;

    const games = {
        fruityway: "games/fruityway/index.html"
    };

    const gamePath = games[gameName];

    if (!gamePath) {
        showNotification("Dieses Spiel ist noch nicht verfügbar.");
        return;
    }

    window.location.href = gamePath;
}

/* =========================================================
ZUR ARCADE ZURÜCK
========================================================= */

function returnToArcade() {
    // Auf Kleinbuchstaben "index.html" angepasst für sichere GitHub-Pages-Kompatibilität
    window.location.href = "../../index.html";
}

/* =========================================================
MODAL SYSTEM
========================================================= */

function openModal(content) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");

    if (!modal || !modalContent) return;

    modalContent.innerHTML = content;
    modal.classList.remove("hidden");
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;

    modal.classList.add("hidden");
}

/* =========================================================
NOTIFICATION
========================================================= */

function showNotification(message) {
    const oldNotification = document.querySelector(".arcade-notification");
    if (oldNotification) oldNotification.remove();

    const notification = document.createElement("div");
    notification.className = "arcade-notification";
    notification.textContent = message;
    
    notification.style.position = "fixed";
    notification.style.left = "50%";
    notification.style.top = "20px";
    notification.style.transform = "translateX(-50%)";
    notification.style.zIndex = "9999";
    notification.style.padding = "14px 24px";
    notification.style.background = "#13091f";
    notification.style.border = "3px solid #ffe600";
    notification.style.color = "#ffe600";
    notification.style.fontWeight = "bold";
    notification.style.boxShadow = "0 0 20px #ffe600";

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity .3s";
        setTimeout(() => notification.remove(), 300);
    }, 1800);
}

/* =========================================================
DISCORD
========================================================= */

function connectDiscord() {
    openModal(`
        <h2>★ DISCORD CONNECT ★</h2>
        <p>
            Verbinde dein Discord-Konto mit
            CaeliX Arcade, um deine Spielstände
            geräteübergreifend zu speichern.
        </p>
        <p>
            Die sichere Discord-Anmeldung wird
            später mit dem Arcade-Server verbunden.
        </p>
        <button class="pixel-button" onclick="closeModal()">
            VERSTANDEN
        </button>
    `);
}

/* =========================================================
RESET / GASTKONTO
========================================================= */

function resetLocalAccount() {
    openModal(`
        <h2>SPIELSTAND LÖSCHEN?</h2>
        <p>
            Dadurch werden dein lokaler
            STARON-Bestand, Highscore und
            Inventar gelöscht.
        </p>
        <p>
            Diese Aktion kann nicht
            rückgängig gemacht werden.
        </p>
        <button class="pixel-button" onclick="confirmResetAccount()">
            JA, LÖSCHEN
        </button>
        <button class="pixel-button" onclick="closeModal()">
            ABBRECHEN
        </button>
    `);
}

function confirmResetAccount() {
    localStorage.removeItem("caelixArcadePlayer");
    playerData = loadPlayerData();
    updatePlayerUI();
    closeModal();
    showNotification("Spielstand zurückgesetzt.");
}

/* =========================================================
SHOP
========================================================= */

function openShop() {
    openModal(`
        <h2>★ ITEM SHOP ★</h2>
        <p>
            Deine STARON:
            <strong>${playerData.staron}</strong> ★
        </p>
        <div class="shop-list">
            <div class="shop-entry">
                <strong>🪐 Planetenbeere</strong>
                <p>Entfernt ausgewählte Früchte.</p>
                <button class="pixel-button" onclick="buyItem('planetenbeere', 50)">50 ★</button>
            </div>
            <div class="shop-entry">
                <strong>🥥 Kosmos-Kokusnuss</strong>
                <p>Löscht eine komplette Reihe oder Spalte.</p>
                <button class="pixel-button" onclick="buyItem('kosmosKokusnuss', 75)">75 ★</button>
            </div>
            <div class="shop-entry">
                <strong>🍄 Saturnpilz</strong>
                <p>Mischt das gesamte Spielfeld neu.</p>
                <button class="pixel-button" onclick="buyItem('saturnpilz', 100)">100 ★</button>
            </div>
            <div class="shop-entry">
                <strong>🌸 Galaxie Lotus</strong>
                <p>Lässt Voidvorka 2 Runden schlafen.</p>
                <button class="pixel-button" onclick="buyItem('galaxieLotus', 125)">125 ★</button>
            </div>
        </div>
    `);
}

/* =========================================================
ITEM KAUFEN
========================================================= */

function buyItem(itemName, price) {
    if (!spendStaron(price)) return;

    if (!playerData.inventory[itemName]) {
        playerData.inventory[itemName] = 0;
    }

    playerData.inventory[itemName]++;
    savePlayerData();
    showNotification("Item gekauft!");
    setTimeout(openShop, 250);
}

/* =========================================================
FREE ITEM
========================================================= */

function giveFreeItem() {
    openModal(`
        <h2>★ GRATIS ITEM ★</h2>
        <p>Du hast 5 Runden geschafft! Wähle ein kostenloses Item.</p>
        <div class="free-item-list">
            <button class="pixel-button" onclick="claimFreeItem('planetenbeere')">🪐 PLANETENBEERE</button>
            <button class="pixel-button" onclick="claimFreeItem('kosmosKokusnuss')">🥥 KOSMOS-KOKUSNUSS</button>
            <button class="pixel-button" onclick="claimFreeItem('saturnpilz')">🍄 SATURNPILZ</button>
            <button class="pixel-button" onclick="claimFreeItem('galaxieLotus')">🌸 GALAXIE LOTUS</button>
        </div>
    `);
}

function claimFreeItem(itemName) {
    if (!playerData.inventory[itemName]) {
        playerData.inventory[itemName] = 0;
    }

    playerData.inventory[itemName]++;
    savePlayerData();
    closeModal();
    showNotification("★ Gratis-Item erhalten!");

    if (typeof window.refreshInventory === "function") {
        window.refreshInventory();
    }
}

/* =========================================================
INVENTAR ITEM VERBRAUCHEN
========================================================= */

function useInventoryItem(itemName) {
    if (!playerData.inventory[itemName] || playerData.inventory[itemName] <= 0) {
        showNotification("Dieses Item hast du nicht.");
        return false;
    }

    playerData.inventory[itemName]--;
    savePlayerData();
    return true;
}

/* =========================================================
DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    updatePlayerUI();

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    const discordBtn = document.getElementById("discordBtn");
    if (discordBtn) discordBtn.addEventListener("click", connectDiscord);

    const backBtn = document.getElementById("backBtn");
    if (backBtn) backBtn.addEventListener("click", returnToArcade);

    const shopBtn = document.getElementById("shopBtn");
    if (shopBtn) shopBtn.addEventListener("click", openShop);

    const modalClose = document.getElementById("modalClose");
    if (modalClose) modalClose.addEventListener("click", closeModal);

    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });
    }
});

/* =========================================================
GLOBALE FUNKTIONEN
========================================================= */

window.openGame = openGame;
window.returnToArcade = returnToArcade;
window.openModal = openModal;
window.closeModal = closeModal;
window.showNotification = showNotification;
window.addStaron = addStaron;
window.spendStaron = spendStaron;
window.openShop = openShop;
window.buyItem = buyItem;
window.giveFreeItem = giveFreeItem;
window.claimFreeItem = claimFreeItem;
window.useInventoryItem = useInventoryItem;
window.connectDiscord = connectDiscord;
window.resetLocalAccount = resetLocalAccount;

/* =========================================================
ENDE
========================================================= */
