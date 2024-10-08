import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Games");
    }

    async getHtml() {
        return `
        <class class="container text-white">
        <class class="row justify-content-center position-absolute top-50 start-50 translate-middle text-center">
            <h1>GAMES</h1>
            <class class="col-xl-4 mt-5">
                <div class="card bg-dark border-white">
                    <img src="static/images/PONG.png" class="card-img-top " alt="Game-1">
                    <div class="card-body">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Single Player</option>
                            <option value="1">Two Player</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Dark</option>
                            <option value="1">Colourful</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Kolay</option>
                            <option value="1">Orta</option>
                            <option value="2">Zor</option>
                        </select>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="pong_play_button"  class="btn btn-success" type="button">Play</button>
                        </div>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="pong_turnuva_button" class="btn btn-outline-warning" type="button">Turnuva</button>
                        </div>
                    </div>
                </div>
            </class>
            <class class="col-xl-4 mt-5">
                <div class="card bg-dark border-white">
                    <img src="static/images/PONG.png" class="card-img-top " alt="Game-1">
                    <div class="card-body">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Single Player</option>
                            <option value="1">Two Player</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Dark</option>
                            <option value="1">Colourful</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Kolay</option>
                            <option value="1">Orta</option>
                            <option value="2">Zor</option>
                        </select>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="pong_3d_play_button"  class="btn btn-success" type="button">Play</button>
                        </div>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="pong3d_turnuva_button" class="btn btn-outline-warning" type="button">Turnuva</button>
                        </div>
                    </div>
                </div>
            </class>
            <class class="col-xl-4 mt-5">
                <div class="card bg-dark border-white">
                    <img src="static/images/PONG.png" class="card-img-top " alt="Game-1">
                    <div class="card-body">
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Single Player</option>
                            <option value="1">Two Player</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Dark</option>
                            <option value="1">Colourful</option>
                        </select>
                        <select class="form-select mt-1" aria-label="Default select example">
                            <option selected>Kolay</option>
                            <option value="1">Orta</option>
                            <option value="2">Zor</option>
                        </select>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="tictactoe_play_button"  class="btn btn-success" type="button">Play</button>
                        </div>
                        <div class="d-grid gap-2 mx-auto mt-1">
                            <button id="ttt_turnuva_button" class="btn btn-outline-warning" type="button">Turnuva</button>
                        </div>
                    </div>
                </div>
            </class>
            
        </class>
    </class>
        `;
    }
}