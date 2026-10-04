// Relógio em tempo real
function updateClock() {
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        const now = new Date();
        const options = { dateStyle: 'full', timeStyle: 'medium' };
        clockElement.textContent = now.toLocaleString('en-US', options);
    }
}
setInterval(updateClock, 1000);
updateClock();

document.addEventListener('DOMContentLoaded', () => {
    const infoContent = document.getElementById('info-content');
    if (infoContent) {
        infoContent.innerHTML = `
            <h3>Welcome to the Observatory</h3>
            <p>Click on any celestial body in orbit to discover its connections with constellations and zodiac signs in real time.</p>
        `;
    }

    // Interatividade ao clicar nos planetas e no Sol
    const celestialBodies = document.querySelectorAll('.planet, .center-sun');
    celestialBodies.forEach(body => {
        body.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = body.getAttribute('data-name');
            const sign = body.getAttribute('data-sign');

            if (infoContent) {
                infoContent.innerHTML = `
                    <h3>✨ Body: ${name}</h3>
                    <p><strong>Astrological Association:</strong> ${sign}</p>
                    <p>This celestial body is in constant orbital motion, influencing ongoing zodiac transits and celestial mechanics in real time.</p>
                `;
            }
        });
    });

    // Lógica do botão de Pausar / Retomar o Sistema Solar
    const toggleBtn = document.getElementById('toggle-motion');
    // Agora pausamos os planet-wrappers que contêm a animação de rotação
    const planetWrappers = document.querySelectorAll('.planet-wrapper');
    let isPaused = false;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            planetWrappers.forEach(wrapper => {
                wrapper.style.animationPlayState = isPaused ? 'paused' : 'running';
            });
            toggleBtn.textContent = isPaused ? 'Resume Motion' : 'Pause Motion';
        });
    }
});