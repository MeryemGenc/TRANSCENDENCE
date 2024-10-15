import AbstractView from "./AbstractView.js";
import { translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Games");
    }

    async getHtml() {
        return `
        <div class="container text-white">
            <div class="row justify-content-center position-absolute top-50 start-50 translate-middle text-center">
                <h1 data-translate="GAMES">${translate("GAMES")}</h1>
                <div class="col-xl-4 mt-5">
                    <div class="card bg-dark border-white">
                        <img src="static/images/PONG.png" class="card-img-top" alt="Game-1">
                        <div class="card-body">
                            <select class="form-select pong-form-select-player" aria-label="Default select example">
                                <option value="1" selected data-translate="Single_Player">${translate("Single_Player")}</option>
                                <option value="2" data-translate="Two_Players">${translate("Two_Players")}</option>
                            </select>
                            <select class="form-select mt-1 pong-form-select-theme" aria-label="Default select example">
                                <option value="1" selected data-translate="Dark_Theme">${translate("Dark_Theme")}</option>
                                <option value="2" data-translate="Light_Theme">${translate("Light_Theme")}</option>
                            </select>
                            <select class="form-select mt-1 pong-form-select-difficulty" aria-label="Default select example">
                                <option value="1" selected data-translate="Easy">${translate("Easy")}</option>
                                <option value="2" data-translate="Medium">${translate("Medium")}</option>
                                <option value="3" data-translate="Hard">${translate("Hard")}</option>
                            </select>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="pong_play_button" class="btn btn-success" type="button" data-translate="PLAY">${translate("PLAY")}</button>
                            </div>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="pong_turnuva_button" class="btn btn-outline-warning" type="button" data-translate="TOURNAMENT">${translate("TOURNAMENT")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 mt-5">
                    <div class="card bg-dark border-white">
                        <img src="static/images/PONG.png" class="card-img-top" alt="Game-1">
                        <div class="card-body">
                            <select class="form-select pong3d-form-select-player" aria-label="Default select example">
                                <option value="1" selected data-translate="Single_Player">${translate("Single_Player")}</option>
                                <option value="2" data-translate="Two_Players">${translate("Two_Players")}</option>
                            </select>
                            <select class="form-select mt-1 pong3d-form-select-theme" aria-label="Default select example">
                                <option value="1" selected data-translate="Dark_Theme">${translate("Dark_Theme")}</option>
                                <option value="2" data-translate="Light_Theme">${translate("Light_Theme")}</option>
                            </select>
                            <select class="form-select mt-1 pong3d-form-select-difficulty" aria-label="Default select example">
                                <option value="1" selected data-translate="Easy">${translate("Easy")}</option>
                                <option value="2" data-translate="Medium">${translate("Medium")}</option>
                                <option value="3" data-translate="Hard">${translate("Hard")}</option>
                            </select>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="pong_3d_play_button" class="btn btn-success" type="button" data-translate="PLAY">${translate("PLAY")}</button>
                            </div>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="pong3d_turnuva_button" class="btn btn-outline-warning" type="button" data-translate="TOURNAMENT">${translate("TOURNAMENT")}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

}







// // turnuva kartı
//             // <class class="col-xl-4 mt-5">
//             //     <div class="card bg-dark border-white">
//             //         <img src="static/images/PONG.png" class="card-img-top " alt="Game-1">
//             //         <div class="card-body">
//             //             <select class="form-select ttt-form-select-player" aria-label="Default select example">
//             //                 <option selected>Single Player</option>
//             //                 <option value="1">Two Player</option>
//             //             </select>
//             //             <select class="form-select mt-1 ttt-form-select-theme" aria-label="Default select example">
//             //                 <option selected>Dark</option>
//             //                 <option value="1">Light</option>
//             //             </select>
//             //             <div class="d-grid gap-2 mx-auto mt-1">
//             //                 <button id="tictactoe_play_button"  class="btn btn-success" type="button">Play</button>
//             //             </div>
//             //             <div class="d-grid gap-2 mx-auto mt-1">
//             //                 <button id="ttt_turnuva_button" class="btn btn-outline-warning" type="button">Turnuva</button>
//             //             </div>
//             //         </div>
//             //     </div>
//             // </class>



