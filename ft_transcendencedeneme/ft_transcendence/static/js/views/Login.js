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
                <a href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-9e15a686268a84c349f6e6978a49cf5ca248078ddb0e2e060a6df5082d7c721d&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fdashboard&response_type=code" class="position-absolute top-50 start-50">
                    <button data-translate="LOGIN" type="button" class="btn btn-outline-success">42 İLE GİRİŞ</button>
                </a>
            </div>
        `;
    }
}


