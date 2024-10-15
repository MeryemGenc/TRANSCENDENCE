import AbstractView from "./AbstractView.js";
import { loadLanguage, translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1 data-translate="settings_title">${translate("settings_title")}</h1>
            <p data-translate="settings_description">${translate("settings_description")}</p>
            <select id="language-switcher">
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
        `;
    }

}







