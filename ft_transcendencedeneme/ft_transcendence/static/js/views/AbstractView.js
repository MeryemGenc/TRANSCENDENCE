export default class AbstractView {
    constructor() {
        this.title = '';
    }

    setTitle(title) {
        this.title = title;
        document.title = title;
    }

    async render() {
        const html = await this.getHtml();
        // HTML'yi DOM'a eklemek
        document.getElementById("root").innerHTML = html;

        // afterRender'ı otomatik olarak çağırıyoruz
        if (this.afterRender) {
            await this.afterRender();  // afterRender fonksiyonunu çağırıyoruz
        }
    }

    async getHtml() {
        // HTML oluşturma işlemi
    }


    async mount() {
        // Bu metodun içi alt sınıflar tarafından override edilebilir
    }

    async afterRender() {
        // Sayfa render edildikten sonra yapılacak işlemler
    }
}


