// export default class {
//     constructor(){

//     }

//     setTitle(title) {
//         document.title = title;
//     }

//     async getHtml() {
//         return "";
//     }
// }


export default class AbstractView {
    constructor() {
        this.title = '';
    }

    setTitle(title) {
        this.title = title;
        document.title = title;
    }

    async getHtml() {
        return '';
    }

    async mount() {
        // Bu metodun içi alt sınıflar tarafından override edilebilir
    }
}


