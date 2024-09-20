
import Dashboard from "./views/Dashboard.js";
import Games from "./views/Games.js";
import Pong from "./views/Pong.js";
import Settings from "./views/Settings.js";
import Friends from "./views/Friends.js";
import Login from "./views/Login.js";
import {stopGame} from "./games/pong/pong.js";


// game running-stop durumu
let gameRunning = false; // Oyun durumunu takip etmek için

export function setGameRunning(value) {
    gameRunning = value;
}

export function getGameRunning() {
    return gameRunning;
}


export const navigateTo = url => {
    if (gameRunning)
        stopGame();
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/login", view: Login },
        { path: "/games", view: Games },
        { path: "/pong", view: Pong },
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
    // console.log(match.route.view());

};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link")) { // sayfa refresh edilmesin diye. nasıl edilmedi ki ???// data-link kapanma parantezi YOK_BAK!!!
            e.preventDefault(); // bu ne ???
            navigateTo(e.target.href);
        }
    });

    router();
});



// export default { gameRunning } // export edilen değişkenler dosya dışında const gibi davranır.


