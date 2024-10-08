import { navigateTo } from "../index.js";



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_3d_play_button")) { navigateTo('/pong3d'); }
    });
});

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



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_turnuva_button")) { navigateTo('/turnuvapong'); }
    });
});


