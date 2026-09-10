// Fruityway - Spiel-Logik & Asset-Verwaltung

// Alle Bild-URLs direkt aus deiner Liste
const ASSETS = {
    voidvorka: {
        ruhig: "https://i.postimg.cc/Jz4cyXHL/voidvruhig.png",
        schlafend: "https://i.postimg.cc/mkj1Rdwt/voidvrsleep.png",
        wuetend: "https://i.postimg.cc/tJnM6rqY/voidvrmad.png"
    },
    items: {
        planetenbeere: "https://i.postimg.cc/QdSZhyVS/fr18.png", // Entfernt auswählbare Früchte
        kosmosKokusnuss: "https://i.postimg.cc/bJjZnXVJ/fr20.png", // Löscht ganze Reihe bei Zug
        saturnpilz: "https://i.postimg.cc/6prJQDZ1/fr17.png", // Mischt das Spielfeld neu
        galaxieLotus: "https://i.postimg.cc/2yRgmG5Q/fr10.png"  // Lässt Voidvorka 2 Runden schlafen
    },
    fruchtetypen: [
        "https://i.postimg.cc/pd8QKgzP/fr1.png",
        "https://i.postimg.cc/d0dRGzdr/fr2.png",
        "https://i.postimg.cc/dVhjV7Vp/fr3.png",
        "https://i.postimg.cc/J7Qq6Vg1/fr4.png",
        "https://i.postimg.cc/mkVytC9K/fr5.png",
        "https://i.postimg.cc/x1ZgvvZ8/fr6.png",
        "https://i.postimg.cc/VvFDn3yN/fr7.png",
        "https://i.postimg.cc/Kjb0KmHq/fr8.png",
        "https://i.postimg.cc/VN3G8q9V/fr9.png",
        "https://i.postimg.cc/HWbKThh3/fr13.png",
        "https://i.postimg.cc/g0550Fp7/fr15.png",
        "https://i.postimg.cc/RZgyjJD9/fr16.png",
        "https://i.postimg.cc/QMxs7rvy/fr19.png",
        "https://i.postimg.cc/hj7NH6Ky/fr12.png",
        "https://i.postimg.cc/G2s6ZVbM/fr11.png",
        "https://i.postimg.cc/FzM8rZsw/fr14.png"
    ]
};

// Spielstatus
let gameState = {
    runde: 1,
    punkte: 0,
    voidvorkaStatus: "ruhig", // 'ruhig', 'schlafend', 'wuetend'
    schlafRundenRest: 0
};

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
    console.log("Fruityway geladen – Assets initialisiert!");
    aktualisiereVoidvorkaBild();
    initialisiereSpielbereich();
});

// Funktion zum Wechseln der Voidvorka-Emotion
function setzeVoidvorkaZustand(zustand) {
    gameState.voidvorkaStatus = zustand;
    aktualisiereVoidvorkaBild();
}

function aktualisiereVoidvorkaBild() {
    const imgElement = document.getElementById("voidvorkaImg");
    if (!imgElement) return;

    if (gameState.voidvorkaStatus === "ruhig") {
        imgElement.src = ASSETS.voidvorka.ruhig;
    } else if (gameState.voidvorkaStatus === "schlafend") {
        imgElement.src = ASSETS.voidvorka.schlafend;
    } else if (gameState.voidvorkaStatus === "wuetend") {
        imgElement.src = ASSETS.voidvorka.wuetend;
    }
}

// Beispiel-Funktion für den Start des Spielfelds
function initialisiereSpielbereich() {
    const dialogueText = document.getElementById("dialogueText");
    if (dialogueText) {
        dialogueText.textContent = "Willkommen bei Fruityway! Voidvorka beobachtet dich. Wähle deine nächste Zutat.";
    }
}
