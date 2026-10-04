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

// Base de dados das constelações (Nome, Símbolo, Desenho em SVG/HTML, Descrição)
const constellationsData = [
    {
        name: "Orion",
        symbol: "🏹",
        description: "One of the most prominent and recognizable constellations in the night sky, named after a mythical hunter in Greek mythology. It features famous bright stars like Betelgeuse and Rigel, as well as the Orion Nebula.",
        starsMap: "★ . . . ★\n  \\     /\n   ★ - ★ - ★  (Belt)\n  /       \\\n★           ★"
    },
    {
        name: "Ursa Major",
        symbol: "🐻",
        description: "Known as the Great Bear, it contains the famous asterism known as the Big Dipper. It is visible throughout the year in the northern hemisphere and has historically been used for navigation to find Polaris (the North Star).",
        starsMap: "★ . . . ★ . ★\n  \\     / /\n   ★ - ★ ★"
    },
    {
        name: "Cassiopeia",
        symbol: "👑",
        description: "Easily recognizable by its distinct 'W' shape formed by five bright stars. In mythology, it represents the vain queen Cassiopeia sitting on her celestial throne.",
        starsMap: "★\n  \\     /\n   ★ - ★\n       \\\n         ★ - ★"
    },
    {
        name: "Scorpius",
        symbol: "🦂",
        description: "A large and dazzling constellation located in the southern hemisphere of the celestial sphere. It features the reddish supergiant star Antares at its heart, perfectly matching its scorpion mythology.",
        starsMap: "★ - ★ - ★\n        |\n        ★ - ★ - ★"
    },
    {
        name: "Cygnus",
        symbol: "🦢",
        description: "Also known as the Northern Cross, Cygnus represents a majestic swan flying along the Milky Way. It contains Deneb, one of the brightest stars in the night sky, and rich stellar nurseries.",
        starsMap: "    ★\n    |\n★ - ★ - ★\n    |\n    ★"
    },
    {
        name: "Pegasus",
        symbol: "🐎",
        description: "The winged horse of Greek mythology. Its most prominent feature is the Great Square of Pegasus, a large asterism formed by four bright stars bridging multiple cosmic quadrants.",
        starsMap: "★ --- ★\n|     |\n|     |\n★ --- ★"
    }
];

// Gerar a grade de seleção na página
function generateConstellationsGrid() {
    const grid = document.getElementById('constellation-grid');
    if (!grid) return;

    grid.innerHTML = '';

    constellationsData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'calendar-day'; // Reaproveita o estilo limpo de cards
        card.style.justifyContent = 'center';
        card.style.gap = '8px';
        card.innerHTML = `
            <span style="font-size: 1.5rem;">${item.symbol}</span>
            <span style="font-weight: bold; color: var(--white);">${item.name}</span>
        `;

        card.addEventListener('click', () => {
            displayConstellationDetails(item);
        });

        grid.appendChild(card);
    });

    // Exibe a primeira por padrão
    displayConstellationDetails(constellationsData[0]);
}

// Exibir detalhes e o "desenho" da constelação no painel
function displayConstellationDetails(item) {
    const infoContent = document.getElementById('constellation-info');
    if (!infoContent) return;

    infoContent.innerHTML = `
        <h3>${item.symbol} ${item.name}</h3>
        <div style="background: rgba(0,0,0,0.5); border: 1px dashed var(--pink-neon); border-radius: 8px; padding: 10px; margin: 10px 0; text-align: center; font-family: monospace; white-space: pre-wrap; color: var(--pink-neon); font-size: 1.1rem; letter-spacing: 2px;">
            ${item.starsMap}
        </div>
        <p>${item.description}</p>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    generateConstellationsGrid();
});