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

const zodiacSymbols = {
    "Aries": "♈",
    "Taurus": "♉",
    "Gemini": "♊",
    "Cancer": "♋",
    "Leo": "♌",
    "Virgo": "♍",
    "Libra": "♎",
    "Scorpio": "♏",
    "Sagittarius": "♐",
    "Capricorn": "♑",
    "Aquarius": "♒",
    "Pisces": "♓"
};

const signsList = Object.keys(zodiacSymbols);
const planetsList = ["Mars", "Venus", "Mercury", "Sun", "Jupiter"];

function getTransitDataForDate(day, month, year) {
    const planetIndex = (day + month) % planetsList.length;
    const signIndex = (day * 2 + month) % signsList.length;
    const houseNumber = ((day + 3) % 12) + 1;

    const activePlanet = planetsList[planetIndex];
    const signName = signsList[signIndex];
    const signSymbol = zodiacSymbols[signName];

    let interpretation = "";
    if (activePlanet === "Mars") {
        interpretation = `Mars in ${signName} (${signSymbol}) entering House ${houseNumber} brings a surge of assertive energy, driving your ambition toward financial security, personal values, or energetic breakthroughs.`;
    } else if (activePlanet === "Venus") {
        interpretation = `Venus in ${signName} (${signSymbol}) transiting House ${houseNumber} highlights relationships, harmony, and creative expression. A wonderful period to attract abundance.`;
    } else if (activePlanet === "Mercury") {
        interpretation = `Mercury in ${signName} (${signSymbol}) in House ${houseNumber} sharpens intellect, communication, and problem-solving skills. Excellent time for negotiations and writing.`;
    } else if (activePlanet === "Sun") {
        interpretation = `The Sun illuminating ${signName} (${signSymbol}) in House ${houseNumber} energizes your core identity, bringing vitality, visibility, and a fresh perspective.`;
    } else {
        interpretation = `Jupiter in ${signName} (${signSymbol}) in House ${houseNumber} expands your horizons, bringing opportunities for growth, learning, and spiritual alignment.`;
    }

    return {
        planet: activePlanet,
        signName: signName,
        signSymbol: signSymbol,
        house: houseNumber,
        interpretation: interpretation
    };
}

function generateTransitCalendar() {
    const grid = document.getElementById('transit-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const todayDate = now.getDate();

    for (let day = 1; day <= totalDays; day++) {
        const transit = getTransitDataForDate(day, month, year);

        const dayCard = document.createElement('div');
        dayCard.className = `calendar-day ${day === todayDate ? 'today' : ''}`;
        dayCard.style.justifyContent = 'space-between';
        
        dayCard.innerHTML = `
            <span class="cal-date">${day}</span>
            <span style="font-size: 1.1rem; color: var(--pink-neon);" title="${transit.signName}">${transit.signSymbol}</span>
            <span class="cal-sign">H${transit.house} (${transit.planet[0]})</span>
        `;

        dayCard.addEventListener('click', () => {
            // Remove a seleção de todos os outros dias e adiciona apenas no clicado
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayCard.classList.add('selected');

            const infoCard = document.getElementById('transit-info');
            if (infoCard) {
                infoCard.innerHTML = `
                    <h3>✨ Day ${day} Transit</h3>
                    <p><strong>Planet:</strong> ${transit.planet}</p>
                    <p><strong>Sign:</strong> ${transit.signSymbol} (${transit.signName}) • House ${transit.house}</p>
                    <p style="margin-top: 8px; line-height: 1.4;">${transit.interpretation}</p>
                `;
            }
        });

        grid.appendChild(dayCard);
    }

    // Seleciona o dia de hoje por padrão ao carregar
    const todayCard = grid.querySelector(`.calendar-day:nth-child(${todayDate})`);
    if (todayCard) {
        todayCard.classList.add('selected');
    }

    const defaultTransit = getTransitDataForDate(todayDate, month, year);
    const infoCard = document.getElementById('transit-info');
    if (infoCard) {
        infoCard.innerHTML = `
            <h3>✨ Today's Transit (Day ${todayDate})</h3>
            <p><strong>Planet:</strong> ${defaultTransit.planet}</p>
            <p><strong>Sign:</strong> ${defaultTransit.signSymbol} (${defaultTransit.signName}) • House ${defaultTransit.house}</p>
            <p style="margin-top: 8px; line-height: 1.4;">${defaultTransit.interpretation}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateTransitCalendar();
});