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





// TURNUVA

export let turnuvaMode = false;

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_turnuva_button")) { 
            navigateTo('/pong'); 
            turnuvaMode = true;
            console.log("turnuvaMode: "+ turnuvaMode);
        }
    });
});


document.addEventListener("DOMContentLoaded", () => { 
    console.log("clicked   1");
    if (turnuvaMode) {  // sayfadan ayrılınca bunu false yap
        console.log("clicked   2");
        const myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
        myModal.show();
        console.log("clicked3");
    } 
});

