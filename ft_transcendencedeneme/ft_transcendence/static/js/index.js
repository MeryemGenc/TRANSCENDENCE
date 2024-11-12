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

import { fetchProtectedData } from "./api.js";


import { popstate_two_players_game_events, startGame } from "./games/pong/twopong.js";
import { startGame_3d } from "./games/tournament/tournamentPong3d.js";
import { getGame_entry_count, setGame_entry_count, save_btn_events, start_btn_events, popstate_tournament_events } from "./games/tournament/tournament.js";
import { initializeConfettiCanvas } from "./games/tournament/confetti.js";
import { loadLanguage, initializeLanguage, translate, applyTranslations } from "./LanguageManager.js";
import { profile_img_src, SettingsEvents } from "./settings/setting.js";
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

export const navigateTo = url => {
	sessionStorage.setItem("previousPath", url);
    history.pushState({ pathname: url }, null, url);
    router();
};

const router = async () => {

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
        languageSwitcher.value = g_data.language_settings ? g_data.language_settings : 'en';

		document.querySelector(`#language-switcher option[value="${g_data.language_settings}"]`).selected = true;
		
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
		else if (e.target.matches("#deleteAccountBtn")) {
			if (confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
				alert("Hesabınız başarıyla silindi.");
			}
		} 
		else if (e.target.matches("#logoutBtn")) {
			if (confirm("Oturumu kapatmak istediğinizden emin misiniz?")) {
				alert("Oturumunuz kapatıldı.");
			}
		}
		else if (e.target.matches("#save_button_id_profile")) {
			document.getElementById('profile_img_id').src = profile_img_src;
			let inputnickname = document.getElementById("inputNickname").value;
			if (inputnickname)
				{
					document.getElementById("nickname_span").textContent = inputnickname;
					alert("Değişiklikler kaydedildi.");
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
		if (location.pathname === "/settings")
		{
			document.getElementById("profileImageUpload").addEventListener("change", function () {
				SettingsEvents(this);
			});
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
});