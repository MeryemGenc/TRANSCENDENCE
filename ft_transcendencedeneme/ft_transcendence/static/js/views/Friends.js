import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Friends");
    }

    async getHtml() {
        return `
            <class class="row justify-content-center position-absolute top-50 start-50 translate-middle text-white">
        <div class="text-center">
            <h1>FRİENDS</h1>
        </div>
        <div class="col-md-5 card mx-2 mt-4">
            <div class="text-center mt-1">
                <img src="static/images/erkek.png" class="rounded" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">rcalik</h5>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Game</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pong</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Tictactoe</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Kazanma ornaı</td>
                                <td>%50</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-danger">Arkadaşlıktan Çıkar</button>
                </div>
            </div>
        </div>

        <div class="col-md-5 card mx-2 mt-4">
            <div class="text-center mt-1">
                <img src="static/images/kiz.png" class="rounded" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">rcalik</h5>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Game</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pong</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Tictactoe</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Kazanma ornaı</td>
                                <td>%50</td>
                            </tr>
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-danger">Arkadaşlıktan Çıkar</button>
                </div>
            </div>
        </div>
    </class>
    
            `;
    }
}



