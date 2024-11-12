import AbstractView from "./AbstractView.js";
import { translate } from "../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Four Pong3d");
    }

    async getHtml() {
        return `
			<div class="container vh-100 d-flex justify-content-center align-items-center bg_color text-light">
				<div class="row justify-content-between align-items-center w-100">
					
					<!-- Player 1 Profile (Top, Image on Left) -->
					<div class="col-12 text-center mb-3">
						<div class="card bg-dark text-light p-3 border-light d-flex flex-row align-items-center justify-content-start" style="width: 20%; margin: 0 auto;">
							<img src="#" id="pong_img_plyr1" class="rounded-circle me-3" style="width: 80px; height: 80px;">
							<div class="text-start">
								<p class="fs-4 text-bold mb-1" style="color: cyan" id="pong_t_player1">Player 1</p>
								<p class="fs-5 text-bold" id="pong_score_player1">0</p>
							</div>
						</div>
					</div>

					<!-- Left Game Area (Player 2) -->
					<div class="col-2 text-center">
						<div class="card bg-dark text-light p-3 border-light d-inline-block">
							<img src="#" id="pong_img_plyr2" class="rounded-circle mb-3" style="width: 80px; height: 80px;">
							<p class="fs-4 text-bold" style="color: cyan" id="pong_t_player2">Player 2</p>
							<p class="fs-4 text-bold" id="pong_score_player2">0</p>
						</div>
					</div>

					<!-- Game Board in Center -->
					<div class="col-8 d-flex justify-content-center align-items-center bg-black border-danger rounded" style="height: 650px;">
						<div id="pong_board" class="d-flex flex-column justify-content-center align-items-center flex-grow-1">
							<button data-translate="PLAY" id="pong_game_button" type="button" class="btn btn-info">
								${translate("PLAY")}
							</button>
						</div>
					</div>

					<!-- Right Game Area (Player 4) -->
					<div class="col-2 text-center">
						<div class="card bg-dark text-light p-3 border-light d-inline-block">
							<img src="#" id="pong_img_plyr4" class="rounded-circle mb-3" style="width: 80px; height: 80px;">
							<p class="fs-4 text-bold" style="color: cyan" id="pong_t_player4">Player 4</p>
							<p class="fs-4 text-bold" id="pong_score_player4">0</p>
						</div>
					</div>

					<!-- Bottom Profile (Player 3, Image on Left) -->
					<div class="col-12 text-center mt-3">
						<div class="card bg-dark text-light p-3 border-light d-flex flex-row align-items-center justify-content-start" style="width: 70%; margin: 0 auto;">
							<img src="#" id="pong_img_plyr3" class="rounded-circle me-3" style="width: 80px; height: 80px;">
							<div class="text-start">
								<p class="fs-4 text-bold mb-1" style="color: cyan" id="pong_t_player3">Player 3</p>
								<p class="fs-5 text-bold" id="pong_score_player3">0</p>
							</div>
						</div>
					</div>
				</div>
			</div>
        `;
    }
}