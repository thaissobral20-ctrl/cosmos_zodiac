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

// Mapeamento dos signos para seus símbolos (caracteres unicode do zodíaco)
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

// Cálculo da fase da lua e signo correspondente
function getMoonDataForDate(date) {
    const knownNewMoon = new Date('2000-01-06');
    const diffDays = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
    const cycle = 29.53058867;
    const moonAge = diffDays % cycle;
    const normalizedAge = moonAge < 0 ? moonAge + cycle : moonAge;

    let phaseName, phaseEmoji;
    if (normalizedAge < 1.84) { phaseName = "New Moon"; phaseEmoji = "🌑"; }
    else if (normalizedAge < 5.53) { phaseName = "Waxing Crescent"; phaseEmoji = "🌒"; }
    else if (normalizedAge < 9.22) { phaseName = "First Quarter"; phaseEmoji = "🌓"; }
    else if (normalizedAge < 12.91) { phaseName = "Waxing Gibbous"; phaseEmoji = "🌔"; }
    else if (normalizedAge < 16.61) { phaseName = "Full Moon"; phaseEmoji = "🌕"; }
    else if (normalizedAge < 20.30) { phaseName = "Waning Gibbous"; phaseEmoji = "🌖"; }
    else if (normalizedAge < 23.99) { phaseName = "Last Quarter"; phaseEmoji = "🌗"; }
    else if (normalizedAge < 27.68) { phaseName = "Waning Crescent"; phaseEmoji = "🌘"; }
    else { phaseName = "New Moon"; phaseEmoji = "🌑"; }

    const signIndex = Math.floor((normalizedAge / cycle) * 12) % 12;
    const signName = signsList[signIndex];
    const signSymbol = zodiacSymbols[signName];

    return { phaseName, phaseEmoji, signName, signSymbol };
}

// Gerar o calendário do mês atual na página dedicada
function generateMoonCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const totalDays = new Date(year, month + 1, 0).getDate();
    const todayDate = now.getDate();

    for (let day = 1; day <= totalDays; day++) {
        const currentDate = new Date(year, month, day);
        const moonInfo = getMoonDataForDate(currentDate);

        const dayCard = document.createElement('div');
        dayCard.className = `calendar-day ${day === todayDate ? 'today' : ''}`;
        dayCard.innerHTML = `
            <span class="cal-date">${day}</span>
            <span class="cal-moon" title="${moonInfo.phaseName}">${moonInfo.phaseEmoji}</span>
            <span class="cal-sign" style="font-size: 1.1rem;" title="${moonInfo.signName}">${moonInfo.signSymbol}</span>
        `;

        dayCard.addEventListener('click', () => {
            const infoContent = document.getElementById('info-content');
            if (infoContent) {
                infoContent.innerHTML = `
                    <h3>📅 Date: ${currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                    <p><strong>Moon Phase:</strong> ${moonInfo.phaseEmoji} ${moonInfo.phaseName}</p>
                    <p><strong>Lunar Zodiac Sign:</strong> ${moonInfo.signSymbol} (${moonInfo.signName})</p>
                    <p>On this day, the Moon travels through the sign of ${moonInfo.signName}, shifting emotional energies and astrological alignment.</p>
                `;
            }
        });

        grid.appendChild(dayCard);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateMoonCalendar();
});