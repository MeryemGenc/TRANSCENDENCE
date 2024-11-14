import Dashboard from "./views/Dashboard.js";
import Games from "./views/Games.js";
import { g_data } from "./api.js";
// import { turnuvaMode } from "./games/games.js";
import TournamentPong from "./views/TournamentPong.js";
import TwoPong3d from "./views/TwoPong3d.js";
// import Tictactoe from "./views/Tictactoe.js"; 
import Settings from "./views/Settings.js";
import Login from "./views/Login.js";
import FourPong3d from "./views/FourPong3d.js";

import { fetchProtectedData, deleteUserAccount } from "./api.js";
import { login_init, isAuthenticated } from "./login/login.js";


import { popstate_two_players_game_events, startGame } from "./games/pong/twopong.js";
import { startGame_3d } from "./games/tournament/tournamentPong3d.js";
import { getGame_entry_count, setGame_entry_count, save_btn_events, start_btn_events, popstate_tournament_events } from "./games/tournament/tournament.js";
import { initializeConfettiCanvas } from "./games/tournament/confetti.js";
import { loadLanguage, initializeLanguage, translate, applyTranslations } from "./LanguageManager.js";
import { profile_img_src, SettingsEvents, save_button_events } from "./settings/setting.js";
import { games_customization } from "./games/games.js";

// PONG - oyun durumu yönetimi
let gameRunning = false;
export function setGameRunning(value) { gameRunning = value; }
export function getGameRunning() { return gameRunning; }

// PONG3D - oyun durumu yönetimi
let gameRunning_3d = false;
export function setGameRunning_3d(value) { gameRunning_3d = value; }
export function getGameRunning_3d() { return gameRunning_3d; }

// // TICTACTOE - oyun durumu yönetimi
// let ttt_gameRunning = false;
// export function ttt_setGameRunning(value) { ttt_gameRunning = value; }
// export function ttt_getGameRunning() { return ttt_gameRunning; }

let auth_flag = 0;
export const navigateTo = url => {
	if (isAuthenticated())
	{
		fetchProtectedData();
		sessionStorage.setItem("previousPath", url);
		history.pushState({ pathname: url }, null, url);
	}
	else {

		const navbar = document.querySelector('#main_navbar');
        navbar.style = "display: none!important;";
		console.log("dfdfds");
	}
	if(auth_flag)
	{
		sessionStorage.setItem("previousPath", url);
		history.pushState({ pathname: url }, null, url);
	}
    router();
};

const router = async () => {

	if (!isAuthenticated() &&  !auth_flag) {
		auth_flag = 1;
        navigateTo('/login');
        return;
    }
	auth_flag = 0;
    if (gameRunning) stopGame_3d();

    const routes = [
        { path: "/", view: Dashboard },
        { path: "/dashboard", view: Dashboard },
        { path: "/login", view: Login },
        { path: "/games", view: Games },
        { path: "/tournamentpong", view: TournamentPong },
        { path: "/twopong3d", view: TwoPong3d },
		{ path: "/fourpong3d", view: FourPong3d },
        { path: "/settings", view: Settings }
    ];

    // Potansiyel eşleşmeler
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();

    // Çevirileri uygulama
    applyTranslations();

    // Ayarlar sayfasındaysanız dil değiştirici için olay dinleyici ekleyin
    if (view instanceof Settings) {
        const languageSwitcher = document.getElementById('language-switcher');
		let lang_tmp = (g_data && g_data.language_settings) || 'en';
        languageSwitcher.value = lang_tmp;

		document.querySelector(`#language-switcher option[value="${lang_tmp}"]`).selected = true;
		
        languageSwitcher.addEventListener('change', (e) => {
            loadLanguage(e.target.value);
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Dilin başta yüklenmesi
    initializeLanguage();
	initializeConfettiCanvas();

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
		else if (e.target.matches("#tournament_game_button")) {
            e.target.style.display = 'none';
            startGame_3d();
            // setupScoreDisplay();
        }
		else if (e.target.matches("#tournament_pong")) {
			navigateTo('/tournamentpong');
			setGame_entry_count(1);
			localStorage.setItem("gameEntryCount", getGame_entry_count());
			var myModal = new bootstrap.Modal(document.getElementById('Modal-tournament'), {
				backdrop: 'static',
				keyboard: false
			});
			myModal.show();
		}
		else if (e.target.matches("#save_btn")) {
			save_btn_events();
		}
		else if (e.target.matches("#start_btn")) {
			start_btn_events();
		}
		if (e.target.matches("#logoutBtn")) {
			// Çerezinizi temizleyin
			document.cookie = "access_token" + '=; Max-Age=-99999999;';	
			localStorage.removeItem("language");
			navigateTo('/login');
			console.clear();
			alert("Oturumunuz başarıyla kapatıldı.");
		}
		else if (e.target.matches("#save_button_id_profile")) {
			document.getElementById('profile_img_id').src = profile_img_src;
			let inputnickname = document.getElementById("inputNickname").value;
			if (inputnickname)
				{
					save_button_events();
					// fetchProtectedData();
					setTimeout(fetchProtectedData, 500);
					// document.getElementById("nickname_span").textContent = g_data.nickname;
					alert("Değişiklikler kaydedildi.");
					// navigateTo('/settings');
					// label img güncelle
					// console.log("g_data" + g_data.avatar_path);
    				// const profile_img_id = document.querySelector('#profile_img_id');
					// profile_img_id.src = (g_data && g_data.avatar_path) || "/static/images/userprofile.png";
				}
			else
				alert("Lütfen bir nickname giriniz.");
		}
		else if (e.target.matches("#pong_play_button")) {   
			const modeSelect = document.getElementById("players_mod_select_id");
    
			if (!modeSelect) {
				console.log('Mode select element not found');
				return;
			}
            // /pong sayfasına geçiş yapın
			
            navigateTo('/twopong3d');
			
			setTimeout(() => {
				games_customization(modeSelect);
			}, 100); 
			
        }
		else if (e.target.matches("#pong_game_button")) {
            e.target.style.display = 'none'; 

			console.log('game is started!');
			
            startGame();
        }
		// if (location.pathname === "/settings") // aşağıda yazdım bunu
		// {
		// 	document.getElementById("profileImageUpload").addEventListener("change", function () {
		// 		SettingsEvents(this);
		// 	});
		// }
		// DELETE BUTONU
		else if (e.target.matches("#deleteAccountBtn")) {
			deleteUserAccount();

			document.cookie = "access_token" + '=; Max-Age=-99999999;';	
			localStorage.removeItem("language");
			navigateTo('/login');
			console.clear();
			alert("Oturumunuz başarıyla kapatıldı.");
		}
    });


    document.body.addEventListener("change", e => {
		if (e.target.matches("#profileImageUpload")){
			SettingsEvents(e.target);
		}
	});

	router();

	window.addEventListener("popstate", () => {
		const previousPath = sessionStorage.getItem("previousPath");
		
		if (previousPath === "/tournamentpong") {
			popstate_tournament_events();
			window.history.replaceState(null, "", window.location.href);
    		window.history.pushState(null, "", window.location.href);
		}
		else if (previousPath === '/twopong3d')
			{
				popstate_two_players_game_events();
			}
		router();
		sessionStorage.setItem("previousPath", location.pathname);
	});

	if (isAuthenticated())
	{
		login_init();
	}
});