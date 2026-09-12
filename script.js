// Sound-Effekt für Retro-Arcade Klicks erzeugen
function playCoinSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Erster Ton (hoch)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'square'; // Retro 8-Bit Welle
    osc1.frequency.setValueAtTime(987.77, audioCtx.currentTime); // Note B5
    gain1.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    
    // Zweiter Ton (höher - Münz-Sound)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08); // Note E6
    gain2.gain.setValueAtTime(0.1, audioCtx.currentTime + 0.08);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);

    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.08);
    osc2.start(audioCtx.currentTime + 0.08);
    osc2.stop(audioCtx.currentTime + 0.3);
}

// Event-Listener an den "Insert Coin"-Button hängen
document.addEventListener('DOMContentLoaded', () => {
    const coinBtn = document.querySelector('.coin-btn:not(.disabled)');

    if (coinBtn) {
        coinBtn.addEventListener('click', (event) => {
            // Verhindert das sofortige Weiterleiten, um den Sound abzuspielen
            event.preventDefault();
            const targetUrl = coinBtn.getAttribute('href');

            playCoinSound();

            // Nach 300ms (wenn der Sound zu Ende ist) die Seite öffnen
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        });
    }
});

