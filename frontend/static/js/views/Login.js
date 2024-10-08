import AbstractView from "./AbstractView.js"; 

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <div class="position-absolute top-50 start-50">
                <button type="button" class="btn btn-outline-success">Login with 42</button>
            </div>
        `;
    }
}


