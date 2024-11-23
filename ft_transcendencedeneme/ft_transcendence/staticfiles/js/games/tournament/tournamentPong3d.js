import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getGameRunning_3d, setGameRunning_3d}  from "../../index.js"
import { navigateTo } from "../../index.js";
import {second_match, firstplayer3d, secondplayer3d, game_entry_count, increaseCounter, exit_tournament, hideModal} from './tournament.js'
import { difficulty_level, ball_size}  from "../games.js"
// import { post_game_score }  from "../../api.js"


firstplayer3d.score = 0;
secondplayer3d.score = 0;

let scene, camera, renderer;
let player1, player2, ball;
// export let player1Score = 0, player2Score = 0;
let keys = {};
let boardWidth = 800, boardHeight = 600;
let playerWidth = 8, playerHeight = 100;
let playerSpeed = 5;
let ballVelocityX = 3, ballVelocityY = 3;
let orbit;
let animationId;
let isPaused = false;
let ballSize = 10;


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

	document.getElementById("pause_button_tournament").disabled = false;

    // scoreContainer = document.createElement('div');
    // console.log("\nplayer1score: " + player1Score + "\nplayer2score: " + player2Score)
    // Renderer, sahne ve kamera ayarları
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(boardWidth, boardHeight);
    const board_3d = document.getElementById("board_3d");
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

	let speed = 0;

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

	let angle;

	// Sağ çapraz (0 - π/6 ve 11π/6 - 2π arası)
	if (Math.random() < 0.5) {
	    angle = Math.random() * (Math.PI / 6) + (Math.random() < 0.5 ? 0 : 11 * Math.PI / 6);
	} 
	// Sol çapraz (5π/6 - π ve π - 7π/6 arası)
	else {
	    angle = Math.random() * (Math.PI / 6) + 5 * Math.PI / 6;
	}

	ballVelocityX = Math.cos(angle) * speed;
	ballVelocityY = Math.sin(angle) * speed;
}

export function startGame_3d() {
	if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
	isPaused = false;
	playerSpeed = 5;
    ballVelocityX = 3;
    ballVelocityY = 3;
    setGameRunning_3d(true);
    initialGame_3d();
	if (getGameRunning_3d())
    	animate();

}

// Animasyon döngüsü
function animate() {

	if (isPaused) return;

    animationId = requestAnimationFrame(animate);

    if (orbit && orbit.update) {
        orbit.update();
    }

    updateGameLogic();

    if (!getGameRunning_3d() || !renderer || !scene || !camera) {
        console.log("Renderer, scene or camera is not defined.");
        
        // Döngüyü durdurmak için cancelAnimationFrame kullanın
        cancelAnimationFrame(animationId);
        return;
    }

    renderer.render(scene, camera);
}

function detectCollisionRegion(ballY, paddleY, paddleHeight) {
    const thirdHeight = paddleHeight / 3;

    const upperBoundary = paddleY + (paddleHeight / 2);
    const middleBoundaryTop = paddleY + (thirdHeight / 2);
    const middleBoundaryBottom = paddleY - (thirdHeight / 2);
    const lowerBoundary = paddleY - (paddleHeight / 2);

    if (ballY > middleBoundaryTop && ballY <= upperBoundary) {
        return 'upper';
    } else if (ballY >= middleBoundaryBottom && ballY <= middleBoundaryTop) {
        return 'middle';
    } else if (ballY < middleBoundaryBottom && ballY >= lowerBoundary) {
        return 'lower';
    } else {
        return 'none';
    }
}

// Oyun mantığını günceller
function updateGameLogic() {
    if (!getGameRunning_3d())
        return ;
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
		const region = detectCollisionRegion(ball.position.y, player1.position.y, 100);
    	if (region === 'upper') {
    	    ballVelocityY += 1;
    	    ballVelocityX *= -1;
    	} else if (region === 'lower') {
    	    ballVelocityY -= 1;
    	    ballVelocityX *= -1;
    	} else if (region === 'middle') {
    	    ballVelocityX *= -1;
    	}
    }

    // Oyuncu2 ile çarpışma
    if (ball.position.x + ball.geometry.parameters.radius >= player2.position.x - playerWidth / 2 &&
        ball.position.y <= player2.position.y + playerHeight / 2 &&
        ball.position.y >= player2.position.y - playerHeight / 2) {

        ball.position.x = player2.position.x - playerWidth / 2 - ball.geometry.parameters.radius;
		const region = detectCollisionRegion(ball.position.y, player2.position.y, 100);
    	if (region === 'upper') {
    	    ballVelocityY += 1;
    	    ballVelocityX *= -1;
    	} else if (region === 'lower') {
    	    ballVelocityY -= 1;
    	    ballVelocityX *= -1;
    	} else if (region === 'middle') {
    	    ballVelocityX *= -1;
    	}
    }

    // Puanlama
    if (ball.position.x - ball.geometry.parameters.radius > boardWidth / 2) {
        // Oyuncu1 puan kazandı
        firstplayer3d.score++;


		player1_up_point();
		
        resetBall();
    }
    if (ball.position.x + ball.geometry.parameters.radius < -boardWidth / 2) {
        // Oyuncu2 puan kazandı
        secondplayer3d.score++;

		player2_up_point();	

        resetBall();
    }   
    
    // score kontrol
    if (firstplayer3d.score >= 1 || secondplayer3d.score >= 1) {
		increaseCounter();
		if (firstplayer3d.score == 1){
			alert("Player 1 " + translate("g_WIN"));
			second_match(firstplayer3d.index, game_entry_count);
		}
		else if(secondplayer3d.score == 1) {
			alert("Player 2 " + translate("g_WIN"));
			second_match(secondplayer3d.index,game_entry_count);
		}
		stopGame_3d();
	return;
	}
}

function player2_up_point()
{
	const plyr2scr = document.getElementById('score_player2');
	plyr2scr.style.color = "green"	
	setTimeout(() => {
		plyr2scr.style.color = 'white';
	}, 500);
	plyr2scr.textContent = secondplayer3d.score
}

function player1_up_point()
{
	const plyr2scr = document.getElementById('score_player1');
	plyr2scr.style.color = "green";
	setTimeout(() => {
		plyr2scr.style.color = 'white';
	}, 500);
	plyr2scr.textContent = firstplayer3d.score
}

export function stopGame_3d() {
    // Oyun devam ediyorsa durdur
    if (getGameRunning_3d())
    { 
        // console.log("setGameRunning_3d false");
        setGameRunning_3d(false);
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    document.getElementById("tournament_game_button").style.display = '';
    
    keys = {};
    
    cleanUpScene();
    firstplayer3d.score = 0;
    secondplayer3d.score = 0;
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
        const board_3d = document.getElementById("board_3d");
        if (board_3d && renderer.domElement.parentNode === board_3d) {
            board_3d.removeChild(renderer.domElement);
        }
        renderer = null;
    }

    // Sahne ve kamera temizle
    scene = null;
    camera = null;
}

export function pauseGameTournament() {
    isPaused = true;
    cancelAnimationFrame(animationId);
    console.log("Game paused");
	document.getElementById("pause_button_tournament_img").src = "./static/images/resume.png";
	return isPaused;
}

export function resumeGameTournament() {
    if (isPaused) {
        isPaused = false;
        animate();
        console.log("Game resumed");
		document.getElementById("pause_button_tournament_img").src = "./static/images/pause.png";
		return isPaused;
    }
}