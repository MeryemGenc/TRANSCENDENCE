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
                <button data-translate="LOGIN" type="button" class="btn btn-outline-success">${translate("LOGIN")}</button>
            </div>
        `;
    }
}


