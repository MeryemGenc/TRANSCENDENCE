let W = window.innerWidth;
let H = window.innerHeight;
let canvas;
let context;
const maxConfettis = 150;
let particles = [];
let animationFrameId; // animation frame ID'yi tanımlayın

const possibleColors = [
    "DodgerBlue",
    "OliveDrab",
    "Gold",
    "Pink",
    "SlateBlue",
    "LightBlue",
    "Gold",
    "Violet",
    "PaleGreen",
    "SteelBlue",
    "SandyBrown",
    "Chocolate",
    "Crimson"
];

export function initializeConfettiCanvas() {
    canvas = document.getElementById("canvas_confetti");

    if (canvas) {
        context = canvas.getContext("2d");

        // Canvas boyutlarını ayarla
        canvas.width = W;
        canvas.height = H;

        // Önceki animasyon döngüsünü iptal et
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // particles dizisini sıfırla
        particles = [];
        
        // Confetti parçacıklarını başlat
        for (let i = 0; i < maxConfettis; i++) {
            particles.push(new confettiParticle());
        }

        // Çizim döngüsünü başlat
        Draw();
    }
}

function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H - H;
    this.r = randomFromTo(11, 33);
    this.d = Math.random() * maxConfettis + 11;
    this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    this.tilt = Math.floor(Math.random() * 33) - 11;
    this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
    this.tiltAngle = 0;

    this.draw = function() {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
    };
}

function Draw() {
    const results = [];

    // Yeni animasyon döngüsü başlat ve animationFrameId'yi güncelle
    animationFrameId = requestAnimationFrame(Draw);
    context.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
        results.push(particles[i].draw());
    }

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y > H) {
            particle.x = Math.random() * W;
            particle.y = -30;
            particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
    }

    return results;
}

// Pencere yeniden boyutlandırıldığında canvas boyutlarını güncelle
window.addEventListener("resize", function() {
    W = window.innerWidth;
    H = window.innerHeight;
    if (canvas) {
        canvas.width = W;
        canvas.height = H;
    }
}, false);