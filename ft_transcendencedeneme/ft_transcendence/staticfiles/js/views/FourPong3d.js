import AbstractView from "./AbstractView.js";
import { translate } from "../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Four Pong3d");
    }

    async getHtml() {
        return `
		
		<div class="container bg_color d-flex justify-content-center align-items-center" style="height: 100vh;">
		<!-- Oyun Alanı (600px x 600px siyah kare) -->
		<div id="four_pong_board" class="position-relative" style="width: 600px; height: 600px; background-color: black;">
		<button data-translate="PLAY" id="four_pong_play_button" type="button" class="btn btn-info" data-mdb-ripple-init>${translate("PLAY")}</button>
	  
		  <!-- Sol Kart (Profil Resmi, Nickname ve Score) -->
		  <div class="position-absolute" style="top: 50%; left: -110px; transform: translateY(-50%);">
			<div class="card bg-dark text-light" style="width: 100px; height: 200px;">
			  <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
				<img src="./static/images/player1.png" class="rounded-circle" style="width: 50px; height: 50px;">
			  </div>
			  <div class="text-center" style="color: cyan; font-weight: bold;">Player 1</div>
			  <div id="four_pong_score_1" class="text-center" style="color: white; font-weight: bold;">0</div> <!-- Score -->
			</div>
		  </div>
	  
		  <!-- Üst Kart (Profil Resmi, Nickname ve Score) -->
		  <div class="position-absolute" style="top: -110px; left: 50%; transform: translateX(-50%);">
			<div class="card bg-dark text-light" style="width: 200px; height: 100px;">
			  <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
				<img src="./static/images/player2.png" class="rounded-circle" style="width: 50px; height: 50px;">
			  </div>
			  <div class="text-center" style="color: cyan; font-weight: bold;">Player 2</div>
			  <div id="four_pong_score_2" class="text-center" style="color: white; font-weight: bold;">0</div> <!-- Score -->
			</div>
		  </div>
	  
		  <!-- Sağ Kart (Profil Resmi, Nickname ve Score) -->
		  <div class="position-absolute" style="top: 50%; right: -110px; transform: translateY(-50%);">
			<div class="card bg-dark text-light" style="width: 100px; height: 200px;">
			  <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
				<img src="./static/images/player3.png" class="rounded-circle" style="width: 50px; height: 50px;">
			  </div>
			  <div class="text-center" style="color: cyan; font-weight: bold;">Player 3</div>
			  <div id="four_pong_score_3" class="text-center" style="color: white; font-weight: bold;">0</div> <!-- Score -->
			</div>
		  </div>
	  
		  <!-- Alt Kart (Profil Resmi, Nickname ve Score) -->
		  <div class="position-absolute" style="bottom: -110px; left: 50%; transform: translateX(-50%);">
			<div class="card bg-dark text-light" style="width: 200px; height: 100px;">
			  <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
				<img src="./static/images/player4.png" class="rounded-circle" style="width: 50px; height: 50px;">
			  </div>
			  <div class="text-center" style="color: cyan; font-weight: bold;">Player 4</div>
			  <div id="four_pong_score_4" class="text-center" style="color: white; font-weight: bold;">0</div> <!-- Score -->
			</div>
		  </div>
	  
		</div>
	  </div>

        `;
    }
}