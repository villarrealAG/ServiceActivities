const mainCanvas = document.getElementById('main-canvas');
const charLayer = document.getElementById('character-layer');
const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-trigger');
const playerCard = document.getElementById('player-card');
const progressContainer = document.getElementById('progress-cont');
const progressBar = document.getElementById('progress-actual');
const timeDisplay = document.getElementById('time-track');
const volumeSlider = document.getElementById('vol-slider');

// --- PARALLAX DE CAPAS SUAVE E INERTE (ADIÓS CAJA ROTATIVA) ---
let mouseX = 0, mouseY = 0;
let charX = 0, charY = 0;
let petalsParamX = 0;

document.addEventListener('mousemove', (e) => {
    // Calculamos la posición normalizada del mouse (-1 a 1)
    mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
});

function updateParallax() {
    // Interpolación matemática (Lerp) para dar inercia ultra suave al render
    const targetX = mouseX * 18;  // Rango máximo de movimiento horizontal (px)
    const targetY = mouseY * 12;  // Rango máximo de movimiento vertical (px)

    charX += (targetX - charX) * 0.08;
    charY += (targetY - charY) * 0.08;

    // Movemos sutilmente los pétalos en dirección opuesta
    petalsParamX += (-mouseX * 10 - petalsParamX) * 0.05;

    charLayer.style.transform = `translate(${charX}px, ${charY}px)`;

    requestAnimationFrame(updateParallax);
}
updateParallax();

// --- SISTEMA DE PÉTALOS DE FLORES DELICADAS ---
const petalCanvas = document.getElementById('petals-canvas');
const ctx = petalCanvas.getContext('2d');

function resizeCanvas() {
    petalCanvas.width = mainCanvas.clientWidth;
    petalCanvas.height = mainCanvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 100);

const petalsArray = [];
const maxPetals = 30;

class Petal {
    constructor() {
        this.x = Math.random() * petalCanvas.width;
        this.y = Math.random() * -petalCanvas.height;
        this.size = Math.random() * 5 + 3; // Ligeramente más pequeños y finos
        this.speedY = Math.random() * 0.7 + 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 0.8 - 0.4;

        const colors = [
            'rgba(239, 68, 68, 0.25)',  // Rojo fuego sutil
            'rgba(249, 115, 22, 0.20)', // Naranja etéreo
            'rgba(254, 205, 211, 0.25)' // Pétalo rosa/blanco delicado
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.y += this.speedY;
        // Sumamos la inercia del mouseParamX para arrastrar las flores con el aire del mouse
        this.x += this.speedX + Math.sin(this.y / 40) * 0.25 + (petalsParamX * 0.02);
        this.angle += this.spin;

        if (this.y > petalCanvas.height + 10) {
            this.y = -10;
            this.x = Math.random() * petalCanvas.width;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.fillStyle = this.color;

        ctx.beginPath();
        // Forma almendrada orgánica de flor
        ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < maxPetals; i++) {
    petalsArray.push(new Petal());
}

function animatePetals() {
    ctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    for (let i = 0; i < petalsArray.length; i++) {
        petalsArray[i].update();
        petalsArray[i].draw();
    }
    requestAnimationFrame(animatePetals);
}
animatePetals();

// --- LÓGICA DE AUDIO ---
audio.volume = volumeSlider.value;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = 'Pause';
        playerCard.classList.add('is-playing');
    } else {
        audio.pause();
        playBtn.textContent = 'Play';
        playerCard.classList.remove('is-playing');
    }
});

function formatTime(secs) {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});

audio.addEventListener('loadedmetadata', () => {
    timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
});

progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    audio.currentTime = (clickX / width) * audio.duration;
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

audio.addEventListener('ended', () => {
    playBtn.textContent = 'Play';
    progressBar.style.width = '0%';
    playerCard.classList.remove('is-playing');
});
