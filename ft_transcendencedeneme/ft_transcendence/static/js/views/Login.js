import AbstractView from "./AbstractView.js"; 
import { translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <div class="position-absolute top-50 start-50">
                <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0a22e09e6c53ae440cbd9773d652675ccab942984d6338f8c98f6dd4e6e07540&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauthapp%2Fauth%2Fredirect&response_type=code" class="position-absolute top-50 start-50">
                    <button data-translate="LOGIN" type="button" class="btn btn-outline-success">42 İLE GİRİŞ</button>
                </a>
            </div>
        `;
    }
}


