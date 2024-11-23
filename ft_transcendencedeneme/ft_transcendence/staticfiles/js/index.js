import Dashboard from "./views/Dashboard.js";
import Games from "./views/Games.js";
import { g_data } from "./api.js";
import TournamentPong from "./views/TournamentPong.js";
import TwoPong3d from "./views/TwoPong3d.js";
import Settings from "./views/Settings.js";
import Login from "./views/Login.js";
import FourPong3d from "./views/FourPong3d.js";
import { fetchProtectedData, deleteUserAccount } from "./api.js";
import { login_init, isAuthenticated } from "./login/login.js";
import { popstate_two_players_game_events, startGame, pauseGame, resumeGame } from "./games/pong/twopong.js";
import { startGame_3d, pauseGameTournament, resumeGameTournament } from "./games/tournament/tournamentPong3d.js";
import { getGame_entry_count, setGame_entry_count, save_btn_events, start_btn_events, popstate_tournament_events } from "./games/tournament/tournament.js";
import { initializeConfettiCanvas } from "./games/tournament/confetti.js";
import { loadLanguage, initializeLanguage, translate, applyTranslations } from "./LanguageManager.js";
import { four_start_game, popstate_four_players_game_events, pauseGameFour, resumeGameFour } from "./games/pong/fourpong.js";
import { save_button_events } from "./settings/setting.js";
import { games_customization } from "./games/games.js";

// PONG - oyun durumu yönetimi
let gameRunning = false;
export function setGameRunning(value) { gameRunning = value; }
export function getGameRunning() { return gameRunning; }

// PONG3D - oyun durumu yönetimi
let gameRunning_3d = false;
export function setGameRunning_3d(value) { gameRunning_3d = value; }
export function getGameRunning_3d() { return gameRunning_3d; }

let is_paused = false;
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
		// console.log("dfdfds");
	}
	if(auth_flag)
	{
		sessionStorage.setItem("previousPath", url);
		history.pushState({ pathname: url }, null, url);
	}
    router();
	// logHistory(url);
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
		// Eğer KVKK onay kutusuna tıklanırsa, login butonunun durumunu güncelle
        if (e.target.matches("#kvkkConsent")) {
            const kvkkConsent = document.getElementById('kvkkConsent');
            const loginButton = document.getElementById('loginButton');
            console.log('Checkbox checked:', kvkkConsent.checked);

            // Eğer checkbox işaretlenirse, butonu etkinleştir
            if (kvkkConsent.checked) {
                loginButton.removeAttribute("disabled");
            } else {
                loginButton.setAttribute("disabled", true);
            }
        }

        // Login butonuna tıklanırsa
        else if (e.target.matches("#loginButton")) {
            const kvkkConsent = document.getElementById('kvkkConsent');
            // Eğer KVKK onayı verilmemişse, buton tıklanamaz
            if (!kvkkConsent.checked) {
                alert("KVKK'ya onay vermeniz gerekmektedir.");
                e.preventDefault(); // Butonun işlevini engelliyoruz
            } else {
                console.log('Redirecting to login URL via button');
            }
        }

        // Login linkine tıklanırsa (aynı şekilde KVKK onayını kontrol ediyoruz)
        else if (e.target.matches("#login_42_link")) {
            const kvkkConsent = document.getElementById('kvkkConsent');
            // Eğer KVKK onayı verilmemişse, tıklama engelleniyor
            if (!kvkkConsent.checked) {
                alert("KVKK'ya onay vermeniz gerekmektedir.");
                e.preventDefault();
            } else {
                console.log('Redirecting to login URL');
            }
        }
		else if (e.target.matches("#tournament_game_button")) {
            e.target.style.display = 'none';
            startGame_3d(); 
        }
		else if (e.target.matches("#tournament_pong")) {
			navigateTo('/tournamentpong');
			setGame_entry_count(1);
			localStorage.setItem("gameEntryCount", getGame_entry_count());
			games_customization(false,true); // tournament is true.
			document.getElementById('player1').value = '';
			document.getElementById('player2').value = '';
			document.getElementById('player3').value = '';
			document.getElementById('player4').value = '';
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
			navigateTo('/login');
			localStorage.removeItem("language");
			localStorage.removeItem("g_data");
			localStorage.removeItem("gameEntryCount");
			console.clear();
			alert(translate("a_LOGOUT_SUCCESS"));
		}
		else if (e.target.matches("#save_button_id_profile")) {
			let inputnickname = document.getElementById("inputNickname").value;
			if (inputnickname)
				{
					save_button_events();
					setTimeout(fetchProtectedData, 500);
					alert(translate("a_CHANGES_SUCCESS"));
				}
			else
				alert(translate("a_ENTER_NICK"));
		}
		else if (e.target.matches("#pong_play_button")) {   
			games_customization(true, false);
        }
		else if (e.target.matches("#pong_game_button")) {
            e.target.style.display = 'none';
            startGame();
        }
		else if (e.target.matches("#four_pong_play_button"))
		{
			e.target.style.display = 'none';
			four_start_game();
		} 
		else if (e.target.matches("#deleteAccountBtn")) {
			deleteUserAccount();

			document.cookie = "access_token" + '=; Max-Age=-99999999;';	
			navigateTo('/login');
			localStorage.removeItem("language");
			localStorage.removeItem("g_data");
			localStorage.removeItem("gameEntryCount");
			console.clear();
			alert(translate("a_LOGOUT_SUCCESS"));
		}
		else if (e.target.matches("#pause_button"))
			{
				if (is_paused) {
					resumeGame(); 
					is_paused = false;
					console.log("Game resumed");
				} else {
					pauseGame();
					is_paused = true;
					console.log("Game paused");
				}
			}
		else if (e.target.matches("#pause_button_four"))
			{
				if (is_paused) {
					resumeGameFour(); 
					is_paused = false;
					console.log("Game resumed");
				} else {
					pauseGameFour();
					is_paused = true;
					console.log("Game paused");
				}
			}
		else if (e.target.matches("#pause_button_tournament"))
		{
			if (is_paused) {
				resumeGameTournament(); 
				is_paused = false;
				console.log("Game resumed");
			} else {
				pauseGameTournament();
				is_paused = true;
				console.log("Game paused");
			}
		}
    });

	router();

	window.addEventListener("popstate", () => {
		const previousPath = sessionStorage.getItem("previousPath");

		if (previousPath === "/tournamentpong"){
			popstate_tournament_events(); 
			is_paused = false;
		}
		else if (previousPath === "/twopong3d"){
			popstate_two_players_game_events();
			is_paused = false;
		}
		else if (previousPath === "/fourpong3d"){
			popstate_four_players_game_events();
			is_paused = false;
		}

		router();

		if (previousPath === "/games" && location.pathname === "/twopong3d")
		{ games_customization(); }
		if (previousPath === "/games" && location.pathname === "/tournamentpong")
		{
			setGame_entry_count(1);
			localStorage.setItem("gameEntryCount", getGame_entry_count());
			document.getElementById('player1').value = '';
			document.getElementById('player2').value = '';
			document.getElementById('player3').value = '';
			document.getElementById('player4').value = '';
			var myModal = new bootstrap.Modal(document.getElementById('Modal-tournament'), {
			backdrop: 'static',
			keyboard: false
		});
		myModal.show();
		}
		sessionStorage.setItem("previousPath", location.pathname);
	});

	if (isAuthenticated())
	{
		login_init();
	}
});