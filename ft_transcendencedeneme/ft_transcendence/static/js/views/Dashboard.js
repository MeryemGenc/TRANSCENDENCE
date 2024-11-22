import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        // super(params);
        this.setTitle("Dashboard");
    }

    async getHtml() { 
        return `
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1 class="display-1"><strong>TRANSCENDENCE</strong></h1>
            <h2 class="display-4"><strong>END GAME</strong></h2>
            <div class="mt-4">
                <div class="d-inline-block mx-3 text-center">
                    <img src="static/images/kiz.png" class="rounded small-img" alt="...">
                    <figcaption>Meryem Gençali</figcaption>
                </div>
                <div class="d-inline-block mx-3 text-center">
                    <img src="static/images/kiz.png" class="rounded small-img" alt="...">
                    <figcaption>Rabia Çalık</figcaption>
                </div>
                <div class="d-inline-block mx-3 text-center">
                    <img src="static/images/erkek.png" class="rounded small-img" alt="...">
                    <figcaption>Caner Toptaş</figcaption>
                </div>
                <div class="d-inline-block mx-3 text-center">
                    <img src="static/images/erkek.png" class="rounded small-img" alt="...">
                    <figcaption>Sami Güntepe</figcaption>
                </div>
            </div>
        </div>
        `;
    }

    // Dil değişimini uygula
    async afterRender() {
        LanguageManager.updateTexts();
    }
}







// import AbstractView from "./AbstractView.js";

// export default class extends AbstractView {
//     constructor() {
//         super();
//         // super(params);
//         this.setTitle("Dashboard");
//     }

//     async getHtml() { 
//         return `
//         <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
//             <h1 class="display-1"><strong>TRANSCENDENCE</strong></h1>
//             <h2 class="display-4"><strong>END GAME</strong></h2>
//             <div class="mt-4">
//                 <img src="static/images/kiz.png" class="rounded small-img mx-3" alt="...">
//                 <img src="static/images/kiz.png" class="rounded small-img mx-3" alt="...">
//                 <img src="static/images/erkek.png" class="rounded small-img mx-3" alt="...">
//                 <img src="static/images/erkek.png" class="rounded small-img mx-3" alt="...">
//             </div>
//         </div>
//         `;
//     }

//     // Dil değişimini uygula
//     async afterRender() {
//         LanguageManager.updateTexts();
//     }


// }