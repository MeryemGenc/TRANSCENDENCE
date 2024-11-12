import { navigateTo } from "../index.js";


// pong3D
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#pong_3d_play_button")) {   
//             set_vars_pong3d(document.querySelector('.pong3d-form-select-player'), document.querySelector('.pong3d-form-select-theme'), document.querySelector('.pong3d-form-select-difficulty'));
//             navigateTo('/pong3d'); 
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", () => {
// 	document.body.addEventListener("click", e => {
// 		if (e.target.matches("#pong_play_button")) {
// 			navigateTo('/pong3d');
// 		}
// 	});
// });

export let is_two = false;

export function games_customization(modeSelect) {

	document.getElementById("pong_score_player1").textContent = '0';
	document.getElementById("pong_score_player2").textContent = '0';
	
    const selectedOption = modeSelect.options[modeSelect.selectedIndex];
    const translateValue = selectedOption.getAttribute("data-translate");

	const player1name = document.getElementById('pong_t_player1');
	const player2name = document.getElementById('pong_t_player2');
	const player1img = document.getElementById('pong_img_plyr1');
	const player2img = document.getElementById('pong_img_plyr2');


    if (!player1name || !player2name) {
        console.log('Player elements not found');
        return;
    }
	console.log("game custom");

    if (translateValue === "Two_Players") {
		console.log('two');
		is_two = true;
		player1name.textContent = "Player 1";
		player1img.src = "./static/images/player1.png"
        player2name.textContent = "Player 2";
		player2img.src = "./static/images/player2.png"
    } else if (translateValue === "Four_Players") {
		console.log('four');
		is_two = false;
		navigateTo("fourpong3d");        
    }
}


// eski event listenerlar
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#pong3d_turnuva_button")) { 
//             const playerMode = document.querySelector('.pong3d-form-select-player');
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.pong3d-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             const difficulty = document.querySelector('.pong3d-form-select-difficulty');
//             const selectedDifficulty = difficulty.options[difficulty.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedDifficulty);
//             navigateTo('/turnuva3dpong'); 
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#pong_turnuva_button")) { 
//             const playerMode = document.querySelector('.pong3d-form-select-player');    
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.pong3d-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             const difficulty = document.querySelector('.pong3d-form-select-difficulty');
//             const selectedDifficulty = difficulty.options[difficulty.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedDifficulty);
//             navigateTo('/turnuvapong'); 
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#tictactoe_play_button")) { 
//             const playerMode = document.querySelector('.ttt-form-select-player');    
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.ttt-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             navigateTo('/tictactoe'); 
//         }
//     });
// });




