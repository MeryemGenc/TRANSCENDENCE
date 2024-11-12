import { getGameRunning_3d,setGameRunning_3d, navigateTo, setGameRunning } from "../../index.js";
import { initializeConfettiCanvas } from './confetti.js';

export let game_entry_count = sessionStorage.getItem("gameEntryCount") 
    ? parseInt(sessionStorage.getItem("gameEntryCount"), 10) 
    : 1;

export function increaseCounter() {
	game_entry_count++;
	sessionStorage.setItem("gameEntryCount", game_entry_count);
}

export function setGame_entry_count(change)
{
	game_entry_count = change;
}

export function getGame_entry_count()
{
	return game_entry_count;
}

export let firstplayer3d = {
	index: 10,
	score: 0,
};

export let secondplayer3d = {
	index: 10,
	score: 0,
};

let player1 = {
	name: '',
	win: false,
	index: 0,
	imgsrc: '',
	elimination: false,
};

let player2 = {
	name: '',
	win: false,
	index: 1,
	imgsrc: '',
	elimination: false,
};

let player3 = {
	name: '',
	win: false,
	index: 2,
	imgsrc: '',
	elimination: false,
};

let player4 = {
	name: '',
	win: false,
	index: 3,
	imgsrc: '',
	elimination: false,
};

let next_players = [];

player1.imgsrc = "./static/images/player1.png"
player2.imgsrc = "./static/images/player2.png"
player3.imgsrc = "./static/images/player3.png"
player4.imgsrc = "./static/images/player4.png"

let playersMap = new Map();

playersMap.set(0,player1);
playersMap.set(1,player2);
playersMap.set(2,player3);
playersMap.set(3,player4);

export function popstate_tournament_events()
{
	if (getGameRunning_3d())
		setGameRunning_3d(false);
		alert('Exiting the tournament.');
		if (window.location.pathname === '/games')
			{
				hideModal('Modal-tournament-match');
				hideModal('Modal-tournament');
			}
		exit_tournament();
}

export function hideModal(modalId) {
    const modalElement = document.getElementById(modalId);
    
    if (!modalElement) {
        console.warn(`Modal with ID ${modalId} not found.`);
        return;
    }
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();
}

function are_nicknames_unique(player1, player2, player3, player4)
{
    const nicknames = new Set([player1, player2, player3, player4]);
    return nicknames.size === 4;
}

function addPlayers(name1, name2, name3, name4) {
    if (name1 && name2 && name3) {
		player1.name = name1;
		player2.name = name2;
		player3.name = name3;
		player4.name = name4;
        return true;
    } else {
        return false;
    }
}

function validatePlayers(...names) {
    return names.every(name => name.trim() !== '');
}

function capitalizeFirstLetter(name) {
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function find_key_by_playername(name) {
	for (let [key, player] of playersMap) {
		if (player.name === name) {
			return key;
        }
    }
    return null;
}

export function save_btn_events()
{
	document.body.style.overflow = 'hidden';
	player1.name = document.getElementById('player1').value;
    player2.name = document.getElementById('player2').value;
    player3.name = document.getElementById('player3').value;
	player4.name = document.getElementById('player4').value;
	
	player1.name = capitalizeFirstLetter(player1.name);
    player2.name = capitalizeFirstLetter(player2.name);
    player3.name = capitalizeFirstLetter(player3.name);
	player4.name = capitalizeFirstLetter(player4.name);
	
    if (addPlayers(player1.name, player2.name, player3.name, player4.name)) {
		const is_unique = are_nicknames_unique(player1.name, player2.name, player3.name, player4.name);
		if(!is_unique)
			{
				alert('Players are not unique');
				return;
			}
		alert('Players saved successfully!');
        hideModal('Modal-tournament');
		matching();
		var match_modal = new bootstrap.Modal(document.getElementById('Modal-tournament-match'), {
			backdrop: 'static',
			keyboard: false
		});
		match_modal.show();
    } else {
		alert('Please fill in all nickname fields.');
    }
}

export function start_btn_events()
{
	hideModal('Modal-tournament');
	const firstplayerName = document.getElementById('modal_first_player').textContent;
	const secondplayerName = document.getElementById('modal_second_player').textContent;

	const firstplayerKey = find_key_by_playername(firstplayerName);
	const secondplayerKey = find_key_by_playername(secondplayerName);

	if (playersMap.has(firstplayerKey)) {
		const firstplayer = playersMap.get(firstplayerKey);
		firstplayer3d.index = firstplayer.index;
		document.getElementById('img_plyr1').src = firstplayer.imgsrc;
		document.getElementById('t_player1').textContent = firstplayer.name;
	}

	if (playersMap.has(secondplayerKey)) {
		const secondplayer = playersMap.get(secondplayerKey);
		secondplayer3d.index = secondplayer.index;
		document.getElementById('img_plyr2').src = secondplayer.imgsrc;
		document.getElementById('t_player2').textContent = secondplayer.name;
	}
}

export function second_match(winnerPlayerIndex, game_entry_count)
{
	document.getElementById('score_player1').textContent = '0';
	document.getElementById('score_player2').textContent = '0';
	document.getElementById('img_plyr1').src = '#';
	document.getElementById('t_player1').textContent = '';
	document.getElementById('img_plyr2').src = '#';
	document.getElementById('t_player2').textContent = '';

	var match_modal = new bootstrap.Modal(document.getElementById('Modal-tournament-match'), {
		backdrop: 'static',
		keyboard: false
	});
	match_modal.show();
	let first_winnerplayer;
	let second_winnerplayer;
	let third_winnerplayer;

	if(game_entry_count == 2){
		next_matches_for();
		if (playersMap.has(winnerPlayerIndex)) {
			first_winnerplayer = playersMap.get(winnerPlayerIndex);
			document.getElementById('modal_img_waiting_player1').src = first_winnerplayer.imgsrc;
			document.getElementById('modal_waiting_player1').textContent = first_winnerplayer.name;
		}
		document.getElementById('modal_waiting2_div').style.display = 'none';
		document.getElementById('modal_waiting1_div').classList.remove('border-end');
	}
	else if(game_entry_count == 3)
	{
		let first_winnerplayer_name = '';
		first_winnerplayer_name = document.getElementById('modal_waiting_player1').textContent;
		first_winnerplayer = playersMap.get(find_key_by_playername(first_winnerplayer_name));
		if (playersMap.has(winnerPlayerIndex)) {
			second_winnerplayer = playersMap.get(winnerPlayerIndex);

			document.getElementById('modal_img_first_player').src = first_winnerplayer.imgsrc;
			document.getElementById('modal_first_player').textContent = first_winnerplayer.name;
			
			document.getElementById('modal_img_second_player').src = second_winnerplayer.imgsrc;
			document.getElementById('modal_second_player').textContent = second_winnerplayer.name;
			document.getElementById('modal_waiting1_div').style.display = 'none';
			document.getElementById('modal_h5_waiting').style.display = 'none';
		}
	}
	else if (game_entry_count == 4)
	{
			if (playersMap.has(winnerPlayerIndex)) {
				third_winnerplayer = playersMap.get(winnerPlayerIndex);
				initializeConfettiCanvas();
				document.getElementById('modal_h5_modalname').textContent = 'Winner!';
				document.getElementById('modal_h5_modalname').classList.add('fs-1', 'text-bold');
				document.getElementById('modal_h5_modalname').style.color = 'green';
				document.getElementById('modal_second_player_div').style.display = 'none';
				document.getElementById('modal_vs_icon_div').style.display = 'none';
				document.getElementById('modal_img_first_player').src = third_winnerplayer.imgsrc;
				document.getElementById('modal_first_player').textContent = third_winnerplayer.name;
				document.getElementById('modal_first_player_div').classList.remove('border-end');
				document.getElementById('modal_body_row_div').classList.remove('row');
				document.getElementById('modal_body_row_div').classList.add('d-flex', 'justify-content-center', 'align-items-center');
				document.getElementById('start_btn').style.display = 'none';

				const oldFinishButton = document.getElementById('finish_btn');
				if (oldFinishButton) {
					oldFinishButton.remove();
				}

				let newButton = document.createElement('button');
				newButton.id = 'finish_btn';
				newButton.innerHTML = 'Finish';
				newButton.classList.add('btn', 'btn-success', 'w-100');
				let finish_btn_container = document.getElementById('modal_footer_div_button');
				finish_btn_container.appendChild(newButton);

				document.getElementById('finish_btn').addEventListener('click', function() {
					navigateTo('/games');
					exit_tournament();
					reset_elements();
			});
		}
	}
}

function next_matches_for()
{
	let firstplayer = next_players[0];
	let secondplayer = next_players[1];
	document.getElementById('modal_img_first_player').src = firstplayer.imgsrc;
	document.getElementById('modal_first_player').textContent = firstplayer.name;

	document.getElementById('modal_img_second_player').src = secondplayer.imgsrc;
	document.getElementById('modal_second_player').textContent = secondplayer.name;
}

function randomTwoIndex() {
	let index = [];
    
    while (index.length < 2) {
		const randomIndex = Math.floor(Math.random() * 3);
        if (!index.includes(randomIndex)) {
			index.push(randomIndex);
        }
    }
    return index;
}

function matching() {
    const index = randomTwoIndex();

    let firstplayer;
    let secondplayer;

    if (playersMap.has(index[0])) {
        firstplayer = playersMap.get(index[0]);
    }
    if (playersMap.has(index[1])) {
        secondplayer = playersMap.get(index[1]);
    }

    const remainingIndexes = [0, 1, 2, 3].filter(i => !index.includes(i));

    let thirdplayer;
    let fourthplayer;

    if (playersMap.has(remainingIndexes[0])) {
        thirdplayer = playersMap.get(remainingIndexes[0]);
    }
    if (playersMap.has(remainingIndexes[1])) {
        fourthplayer = playersMap.get(remainingIndexes[1]);
    }

    tournament_modal_put_image_and_name(firstplayer, secondplayer, thirdplayer, fourthplayer);
	next_players.push(thirdplayer);
	next_players.push(fourthplayer);
}

function tournament_modal_put_image_and_name(firstplayer, secondplayer, thirdplayer, fourthplayer)
{
		document.getElementById('modal_img_first_player').src = firstplayer.imgsrc;
		document.getElementById('modal_first_player').textContent = firstplayer.name;

		document.getElementById('modal_img_second_player').src = secondplayer.imgsrc;
		document.getElementById('modal_second_player').textContent = secondplayer.name;

		document.getElementById('modal_img_waiting_player1').src = thirdplayer.imgsrc;
		document.getElementById('modal_waiting_player1').textContent = thirdplayer.name;

		document.getElementById('img_waiting_player2').src = fourthplayer.imgsrc;
		document.getElementById('modal_waiting_player2').textContent = fourthplayer.name;
}

export function exit_tournament()
{
	hideModal('Modal-tournament-match');
	next_players.pop();
	next_players.pop();
	game_entry_count = 1;
	sessionStorage.setItem("gameEntryCount", game_entry_count);
	
}

function reset_elements()
{
	document.getElementById('player1').value = '';
	document.getElementById('player2').value = '';
	document.getElementById('player3').value = '';
	document.getElementById('player4').value = '';
	document.getElementById('modal_waiting2_div').style.display = '';
	document.getElementById('modal_waiting1_div').classList.add('border-end');
	document.getElementById('modal_waiting1_div').style.display = '';
	document.getElementById('modal_h5_waiting').style.display = '';
	document.getElementById('modal_second_player_div').style.display = '';
	document.getElementById('modal_vs_icon_div').style.display = '';
	document.getElementById('start_btn').style.display = '';
	document.getElementById('modal_first_player_div').classList.add('border-end');
	document.getElementById('modal_body_row_div').classList.add('row');
	document.getElementById('modal_body_row_div').classList.remove('d-flex', 'justify-content-center', 'align-items-center');
	document.getElementById('modal_h5_modalname').classList.remove('fs-1', 'text-bold');
	if (document.getElementById('finish_btn'))
		document.getElementById('finish_btn').style.display = 'none';
	document.getElementById('modal_h5_modalname').style.color = 'white';
}