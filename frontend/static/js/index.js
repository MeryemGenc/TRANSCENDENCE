
import Dashboard from "./views/Dashboard.js";
import Games from "./views/Games.js";
// import { turnuvaMode } from "./games/games.js";
import Pong from "./views/Pong.js";
import TurnuvaPong from "./views/TurnuvaPong.js";
import Pong3d from "./views/Pong3d.js";
import Tictactoe from "./views/Tictactoe.js";
import Settings from "./views/Settings.js";
import Friends from "./views/Friends.js";
import SearchForFriends from "./views/SearchForFriends.js";
import Login from "./views/Login.js";
import {stopGame} from "./games/pong/pong.js";
import {stopGame_3d} from "./games/pong3d/pong3d.js";
import {ttt_stopGame} from "./games/tictactoe/tictactoe.js";


// PONG - game running-stop durumu
let gameRunning = false; // Oyun durumunu takip etmek için
export function setGameRunning(value) { gameRunning = value; }
export function getGameRunning() { return gameRunning; }

// PONG3D - game running-stop durumu
let gameRunning_3d = false; // Oyun durumunu takip etmek için
export function setGameRunning_3d(value) { gameRunning_3d = value; }
export function getGameRunning_3d() { return gameRunning_3d; }

// TICTACTOE - game running-stop durumu
let ttt_gameRunning = false; // Oyun durumunu takip etmek için
export function ttt_setGameRunning(value) { ttt_gameRunning = value; }
export function ttt_getGameRunning() { return ttt_gameRunning; }

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
    // turnuva
    // // Sayfa içeriklerini yüklendikten sonra modalı açmak için küçük bir gecikme
    // setTimeout(() => {
    //     // URL değişikliğinden sonra modal'ı kontrol et ve aç
    //     // if (url === '/pong' && turnuvaMode) {
    //     //     const myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
    //     //     myModal.show();
    //     // }
    // }, 200);  // 100ms bekleme süresi (gerekirse artırılabilir)
};

const router = async () => {
    // console.log("gamerunning: " + gameRunning); 
    // console.log("ttt_gamerunning: " + ttt_gameRunning);
    if (ttt_gameRunning)
        ttt_stopGame();
    if (gameRunning)
        stopGame();
    if (gameRunning_3d)
        {
        console.log("gamerunning_3d: game durdu");

        stopGame_3d();
    }


    const routes = [
        { path: "/", view: Dashboard },
        { path: "/login", view: Login },
        { path: "/games", view: Games },
        { path: "/pong", view: Pong },
        { path: "/turnuvapong", view: TurnuvaPong },
        { path: "/pong3d", view: Pong3d },
        { path: "/tictactoe", view: Tictactoe },
        { path: "/searchForFriends", view: SearchForFriends },
        { path: "/settings", view: Settings },
        { path: "/friends", view: Friends }
    ];

    
    // potential matches
    const potentialMatches = routes.map(route => {
        return {
            route: route, 
            isMatch: location.pathname == route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match)
    {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    document.querySelector("#app").innerHTML = await view.getHtml();
    // console.log("turnuvaMode: " + turnuvaMode);
    // console.log("location.pathname: " + location.pathname);
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) { // sayfa refresh edilmesin diye. nasıl edilmedi ki ???
            e.preventDefault(); // bu ne ???
            navigateTo(e.target.href); 
        }
    });

    router(); // refresh'ten sonra sayfa yüklemesi için gerekli.

});



// export default { gameRunning } // export edilen değişkenler dosya dışında const gibi davranır.


