import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Friends");
    }

    async getHtml() {
        return `
            <div class="container text-center">FRIENDS
            </div>
            `;
    }
}
            // <div class="row justify-content-md-center card border-success mb-3" style="max-width: 18rem;">
            // <div class="card-header bg-transparent border-success">Header</div>
            // <div class="card-body text-success">
            //     <h5 class="card-title">Success card title</h5>
            //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            // </div>
            // <div class="card-footer bg-transparent border-success">Footer</div>
            // </div>