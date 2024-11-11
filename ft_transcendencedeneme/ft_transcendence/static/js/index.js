import Dashboard from "./views/Dashboard.js";
import Games from "./views/Games.js";
// import { turnuvaMode } from "./games/games.js";
import Pong from "./views/Pong.js";
import TurnuvaPong from "./views/TurnuvaPong.js";
import Turnuva3dpong from "./views/Turnuva3dpong.js";
import Pong3d from "./views/Pong3d.js";
// import Tictactoe from "./views/Tictactoe.js"; 
import Settings from "./views/Settings.js";
import Login from "./views/Login.js";
import { stopGame } from "./games/pong/pong.js";
import { stopGame_3d } from "./games/pong3d/pong3d.js";
import { ttt_stopGame } from "./games/tictactoe/tictactoe.js";

import { loadLanguage, initializeLanguage, translate, applyTranslations } from "./LanguageManager.js";
import { fetchProtectedData } from "./api.js";

// PONG - oyun durumu yönetimi
let gameRunning = false;
export function setGameRunning(value) { gameRunning = value; }
export function getGameRunning() { return gameRunning; }

// PONG3D - oyun durumu yönetimi
let gameRunning_3d = false;
export function setGameRunning_3d(value) { gameRunning_3d = value; }
export function getGameRunning_3d() { return gameRunning_3d; }

// TICTACTOE - oyun durumu yönetimi
let ttt_gameRunning = false;
export function ttt_setGameRunning(value) { ttt_gameRunning = value; }
export function ttt_getGameRunning() { return ttt_gameRunning; }

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};


const router = async () => {
    if (ttt_gameRunning) ttt_stopGame();
    if (gameRunning) stopGame();
    if (gameRunning_3d) {
        console.log("gameRunning_3d: game durdu");
        stopGame_3d();
    }

    const routes = [
        { path: "/", view: Dashboard },
        { path: "/dashboard", view: Dashboard }, // Eksik olabilir
        { path: "/login", view: Login },
        { path: "/games", view: Games },
        { path: "/pong", view: Pong },
        { path: "/turnuvapong", view: TurnuvaPong },
        { path: "/pong3d", view: Pong3d },
        { path: "/turnuva3dpong", view: Turnuva3dpong },
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
        languageSwitcher.value = localStorage.getItem('language') || 'en';
        languageSwitcher.addEventListener('change', (e) => {
            loadLanguage(e.target.value);
        });
    }
};

// Dil değişikliklerinde navbar'ı da güncellemek için `loadLanguage` fonksiyonuna eklemeler yapıldı.
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    // Dilin başta yüklenmesi
    initializeLanguage();

    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
    // fetchProtectedData();
});















































// import Dashboard from "./views/Dashboard.js";
// import Games from "./views/Games.js";
// // import { turnuvaMode } from "./games/games.js";
// import Pong from "./views/Pong.js";
// import TurnuvaPong from "./views/TurnuvaPong.js";
// import Turnuva3dpong from "./views/Turnuva3dpong.js";
// import Pong3d from "./views/Pong3d.js";
// // import Tictactoe from "./views/Tictactoe.js";
// import Settings from "./views/Settings.js";
// import Login from "./views/Login.js";
// import { stopGame } from "./games/pong/pong.js";
// import { stopGame_3d } from "./games/pong3d/pong3d.js";
// import { ttt_stopGame } from "./games/tictactoe/tictactoe.js";

// import { loadLanguage, initializeLanguage, translate } from "./LanguageManager.js";

// // PONG - oyun durumu yönetimi
// let gameRunning = false;
// export function setGameRunning(value) { gameRunning = value; }
// export function getGameRunning() { return gameRunning; }

// // PONG3D - oyun durumu yönetimi
// let gameRunning_3d = false;
// export function setGameRunning_3d(value) { gameRunning_3d = value; }
// export function getGameRunning_3d() { return gameRunning_3d; }

// // TICTACTOE - oyun durumu yönetimi
// let ttt_gameRunning = false;
// export function ttt_setGameRunning(value) { ttt_gameRunning = value; }
// export function ttt_getGameRunning() { return ttt_gameRunning; }

// export const navigateTo = url => {
//     history.pushState(null, null, url);
//     router();
// };

// const router = async () => {
//     if (ttt_gameRunning) ttt_stopGame();
//     if (gameRunning) stopGame();
//     if (gameRunning_3d) {
//         console.log("gameRunning_3d: game durdu");
//         stopGame_3d();
//     }

//     const routes = [
//         { path: "/", view: Dashboard },
//         { path: "/login", view: Login },
//         { path: "/games", view: Games },
//         { path: "/pong", view: Pong },
//         { path: "/turnuvapong", view: TurnuvaPong },
//         { path: "/pong3d", view: Pong3d },
//         { path: "/turnuva3dpong", view: Turnuva3dpong },
//         { path: "/settings", view: Settings }
//     ];

//     // Potansiyel eşleşmeler
//     const potentialMatches = routes.map(route => {
//         return {
//             route: route,
//             isMatch: location.pathname === route.path
//         };
//     });

//     let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
//     if (!match) {
//         match = {
//             route: routes[0],
//             isMatch: true
//         };
//     }

//     const view = new match.route.view();
//     document.querySelector("#app").innerHTML = await view.getHtml();

//     // Çevirileri uygulama
//     applyTranslations();

//     // Ayarlar sayfasındaysanız dil değiştirici için olay dinleyici ekleyin
//     if (view instanceof Settings) {
//         const languageSwitcher = document.getElementById('language-switcher');
//         languageSwitcher.value = localStorage.getItem('language') || 'en';
//         languageSwitcher.addEventListener('change', (e) => {
//             loadLanguage(e.target.value);
//         });
//     }
// };

// // Çevirileri uygulama fonksiyonu
// function applyTranslations() {
//     document.querySelectorAll('[data-translate]').forEach(element => {
//         const key = element.getAttribute('data-translate');
//         element.innerText = translate(key);
//     });
// }

// window.addEventListener("popstate", router);

// document.addEventListener("DOMContentLoaded", () => {
//     // Dilin başta yüklenmesi
//     initializeLanguage();

//     document.body.addEventListener("click", e => {
//         if (e.target.matches("[data-link]")) {
//             e.preventDefault();
//             navigateTo(e.target.href);
//         }
//     });

//     router();
// });







































































































































































































// // import Dashboard from "./views/Dashboard.js";
// // import Games from "./views/Games.js";
// // // import { turnuvaMode } from "./games/games.js";
// // import Pong from "./views/Pong.js";
// // import TurnuvaPong from "./views/TurnuvaPong.js";
// // import Turnuva3dpong from "./views/Turnuva3dpong.js";
// // import Pong3d from "./views/Pong3d.js";
// // // import Tictactoe from "./views/Tictactoe.js";
// // import Settings from "./views/Settings.js";
// // // import Friends from "./views/Friends.js";
// // // import SearchForFriends from "./views/SearchForFriends.js";
// // import Login from "./views/Login.js";
// // import {stopGame} from "./games/pong/pong.js";
// // import {stopGame_3d} from "./games/pong3d/pong3d.js";
// // import {ttt_stopGame} from "./games/tictactoe/tictactoe.js";



// // // PONG - game running-stop durumu
// // let gameRunning = false; // Oyun durumunu takip etmek için
// // export function setGameRunning(value) { gameRunning = value; }
// // export function getGameRunning() { return gameRunning; }

// // // PONG3D - game running-stop durumu
// // let gameRunning_3d = false; // Oyun durumunu takip etmek için
// // export function setGameRunning_3d(value) { gameRunning_3d = value; }
// // export function getGameRunning_3d() { return gameRunning_3d; }

// // // TICTACTOE - game running-stop durumu
// // let ttt_gameRunning = false; // Oyun durumunu takip etmek için
// // export function ttt_setGameRunning(value) { ttt_gameRunning = value; }
// // export function ttt_getGameRunning() { return ttt_gameRunning; }

// // export const navigateTo = url => {
// //     history.pushState(null, null, url);
// //     router();
// // };

// // const router = async () => {
// //     if (ttt_gameRunning)
// //         ttt_stopGame();
// //     if (gameRunning)
// //         stopGame();
// //     if (gameRunning_3d)
// //         {
// //         console.log("gamerunning_3d: game durdu");

// //         stopGame_3d();
// //     }


// //     const routes = [
// //         { path: "/", view: Dashboard },
// //         { path: "/login", view: Login },
// //         { path: "/games", view: Games },
// //         { path: "/pong", view: Pong },
// //         { path: "/turnuvapong", view: TurnuvaPong },
// //         { path: "/pong3d", view: Pong3d },
// //         { path: "/turnuva3dpong", view: Turnuva3dpong },
// //         // { path: "/tictactoe", view: Tictactoe },
// //         // { path: "/searchForFriends", view: SearchForFriends },
// //         { path: "/settings", view: Settings }
// //         // { path: "/friends", view: Friends }
// //     ];

    
// //     // potential matches
// //     const potentialMatches = routes.map(route => {
// //         return {
// //             route: route, 
// //             isMatch: location.pathname == route.path
// //         };
// //     });

// //     let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
// //     if (!match)
// //     {
// //         match = {
// //             route: routes[0],
// //             isMatch: true
// //         };
// //     }

// //     const view = new match.route.view();
// //     document.querySelector("#app").innerHTML = await view.getHtml();
// //     // console.log("location.pathname: " + location.pathname);

// //     //////////////////////////////////////////////////////////////////////////////////////////////// 
    

// //     ////////////////////////////////////////////////////////////////////////////////////////////////
// // };

// // window.addEventListener("popstate", router);

// // document.addEventListener("DOMContentLoaded", () => {
// //     document.body.addEventListener("click", e => {
// //         if (e.target.matches("[data-link]")) {
// //             e.preventDefault(); // bu ne ???
// //             navigateTo(e.target.href); 
// //         }
// //     });

// //     router(); // refresh'ten sonra sayfa yüklemesi için gerekli.

// // });

