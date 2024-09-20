import { setGameRunning, getGameRunning}  from "./../../index.js"
import { post_game_score }  from "./../../api.js"
import { navigateTo } from "./../../index.js";



//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//players
let playerWidth = 10;
let playerHeight = 50;
let playerSpeed = 3; // oyuncuların hızını belirle
let player1VelocityY = 0;
let player2VelocityY = 0;

//player 1 konum ve boyut ayarları
let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: player1VelocityY
}

//player 2 konum ve boyut ayarları
let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: player2VelocityY
}

//Score
let player1Score = 0;
let player2Score = 0;

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 2,
    velocityY: 3
}

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_play_button")) { navigateTo('/pong'); }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_play_button2")) { 
            e.target.style.display = 'none'
            startGame(); 
        }
    });
});


function startGame() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    setGameRunning(true); // Oyun durumu aktif
    requestAnimationFrame(update);

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
}

export function stopGame() {
    if (getGameRunning()) {
        setGameRunning(false); // Oyun durduruldu
        context.clearRect(0, 0, board.width, board.height); // Canvas temizle
        // alert("Oyun sona erdi! URL değişti.");
        // oyun durduğunda diğer fonksiyonları da temizle. ???

        post_game_score(player1Score, player2Score);

        // player-ball -> konum-score  sıfırlama
        player1.x = 10;
        player1.y = boardHeight / 2;
        player1.velocityY = player1VelocityY;
        player2.x = boardWidth - playerWidth - 10;
        player2.y = boardHeight / 2;
        player2.velocityY = player2VelocityY;
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
        ball.velocityX = 2;
        ball.velocityY = 3;
        player1Score = 0;
        player2Score = 0;
        
        document.getElementById("pong_play_button2").style.display = 'block';
    }
}

// Her frame'de çağırılır
function update() {
    if (!getGameRunning()) return; // Oyun durduysa update etmeyi bırak

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height); // önceki çizimi siler

    // player1
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // player2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // score control
    if (player1Score >=3 || player2Score >= 3) {
        stopGame();
        return;
    }
    
    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    // topun canvasa çarpması
    if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
        ball.velocityY *= -1; // yönünü değiştir
    }

    // ball'ı geri sektirmek
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            ball.x = (player1.x + ball.width); // aksi takdirde top player'ın içinden geçiyordu
            ball.velocityX *= -1;
        }
    } else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.x = (player2.x - ball.width); // aksi takdirde top player'ın içinden geçiyordu
            ball.velocityX *= -1;
        }
    }

    // game over
    if (ball.x < 0) {
        player2Score++;
        resetGame(1);
    } else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        resetGame(-1);
    }

    // score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth / 5, 45);
    context.fillText(player2Score, boardWidth * 4 / 5 - 45, 45);

    // orta çizgi
    for (let i = 10; i < board.height; i += 25) {
        context.fillRect(board.width / 2 - 10, i, 5, 5);
    }
}

// playerların ekranın dışına çıkmasını engellemek
function outOfBounds(yPosition) {
    return yPosition < 0 || yPosition + playerHeight > boardHeight;
}

// tuşlara basıldığında hız ayarla
function keyDownHandler(e) {
    // player 1
    if (e.code === "KeyW") {
        player1.velocityY = -playerSpeed;
    } else if (e.code === "KeyS") {
        player1.velocityY = playerSpeed;
    }

    // player 2
    if (e.code === "ArrowUp") {
        player2.velocityY = -playerSpeed;
    } else if (e.code === "ArrowDown") {
        player2.velocityY = playerSpeed;
    }
}

// tuşlar bırakıldığında hızı sıfırla
function keyUpHandler(e) {
    // player 1
    if (e.code === "KeyW" || e.code === "KeyS") {
        player1.velocityY = 0;
    }

    // player 2
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        player2.velocityY = 0;
    }
}

// çarpışmayı tespit et
function detectCollision(a, b) {
    return a.x <= b.x + b.width && // Topun sol kenarının, oyuncunun sağ kenarını geçmesi
           a.x + a.width >= b.x && // Topun sağ kenarının, oyuncunun sol kenarını geçmemesi
           a.y <= b.y + b.height && 
           a.y + a.height >= b.y; // top y ekseninde player hizası içerisinde olması
}

function resetGame(direction) {
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: direction,
        velocityY: 3
    }
    player1.velocityY = 0;
    player2.velocityY = 0;
}


