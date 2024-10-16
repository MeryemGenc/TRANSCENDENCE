import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("SearchForFriends");
    }

    async getHtml() {
        return `
            <div> SearchForFriends </div>
        `;
    }
}
