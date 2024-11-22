import AbstractView from "./AbstractView.js";
import { translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Game");
    }

    async getHtml() {
        return `
		<div class="container vh-100 d-flex justify-content-center align-items-center bg_color text-light">
        <div class="container text-white">
            <div class="row justify-content-center position-absolute top-50 start-50 translate-middle text-center">
                <h1 data-translate="GAME">${translate("GAME")}</h1>
                <div class="col-xl-4 mt-5">
                    <div class="card bg-dark border-white">
                        <img src="static/images/PONG.png" class="card-img-top" alt="Game-1">
                        <div class="card-body">
                            <select id="players_mod_select_id" class="form-select pong-form-select-player" aria-label="Default select example">
							<option value="1" selected data-translate="Two_Players">${translate("Two_Players")}</option>
                                <option value="2" data-translate="Four_Players">${translate("Four_Players")}</option>
                            </select>
                            <select id="ball_mod_select_id" class="form-select mt-1 pong-form-select-theme" aria-label="Default select example">
                                <option value="1" selected data-translate="Small_Ball">${translate("Small_Ball")}</option>
                                <option value="2" data-translate="Big_Ball">${translate("Big_Ball")}</option>
                            </select>
                            <select id="difficulty_mod_select_id" class="form-select mt-1 pong-form-select-difficulty" aria-label="Default select example">
                                <option value="1" selected data-translate="Easy">${translate("Easy")}</option>
                                <option value="2" data-translate="Medium">${translate("Medium")}</option>
                                <option value="3" data-translate="Hard">${translate("Hard")}</option>
                            </select>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="pong_play_button" class="btn btn-success" type="button" data-translate="PLAY">${translate("PLAY")}</button>
                            </div>
                            <div class="d-grid gap-2 mx-auto mt-1">
                                <button id="tournament_pong" class="btn btn-outline-warning" type="button" data-translate="TOURNAMENT">${translate("TOURNAMENT")}</button>
                            </div>
                        </div>
                    </div>
                </div>

        `;
    }

}

