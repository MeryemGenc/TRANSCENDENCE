import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let playerScores = [0, 0, 0, 0];
let scene, camera, renderer;
let players = [], ball;
let keys = {};
let boardSize = 600;
let playerWidth = 100, playerHeight = 8; // Çubuk genişlik/yükseklik
let playerSpeed = 5;
let ballVelocityX = 3, ballVelocityY = 2;
let orbit, animationId;

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === '/pong4d') {
        initializeGame();
    }
});

function initializeGame() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(boardSize, boardSize);
    const boardElement = document.getElementById("pong_board");
    renderer.setClearColor(0x020305); // Arka plan rengi
    boardElement.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0, 700);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableRotate = false;
    orbit.enableZoom = false;

    createPlayers();
    createBall();

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    animate();
}

function createPlayers() {
    const colors = [0x3a98c9, 0xf72d93, 0x00f700, 0xffff00]; // Dört oyuncu için renkler
    const positions = [
        { x: 0, y: boardSize / 2 - playerHeight / 2 }, // Üst
        { x: boardSize / 2 - playerHeight / 2, y: 0 }, // Sağ
        { x: 0, y: -boardSize / 2 + playerHeight / 2 }, // Alt
        { x: -boardSize / 2 + playerHeight / 2, y: 0 }  // Sol
    ];

    positions.forEach((pos, index) => {
        const playerGeometry = index % 2 === 0 
            ? new THREE.BoxGeometry(playerWidth, playerHeight, 10) 
            : new THREE.BoxGeometry(playerHeight, playerWidth, 10);
        
        const playerMaterial = new THREE.MeshStandardMaterial({ color: colors[index] });
        const player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.set(pos.x, pos.y, 0);
        players.push(player);
        scene.add(player);
    });

    // Aydınlatma
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);
}

function createBall() {
    const sphereGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xf72d93 });
    ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
    resetBall();
    scene.add(ball);
}

function resetBall() {
    ball.position.set(0, 0, 0);
    ballVelocityX = Math.random() > 0.5 ? 3 : -3;
    ballVelocityY = (Math.random() * 4) - 2;
}

function keyDown(event) {
    keys[event.key.toLowerCase()] = true;
}

function keyUp(event) {
    keys[event.key.toLowerCase()] = false;
}

function animate() {
    animationId = requestAnimationFrame(animate);
    orbit.update();
    updateGameLogic();
    renderer.render(scene, camera);
}

function updateGameLogic() {
    // Üst paddle (W, S ile hareket eder)
    if (keys['w']) movePlayer(0, playerSpeed);
    if (keys['s']) movePlayer(0, -playerSpeed);

    // Sağ paddle (I, K ile hareket eder)
    if (keys['i']) movePlayer(1, playerSpeed);
    if (keys['k']) movePlayer(1, -playerSpeed);

    // Alt paddle (Ok Yukarı/Aşağı ile hareket eder)
    if (keys['arrowup']) movePlayer(2, playerSpeed);
    if (keys['arrowdown']) movePlayer(2, -playerSpeed);

    // Sol paddle (G, T ile hareket eder)
    if (keys['g']) movePlayer(3, playerSpeed);
    if (keys['t']) movePlayer(3, -playerSpeed);

    // Top hareketi
    ball.position.x += ballVelocityX;
    ball.position.y += ballVelocityY;

    checkCollisions();
}

function movePlayer(playerIndex, speed) {
    if (playerIndex === 0 || playerIndex === 2) {
        // Üst/alt oyuncular için hareket
        players[playerIndex].position.x += speed;
        if (Math.abs(players[playerIndex].position.x) > boardSize / 2 - playerWidth / 2)
            players[playerIndex].position.x = Math.sign(players[playerIndex].position.x) * (boardSize / 2 - playerWidth / 2);
    } else {
        // Sol/sağ oyuncular için hareket
        players[playerIndex].position.y += speed;
        if (Math.abs(players[playerIndex].position.y) > boardSize / 2 - playerWidth / 2)
            players[playerIndex].position.y = Math.sign(players[playerIndex].position.y) * (boardSize / 2 - playerWidth / 2);
    }
}

function checkCollisions() {
    // Üst ve alt duvarlara çarpma
    if (Math.abs(ball.position.y) >= boardSize / 2 - ball.geometry.parameters.radius) {
        ballVelocityY = -ballVelocityY;
        ball.position.y = Math.sign(ball.position.y) * (boardSize / 2 - ball.geometry.parameters.radius);

        // Alt kenar için oyuncu 2, üst kenar için oyuncu 0 puan alır
        const scorerIndex = ball.position.y > 0 ? 0 : 2;
        updateScore(scorerIndex);
    }

    // Sol ve sağ duvarlara çarpma
    if (Math.abs(ball.position.x) >= boardSize / 2 - ball.geometry.parameters.radius) {
        ballVelocityX = -ballVelocityX;
        ball.position.x = Math.sign(ball.position.x) * (boardSize / 2 - ball.geometry.parameters.radius);

        // Sağ kenar için oyuncu 1, sol kenar için oyuncu 3 puan alır
        const scorerIndex = ball.position.x > 0 ? 1 : 3;
        updateScore(scorerIndex);
    }

    // Paddle ile çarpışmalar
    players.forEach((player, index) => {
        const collisionX = Math.abs(ball.position.x - player.position.x) < playerWidth / 2 + ball.geometry.parameters.radius;
        const collisionY = Math.abs(ball.position.y - player.position.y) < playerHeight / 2 + ball.geometry.parameters.radius;

        if (collisionX && collisionY) {
            if (index % 2 === 0) ballVelocityY = -ballVelocityY;
            else ballVelocityX = -ballVelocityX;
        }
    });
}

function updateScore(playerIndex) {
    playerScores[playerIndex]++;
    if (playerScores[playerIndex] >= 5) {
        alert(`Player ${playerIndex + 1} Wins!`);
        stopGame();
    }
}

function stopGame() {
    cancelAnimationFrame(animationId);
    animationId = null;
    document.getElementById("pong_game_button").style.display = '';
    playerScores.fill(0); // Skorları sıfırla
    resetBall(); // Topu sıfırla
}