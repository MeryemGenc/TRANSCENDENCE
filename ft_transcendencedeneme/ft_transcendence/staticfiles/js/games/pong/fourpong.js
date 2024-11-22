import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getGameRunning, setGameRunning, navigateTo}  from "../../index.js"
import { difficulty_level, ball_size}  from "../games.js"


let player1score = 0;
let player2score = 0;
let player3score = 0;
let player4score = 0;

let scene, camera, renderer;
let player1, player2, player3, player4, ball;
let keys = {};
let boardWidth = 600, boardHeight = 600;
let board_size = 600;
let playerWidth = 8, playerHeight = 100;
let playerSpeed = 5;
let ballVelocityX = 3, ballVelocityY = 3;
let orbit;
let animationId;
let hitBall = 5;
let ballSize = 10;


export function popstate_four_players_game_events()
{
	stopGameFour();
	alert('Exiting the game.');
}

function keyDown(event) {
    keys[event.key.toLowerCase()] = true;
}

// Tuş bırakıldığında çalışacak fonksiyon
function keyUp(event) {
    keys[event.key.toLowerCase()] = false;
}

function initialGame_3d() {

	if (ball_size === "small")
		ballSize = 10;
	else if (ball_size === "big")
		ballSize = 20;

    // scoreContainer = document.createElement('div');
    // console.log("\nplayer1score: " + player1Score + "\nplayer2score: " + player2Score)
    // Renderer, sahne ve kamera ayarları
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(boardWidth, boardHeight);
    const board_3d = document.getElementById("four_pong_board");
    renderer.setClearColor(0x020305); // Arka plan rengini ayarla
    board_3d.appendChild(renderer.domElement);
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, boardWidth / boardHeight, 0.1, 1000);
    camera.position.set(0, 0, 400);

    // OrbitControls (isteğe bağlı: sabit bir kamera için kaldırılabilir)
    orbit = new OrbitControls(camera, renderer.domElement);
    // orbit.enableRotate = false; // Döndürmeyi devre dışı bırak
    // orbit.enableZoom = false;   // Yakınlaştırmayı devre dışı bırak

    // Nesneleri oluştur
    let playerGeometryX = new THREE.BoxGeometry(playerWidth, playerHeight, 20);
	let playerGeometryY = new THREE.BoxGeometry(playerHeight, playerWidth, 20);
    let playerMaterial1 = new THREE.MeshStandardMaterial({ color: 0x3a98c9 });
    let playerMaterial2 = new THREE.MeshStandardMaterial({ color: 0xf72d93 });
	let playerMaterial3 = new THREE.MeshStandardMaterial({ color: 0x00f700 });
	let playerMaterial4 = new THREE.MeshStandardMaterial({ color: 0xffff00 });

	const positions = [
        { x: 0, y: board_size / 2 - playerHeight / 8 }, // Üst
        { x: board_size / 2 - playerHeight / 8, y: 0 }, // Sağ
        { x: 0, y: -board_size / 2 + playerHeight / 8 }, // Alt
        { x: -board_size / 2 + playerHeight / 8, y: 0 }  // Sol
    ];

	// sol oyuncu
    player1 = new THREE.Mesh(playerGeometryX, playerMaterial1);
    player1.position.set(positions[3].x,positions[3].y, 0);
    scene.add(player1);

    // üst oyuncu
    player2 = new THREE.Mesh(playerGeometryY, playerMaterial2);
    player2.position.set(positions[0].x,positions[0].y, 0);
    scene.add(player2);

	// sağ oyuncu
	player3 = new THREE.Mesh(playerGeometryX, playerMaterial3);
    player3.position.set(positions[1].x,positions[1].y, 0);
    scene.add(player3);

	// alt oyuncu
	player4 = new THREE.Mesh(playerGeometryY, playerMaterial4);
    player4.position.set(positions[2].x,positions[2].y, 0);
    scene.add(player4);

    // TOP
    let sphereGeometry = new THREE.SphereGeometry(ballSize, 30, 30);
    let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xf72d93 });
    ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
    resetBall();
    scene.add(ball);

    // Aydınlatma
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Klavye olay dinleyicileri
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}

// Topu merkeze sıfırlar
function resetBall() {

	let speed = 3;
	if (difficulty_level === "easy"){
		speed = 3;
	}
	else if (difficulty_level === "medium"){
		speed = 5;
	}
	else if (difficulty_level === "hard"){
		speed = 7;
	}


    ball.position.set(0, 0, 0);
	hitBall = 5;

	const angle = Math.random() * Math.PI * 2;

    // X ve Y hız bileşenlerini hesapla
    ballVelocityX = Math.cos(angle) * speed;
    ballVelocityY = Math.sin(angle) * speed;
}

export function four_start_game() {

	if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
	playerSpeed = 5;
    // ballVelocityX = 3;
    // ballVelocityY = 2;
    setGameRunning(true);
    initialGame_3d();
    animate();
}

// Animasyon döngüsü
function animate() {
    
    animationId = requestAnimationFrame(animate);
    orbit.update();
    
    updateGameLogic();
    
    if (!getGameRunning() || !renderer || !scene || !camera) {
        console.log("Renderer, scene or camera is not defined.");
        return;
    }

    renderer.render(scene, camera);
}

// Oyun mantığını günceller
function updateGameLogic() {

	// player1 hareket
    if (keys['w']) {
		player1.position.y += playerSpeed;
		// oyun alanından çıkışı ve diğer paddle ile çarpışmayı engeller
		if (player1.position.y >= 235){
			player1.position.y = 235;
		
		}
    }
    if (keys['s']) {
		player1.position.y -= playerSpeed;
		// oyun alanından çıkışı ve diğer paddle ile çarpışmayı engeller
		if (player1.position.y <= -235) {
			player1.position.y = -235;
		}
    }

    // player3 hareketi
    if (keys['arrowup']) {
        player3.position.y += playerSpeed;

		if((player3.position.y) >= 235)
			{
				player3.position.y = 235;
			}
    }
    if (keys['arrowdown']) {
        player3.position.y -= playerSpeed;

		if (player3.position.y <= -235) {
			player3.position.y = -235;
		}
    }

	// player2 hareketi
	if (keys['h']) {
		player2.position.x += playerSpeed;

		if (player2.position.x >= 235) {
			player2.position.x = 235;
		}
		
	}
	
	if (keys['y']) {
		player2.position.x -= playerSpeed;
		// oyun alanından çıkışı engeller
		
		if (player2.position.x <= -235) {
			player2.position.x = -235;
		}
	}
	
	// player4 hareketi
	if (keys['l']) {
		player4.position.x += playerSpeed;

		if (player4.position.x >= 235) {
			player4.position.x = 235;
		}
		
	}

	if (keys['o']) {
		player4.position.x -= playerSpeed;
		// oyun alanından çıkışı engeller
		if (player4.position.x <= -235) {
			player4.position.x = -235;
		}
	}

    // Topun hareketi
    ball.position.x += ballVelocityX;
    ball.position.y += ballVelocityY;

    // ÇARPIŞMA


	// Sağ paddle ile çarpışma
	if (
	    ball.position.x + ball.geometry.parameters.radius >= player3.position.x - playerWidth / 2 && 
		ball.position.y <= player3.position.y + playerHeight / 2 &&
		ball.position.y >= player3.position.y - playerHeight / 2
	) {
	    ballVelocityX = -ballVelocityX;
	    hitBall = 3;
		
	}
	
	// Sol paddle ile çarpışma
	if (
	    ball.position.x - ball.geometry.parameters.radius <= player1.position.x + playerWidth / 2 &&
	    ball.position.y <= player1.position.y + playerHeight / 2 &&
	    ball.position.y >= player1.position.y - playerHeight / 2
	) {
	    ball.position.x = player1.position.x + playerWidth / 2 + ball.geometry.parameters.radius;
	    ballVelocityX = -ballVelocityX;
		hitBall = 1;
	}
	
	// Üst paddle ile çarpışma
	if (
	    ball.position.y + ball.geometry.parameters.radius >= player2.position.y - playerWidth / 2 &&
		ball.position.x <= player2.position.x + playerHeight / 2 &&
		ball.position.x >= player2.position.x - playerHeight / 2
	) {
	    // ball.position.y = player2.position.y - playerHeight / 2 - ball.geometry.parameters.radius;
	    ballVelocityY = -ballVelocityY;
		hitBall = 2;
		
	}
	
	// Alt paddle ile çarpışma
	if (
	    ball.position.y - ball.geometry.parameters.radius <= player4.position.y - playerWidth / 2 &&
		ball.position.x <= player4.position.x + playerHeight / 2 &&
		ball.position.x >= player4.position.x - playerHeight / 2
	) {
	    ballVelocityY = -ballVelocityY;
		hitBall = 4;
	}

	// Sağ kenardan dışarı çıkarsa
	if (ball.position.x - ball.geometry.parameters.radius > boardWidth / 2) {
		score_update(hitBall);

	    resetBall(); // Topu sıfırla, puan eklenmez
	}

	// Sol kenardan dışarı çıkarsa
	else if (ball.position.x + ball.geometry.parameters.radius < -boardWidth / 2) {
		score_update(hitBall);
	    resetBall(); // Topu sıfırla, puan eklenmez
	}

	// Üst kenardan dışarı çıkarsa
	else if (ball.position.y + ball.geometry.parameters.radius > boardHeight / 2) {
		score_update(hitBall);
	    resetBall(); // Topu sıfırla, puan eklenmez
	}
	// Alt kenardan dışarı çıkarsa
	else if (ball.position.y - ball.geometry.parameters.radius < -boardHeight / 2) {
		score_update(hitBall);
	    resetBall(); // Topu sıfırla, puan eklenmez
	}   
	
    // score kontrol
    if (player1score >= 2 || player2score >= 2 || player3score >= 2 || player4score >= 2) {
		if (player1score == 2){
			alert("Player 1 Win!");
		}
		else if(player2score == 2) {
			alert("Player 2 Win!");
		}
		else if(player3score == 2) {
			alert("Player 3 Win!");
		}
		else if(player4score == 2) {
			alert("Player 4 Win!");
		}
		stopGameFour();
	return;
	}
}

function player2_up_point()
{
	const player_score = document.getElementById('four_pong_score_2');
	player_score.style.color = "green"	
	setTimeout(() => {
		player_score.style.color = 'white';
	}, 500);
	player_score.textContent = player2score
}

function player1_up_point()
{
	const player_score = document.getElementById('four_pong_score_1');
	player_score.style.color = "green";
	setTimeout(() => {
		player_score.style.color = 'white';
	}, 500);
	player_score.textContent = player1score
}

function player3_up_point()
{
	const player_score = document.getElementById('four_pong_score_3');
	player_score.style.color = "green"
	setTimeout(() => {
		player_score.style.color = 'white';
	}, 500);
	player_score.textContent = player3score
}

function player4_up_point()
{
	const player_score = document.getElementById('four_pong_score_4');
	player_score.style.color = "green";
	setTimeout(() => {
		player_score.style.color = 'white';
	}, 500);
	player_score.textContent = player4score
}

// Topun hızını artırır (isteğe bağlı)
// function increaseBallSpeed() {
//     // Hızı çok hızlı olmasını engellemek için sınır koy
//     const maxSpeed = 10;
//     ballVelocityX = ballVelocityX > 0 ? Math.min(ballVelocityX + 0.5, maxSpeed) : Math.max(ballVelocityX - 0.5, -maxSpeed);
//     ballVelocityY = ballVelocityY > 0 ? Math.min(ballVelocityY + 0.5, maxSpeed) : Math.max(ballVelocityY - 0.5, -maxSpeed);
// }

// Puanları günceller

// function updateScore() {
//     scoreElement1.innerText = `Oyuncu 1: ${player1Score}`;
//     scoreElement2.innerText = `Oyuncu 2: ${player2Score}`;
// }

function score_update(hitball_number)
{
	switch(hitball_number){
		case 1:
			player1score++;
			player1_up_point();
			break;
		case 2:
			player2score++;
			player2_up_point();
			break;
		case 3:
			player3score++;
			player3_up_point();
			break;
		case 4:
			player4score++;
			player4_up_point();
			break;
	}

}

export function stopGameFour() {
    // Oyun devam ediyorsa durdur
    if (getGameRunning()) 
    { 
        // console.log("setGameRunning false");
        setGameRunning(false); 
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    document.getElementById("four_pong_play_button").style.display = '';
	document.getElementById("four_pong_score_1").textContent = 0;
	document.getElementById("four_pong_score_2").textContent = 0;
	document.getElementById("four_pong_score_3").textContent = 0;
	document.getElementById("four_pong_score_4").textContent = 0;
    
    keys = {};
    
    cleanUpScene(); 
    // if (scoreContainer) {
    //     scoreContainer.remove();
    //     scoreContainer = null;
    // }
    // console.log("Oyun durduruldu.");
    player1score = 0;
	player2score = 0;
	player3score = 0;
    player4score = 0;
	console.log('game is finish');
    // updateScore();
}

// Sahneyi temizler
function cleanUpScene() {
    // Tüm nesneleri sahneden kaldır
    while (scene && scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // OrbitControls'u devre dışı bırak
    if (orbit) {
        orbit.dispose();
        orbit = null;
    }

    // Render'ı durdur ve DOM'dan kaldır
    if (renderer) {
        renderer.dispose();
        const board_3d = document.getElementById("four_pong_board");
        if (board_3d && renderer.domElement.parentNode === board_3d) {
            board_3d.removeChild(renderer.domElement);
        }
        renderer = null;
    }

    // Sahne ve kamera temizle
    scene = null;
    camera = null;
}