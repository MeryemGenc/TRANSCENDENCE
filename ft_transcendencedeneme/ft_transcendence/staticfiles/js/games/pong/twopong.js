import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getGameRunning, setGameRunning, navigateTo}  from "../../index.js"
import { difficulty_level, ball_size}  from "../games.js"


let player1score = 0;
let player2score = 0;

let scene, camera, renderer;
let player1, player2, ball;
let keys = {};
let boardWidth = 800, boardHeight = 600;
let playerWidth = 8, playerHeight = 100;
let playerSpeed = 5;
let ballVelocityX = 3, ballVelocityY = 2;
let orbit;
let animationId;
let ballSize = 10;


export function popstate_two_players_game_events()
{
	stopGame();
	alert("Exiting the game.");
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
    const board_3d = document.getElementById("pong_board");
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
    let playerGeometry = new THREE.BoxGeometry(playerWidth, playerHeight, 20);
    let playerMaterial1 = new THREE.MeshStandardMaterial({ color: 0x3a98c9 });
    let playerMaterial2 = new THREE.MeshStandardMaterial({ color: 0x00f700 });

    // OYUNCU1
    player1 = new THREE.Mesh(playerGeometry, playerMaterial1);
    player1.position.set(-boardWidth / 2 + 30, 0, 0);
    scene.add(player1);

    // OYUNCU2
    player2 = new THREE.Mesh(playerGeometry, playerMaterial2);
    player2.position.set(boardWidth / 2 - 30, 0, 0);
    scene.add(player2);

    // TOP
    let sphereGeometry = new THREE.SphereGeometry(ballSize, 32, 32);
    let sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xf72d93 });
    ball = new THREE.Mesh(sphereGeometry, sphereMaterial);
    resetBall();
    scene.add(ball);

    // AÇIÇLAR (isteğe bağlı: zemin veya sınır olarak kullanılabilir)
    /*
    let planeGeometry = new THREE.PlaneGeometry(700, 500);
    let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, side: THREE.DoubleSide });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);
    */

    // Aydınlatma
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    // İsteğe bağlı: Görsel referans için sınır çizgilerini ekle
    addBoundaryLines();

    
    // Klavye olay dinleyicilerini ekle
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
}

// Oyun alanının üst ve alt sınır çizgilerini ekler
function addBoundaryLines() {
    const boundaryMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    const boundaryGeometryTop = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-boardWidth / 2, boardHeight / 2, 0),
        new THREE.Vector3(boardWidth / 2, boardHeight / 2, 0)
    ]);
    const boundaryTop = new THREE.Line(boundaryGeometryTop, boundaryMaterial);
    scene.add(boundaryTop);

    const boundaryGeometryBottom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-boardWidth / 2, -boardHeight / 2, 0),
        new THREE.Vector3(boardWidth / 2, -boardHeight / 2, 0)
    ]);
    const boundaryBottom = new THREE.Line(boundaryGeometryBottom, boundaryMaterial);
    scene.add(boundaryBottom);
}

// Topu merkeze sıfırlar ve hareket yönünü rastgele belirler
function resetBall() {
    // ball.position.set(0, 0, 0);
    // // Başlangıç yönünü rastgele belirle
    // ballVelocityX = Math.random() > 0.5 ? 3 : -3;
    // ballVelocityY = (Math.random() * 4) - 2; // Y yönlü hız -2 ile 2 arasında rastgele


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

	const angle = Math.random() * Math.PI * 2;

    // X ve Y hız bileşenlerini hesapla
    ballVelocityX = Math.cos(angle) * speed;
    ballVelocityY = Math.sin(angle) * speed;
}

export function startGame() {

	if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
	playerSpeed = 5;
    ballVelocityX = 3;
    ballVelocityY = 2;
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
    // console.log("animate");

    renderer.render(scene, camera);
}

// Oyun mantığını günceller
function updateGameLogic() {
    // if (!getGameRunning())
    //     return ;
    // console.log("update");
    // Oyuncu1 hareketi
    if (keys['w']) {
        player1.position.y += playerSpeed;
        if (player1.position.y + playerHeight / 2 > boardHeight / 2) {
            player1.position.y = boardHeight / 2 - playerHeight / 2;
        }
    }
    if (keys['s']) {
        player1.position.y -= playerSpeed;
        if (player1.position.y - playerHeight / 2 < -boardHeight / 2) {
            player1.position.y = -boardHeight / 2 + playerHeight / 2;
        }
    }

    // Oyuncu2 hareketi
    if (keys['arrowup']) {
        player2.position.y += playerSpeed;
        if (player2.position.y + playerHeight / 2 > boardHeight / 2) {
            player2.position.y = boardHeight / 2 - playerHeight / 2;
        }
    }
    if (keys['arrowdown']) {
        player2.position.y -= playerSpeed;
        if (player2.position.y - playerHeight / 2 < -boardHeight / 2) {
            player2.position.y = -boardHeight / 2 + playerHeight / 2;
        }
    }

    // Topun hareketi
    ball.position.x += ballVelocityX;
    ball.position.y += ballVelocityY;

    // Üst ve alt duvarlara çarpma
    if (ball.position.y + ball.geometry.parameters.radius >= boardHeight / 2) {
        ball.position.y = boardHeight / 2 - ball.geometry.parameters.radius;
        ballVelocityY = -ballVelocityY;
    }
    if (ball.position.y - ball.geometry.parameters.radius <= -boardHeight / 2) {
        ball.position.y = -boardHeight / 2 + ball.geometry.parameters.radius;
        ballVelocityY = -ballVelocityY;
    }

    // Oyuncu1 ile çarpışma
    if (ball.position.x - ball.geometry.parameters.radius <= player1.position.x + playerWidth / 2 &&
        ball.position.y <= player1.position.y + playerHeight / 2 &&
        ball.position.y >= player1.position.y - playerHeight / 2) {
        ball.position.x = player1.position.x + playerWidth / 2 + ball.geometry.parameters.radius;
        ballVelocityX = -ballVelocityX;
        // İsteğe bağlı: Her çarpışmada hız artır
        // increaseBallSpeed();
    }

    // Oyuncu2 ile çarpışma
    if (ball.position.x + ball.geometry.parameters.radius >= player2.position.x - playerWidth / 2 &&
        ball.position.y <= player2.position.y + playerHeight / 2 &&
        ball.position.y >= player2.position.y - playerHeight / 2) {
        ball.position.x = player2.position.x - playerWidth / 2 - ball.geometry.parameters.radius;
        ballVelocityX = -ballVelocityX;
        // İsteğe bağlı: Her çarpışmada hız artır
        // increaseBallSpeed();
    }

    // Puanlama
    if (ball.position.x - ball.geometry.parameters.radius > boardWidth / 2) {
        // Oyuncu1 puan kazandı
        player1score++;


		player1_up_point();
		
        resetBall();
    }
    if (ball.position.x + ball.geometry.parameters.radius < -boardWidth / 2) {
        // Oyuncu2 puan kazandı
        player2score++;

		player2_up_point();	

        resetBall();
    }   
    
    // score kontrol
    if (player1score >= 1 || player2score >= 1) {
		if (player1score == 1){
			alert("Player 1 Win!");
		}
		else if(player2score == 1) {
			alert("Player 2 Win!");
		}
		stopGame();
	return;
	}
}

function player2_up_point()
{
	const plyr2scr = document.getElementById('pong_score_player2');
	plyr2scr.style.color = "green"	
	setTimeout(() => {
		plyr2scr.style.color = 'white';
	}, 500);
	plyr2scr.textContent = player2score
}

function player1_up_point()
{
	const plyr2scr = document.getElementById('pong_score_player1');
	plyr2scr.style.color = "green";
	setTimeout(() => {
		plyr2scr.style.color = 'white';
	}, 500);
	plyr2scr.textContent = player1score
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

export function stopGame() {
    // Oyun devam ediyorsa durdur
    if (getGameRunning())
    { 
        // console.log("setGameRunning false");
        setGameRunning(false); 
        cancelAnimationFrame(animationId);
        animationId = null;
    }


    document.getElementById("pong_game_button").style.display = '';
    
    keys = {};
    
    cleanUpScene(); 
    // if (scoreContainer) {
    //     scoreContainer.remove();
    //     scoreContainer = null;
    // }
    // console.log("Oyun durduruldu.");
    player1score = 0;
    player2score = 0;
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
        const board_3d = document.getElementById("pong_board");
        if (board_3d && renderer.domElement.parentNode === board_3d) {
            board_3d.removeChild(renderer.domElement);
        }
        renderer = null;
    }

    // Sahne ve kamera temizle
    scene = null;
    camera = null;
}