import { navigateTo } from "../index.js";
import { set_vars_pong } from "./pong/pong.js";
import { set_vars_pong3d } from "./pong3d/pong3d.js";
import { set_vars_ttt } from "./tictactoe/tictactoe.js";


// pong3D
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_3d_play_button")) {   
            set_vars_pong3d(document.querySelector('.pong3d-form-select-player'), document.querySelector('.pong3d-form-select-theme'), document.querySelector('.pong3d-form-select-difficulty'));
            navigateTo('/pong3d'); 
        }
    });
});

// pong
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_play_button")) {   
            set_vars_pong(document.querySelector('.pong-form-select-player'), document.querySelector('.pong-form-select-theme'), document.querySelector('.pong-form-select-difficulty'));
            navigateTo('/pong'); 
        }
    });
});

// ttt
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#tictactoe_play_button")) { 
            set_vars_ttt(document.querySelector('.ttt-form-select-player'), document.querySelector('.ttt-form-select-theme'));
            navigateTo('/tictactoe'); 
        }
    });
});

// pong Turnuva
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong_turnuva_button")) {   
            set_vars_pong(document.querySelector('.pong-form-select-player'), document.querySelector('.pong-form-select-theme'), document.querySelector('.pong-form-select-difficulty'));
            navigateTo('/turnuvapong'); 
        }    
    });    
});    


// pong3D Turnuva
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("#pong3d_turnuva_button")) {   
            set_vars_pong3d(document.querySelector('.pong3d-form-select-player'), document.querySelector('.pong3d-form-select-theme'), document.querySelector('.pong3d-form-select-difficulty'));
            navigateTo('/turnuva3dpong'); 
        }    
    });    
});    










// eski event listenerlar
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#pong3d_turnuva_button")) { 
//             const playerMode = document.querySelector('.pong3d-form-select-player');
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.pong3d-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             const difficulty = document.querySelector('.pong3d-form-select-difficulty');
//             const selectedDifficulty = difficulty.options[difficulty.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedDifficulty);
//             navigateTo('/turnuva3dpong'); 
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#pong_turnuva_button")) { 
//             const playerMode = document.querySelector('.pong3d-form-select-player');    
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.pong3d-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             const difficulty = document.querySelector('.pong3d-form-select-difficulty');
//             const selectedDifficulty = difficulty.options[difficulty.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedDifficulty);
//             navigateTo('/turnuvapong'); 
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#tictactoe_play_button")) { 
//             const playerMode = document.querySelector('.ttt-form-select-player');    
//             const selectedPlayerMode = playerMode.options[playerMode.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedPlayerMode);
//             const theme = document.querySelector('.ttt-form-select-theme');
//             const selectedTheme = theme.options[theme.selectedIndex].text;
//             console.log("Seçili Zorluk: ", selectedTheme);
//             navigateTo('/tictactoe'); 
//         }
//     });
// });




