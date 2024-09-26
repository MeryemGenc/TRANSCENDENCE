import { navigateTo } from "../index.js";


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_play_button")) { navigateTo('/pong'); }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#tictactoe_play_button")) { navigateTo('/tictactoe'); }
    });
});



