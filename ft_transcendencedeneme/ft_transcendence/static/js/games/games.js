import { navigateTo } from "../index.js";

export let is_two = false;
export let ball_size = '';
export let difficulty_level = '';


export function games_customization(button_check, tournament_flag) {

	const modeSelect = document.getElementById("players_mod_select_id");
	const ball_modeSelect = document.getElementById("ball_mod_select_id");
	const difficulty_modeSelect = document.getElementById("difficulty_mod_select_id");

	const selectedOption = modeSelect.options[modeSelect.selectedIndex];
	const ballOption = ball_modeSelect.options[ball_modeSelect.selectedIndex];
	const difficultyOption = difficulty_modeSelect.options[difficulty_modeSelect.selectedIndex];

    const translateValue = selectedOption.getAttribute("data-translate");
	const translateValue_Ball = ballOption.getAttribute("data-translate")
	const translateValue_difficulty = difficultyOption.getAttribute("data-translate");

	if (translateValue_Ball === "Small_Ball")
		ball_size = "small";
	else
		ball_size = "big";

	if (translateValue_difficulty === "Easy")
		difficulty_level = "easy";
	else if (translateValue_difficulty === "Medium")
		difficulty_level = "medium";
	else if (translateValue_difficulty === "Hard")
		difficulty_level = "hard";

	if(tournament_flag)
		return;
	
    if (translateValue === "Two_Players") {
		twopong3d_settings(button_check);
    } else if (translateValue === "Four_Players") {
		fourpong3d_settings(button_check);
    }
}

function twopong3d_settings(button_check) {
		console.log('two');
		is_two = true;
		if (button_check)
			{
				navigateTo("/twopong3d");
			}
		setTimeout(() => {
		const player1name = document.getElementById('pong_t_player1');
		const player2name = document.getElementById('pong_t_player2');
		const player1img = document.getElementById('pong_img_plyr1');
		const player2img = document.getElementById('pong_img_plyr2');
		
		player1name.textContent = "Player 1";
		player1img.src = "./static/images/player1.png"
        player2name.textContent = "Player 2";
		player2img.src = "./static/images/player2.png"
	}, 200);
}

function fourpong3d_settings(button_check)
{
	console.log('four');
	is_two = false;
	if (button_check)
		{
			navigateTo("/fourpong3d"); 
		}
}

