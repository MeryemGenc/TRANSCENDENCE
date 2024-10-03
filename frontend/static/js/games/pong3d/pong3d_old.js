import { setGameRunning_3d, getGameRunning_3d } from "../../index.js";
import { post_game_score } from "../../api.js";

// Three.js öğeleri
let scene, camera, renderer;
let player1, player2, ball;
let player1Score = 0, player2Score = 0;
let keys = {};
let boardWidth = 700, boardHeight = 500;
let playerWidth = 5, playerHeight = 90;
let playerSpeed = 3;
let ballVelocityX = 1.5, ballVelocityY = 2;

// HTML yüklenmesini bekleyelim
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_3d_play_button2")) {
            e.target.style.display = 'none';
            startGame_3d();
        }
    });
});

// Three.js sahnesini başlat
function startGame_3d() {
    // Scene-Camera & renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 700/500, 0.1, 1000);
    camera.position.z = 350;
    renderer = new THREE.WebGLRenderer();


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    const board_3d = document.getElementById("board_3d");
    board_3d.style.width = boardWidth;
    board_3d.style.height = boardHeight;
    board_3d.style.position = "relative"; 
    board_3d.style.backgroundColor = "black"; 
 
    // console.log(renderer); 
    renderer.setSize(700, 500); // Renderer boyutunu ayarla
    board_3d.appendChild(renderer.domElement); // Renderer'ı board_3d'a ekle


    
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Oyuncular ve topu oluştur
    createPlayers();
    createBall();

    // Oyun kontrolü
    setGameRunning_3d(true);
    document.addEventListener("keydown", keyDownHandler_3d);
    document.addEventListener("keyup", keyUpHandler_3d);

    // Oyun güncelleme döngüsünü başlat
    animate();
}

// Oyuncuları 3D küp olarak oluştur
function createPlayers() {
    let playerGeometry = new THREE.BoxGeometry(playerWidth, playerHeight, 10);
    let playerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Player 1
    player1 = new THREE.Mesh(playerGeometry, playerMaterial);
    player1.position.set(-boardWidth / 2 + 20, 0, 0);
    scene.add(player1);

    // Player 2
    player2 = new THREE.Mesh(playerGeometry, playerMaterial);
    player2.position.set(boardWidth / 2 - 20, 0, 0);
    scene.add(player2);
}

// Topu 3D küp olarak oluştur
function createBall() {
    let ballGeometry = new THREE.BoxGeometry(10, 10, 10);
    let ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0, 0);
    scene.add(ball);
}

// Klavye tuşları için dinleyiciler
function keyDownHandler_3d(e) {
    keys[e.code] = true;
}
function keyUpHandler_3d(e) {
    keys[e.code] = false;
}

// Oyun döngüsü (animasyon)
function animate() {
    if (!getGameRunning_3d()) return;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    movePlayers();
    moveBall();
}

// Oyunculari hareket ettir
function movePlayers() {
    if (keys["KeyW"]) {
        let nextPlayer1Y = player1.position.y + playerSpeed;
        if (!outOfBounds_3d(nextPlayer1Y)) player1.position.y = nextPlayer1Y;
    } else if (keys["KeyS"]) {
        let nextPlayer1Y = player1.position.y - playerSpeed;
        if (!outOfBounds_3d(nextPlayer1Y)) player1.position.y = nextPlayer1Y;
    }

    if (keys["ArrowUp"]) {
        let nextPlayer2Y = player2.position.y + playerSpeed;
        if (!outOfBounds_3d(nextPlayer2Y)) player2.position.y = nextPlayer2Y;
    } else if (keys["ArrowDown"]) {
        let nextPlayer2Y = player2.position.y - playerSpeed;
        if (!outOfBounds_3d(nextPlayer2Y)) player2.position.y = nextPlayer2Y;
    }
}

// Topu hareket ettir
function moveBall() {
    ball.position.x += ballVelocityX;
    ball.position.y += ballVelocityY;

    // Topun tahtanın dışına çıkmaması için
    if (ball.position.y >= boardHeight / 2 || ball.position.y <= -boardHeight / 2) {
        ballVelocityY *= -1;
    }

    // Oyuncu 1 ile çarpışma
    if (detectCollision_3d(ball, player1)) {
        ballVelocityX *= -1;
    }

    // Oyuncu 2 ile çarpışma
    if (detectCollision_3d(ball, player2)) {
        ballVelocityX *= -1;
    }

    // Skor kontrolü
    if (ball.position.x < -boardWidth / 2) {
        player2Score++;
        resetBall(1);
    } else if (ball.position.x > boardWidth / 2) {
        player1Score++;
        resetBall(-1);
    }

    // Skor limiti kontrolü
    if (player1Score >= 3 || player2Score >= 3) {
        stopGame_3d();
    }
}

// Çarpışma algılama
function detectCollision_3d(ball, player) {
    return ball.position.x <= player.position.x + playerWidth &&
        ball.position.x >= player.position.x &&
        ball.position.y <= player.position.y + playerHeight / 2 &&
        ball.position.y >= player.position.y - playerHeight / 2;
}

// Oyunun sona ermesi
export function stopGame_3d() {
    if (getGameRunning_3d()) {
        setGameRunning_3d(false);
        post_game_score(player1Score, player2Score);
        document.getElementById("pong_3d_play_button2").style.display = 'block';
    }
    
    player1Score = 0; 
    player2Score = 0;
}

// Topu resetleme
function resetBall(direction) {
    ball.position.set(0, 0, 0);
    ballVelocityX = direction * 2;
    ballVelocityY = 3;
}

// Oyuncuların tahtanın dışına çıkmasını engelle
function outOfBounds_3d(yPosition) {
    return yPosition > boardHeight / 2 - playerHeight / 2 || yPosition < -boardHeight / 2 + playerHeight / 2;
}

