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
                <!-- Login Button -->
                <a id="login_42_link" href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0a22e09e6c53ae440cbd9773d652675ccab942984d6338f8c98f6dd4e6e07540&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauthapp%2Fauth%2Fredirect%2F&response_type=code">
                    <button id="loginButton" data-translate="LOGIN" type="button" class="btn btn-outline-success" disabled>${translate("LOGIN")}</button>
                </a>

                <div class="form-check text-white">
                    <input class="form-check-input" type="checkbox" id="kvkkConsent" aria-describedby="kvkkConsentHelp">
                    <label class="form-check-label" for="kvkkConsent">
                        <small><a href="#" id="openKvkkModal" data-bs-toggle="modal" data-bs-target="#kvkkModal">KVKK metni</a> onay veriyorum.</small>
                    </label>
                    <!-- Ekstra bir açıklama ekleyelim, bu da erişilebilirlik açısından önemli -->
                    <small id="kvkkConsentHelp" class="form-text text-muted"></small>
                </div>

                <!-- Modal -->
                <div class="modal fade" id="kvkkModal" tabindex="-1" aria-labelledby="kvkkModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="kvkkModalLabel">KVKK ve Gizlilik Politikası</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p><strong>KVKK ve Gizlilik Politikası</strong></p>
                                <p>KVKK ve Gizlilik Politikası
                                    Bu siteye giriş yapmak için 42 hesabınız ile giriş yapmanız gerekmektedir. 
                                    Giriş işlemi sırasında toplanan kişisel veriler yalnızca oyun profilinizin oluşturulması ve yönetilmesi amacıyla kullanılacaktır.
                                    Verileriniz üçüncü şahıslarla paylaşılmayacak ve sadece belirtilen amaçlarla işlenecektir. Kullanıcıların kişisel verilerine erişim, düzeltme veya silme hakları saklıdır.
                                    Siteyi kullanarak, yukarıda belirtilen koşullar altında kişisel verilerinizin işlenmesini kabul etmiş oluyorsunuz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        `;
    }

    // Event listener'larını eklemek için metod
    addEventListeners() {
        const kvkkConsent = document.getElementById('kvkkConsent');
        const loginButton = document.getElementById('loginButton');
        const loginLink = document.getElementById('login_42_link');

        // Checkbox durumunu kontrol ederek butonu aktifleştir
        kvkkConsent.addEventListener("change", () => {
            console.log('Checkbox checked:', kvkkConsent.checked); // Debug log

            // Eğer checkbox işaretlenirse butonun tıklanabilirliğini kontrol et
            if (kvkkConsent.checked) {
                loginButton.removeAttribute("disabled"); // Butonu etkinleştir
            } else {
                loginButton.setAttribute("disabled", true); // Butonu devre dışı bırak
            }
        });

        // Login linkine tıklanabilirlik ekliyoruz
        loginLink.addEventListener('click', (event) => {
            // Eğer checkbox işaretli değilse, tıklamayı engelle
            if (!kvkkConsent.checked) {
                alert("KVKK'ya onay vermeniz gerekmektedir.");
                event.preventDefault(); // Href'in çalışmasını engelliyoruz
            } else {
                console.log('Redirecting to login URL'); // Debug log
            }
        });

        // Login butonuna tıklanabilirlik ekliyoruz
        loginButton.addEventListener('click', (event) => {
            // Eğer checkbox işaretli değilse, butona tıklanmasını engelle
            if (!kvkkConsent.checked) {
                alert("KVKK'ya onay vermeniz gerekmektedir.");
                event.preventDefault(); // Butonun işlevini engelliyoruz
            } else {
                console.log('Redirecting to login URL via button'); // Debug log
            }
        });
    }

    // afterRender metodu sayfa render edildikten sonra event listener'ları ekler
    async afterRender() {
        // Sayfa tamamen yüklenmeden önce event listener'ları eklemek
        this.addEventListeners();

        const kvkkConsent = document.getElementById('kvkkConsent');
        const loginButton = document.getElementById('loginButton');

        // Checkbox işaretli ise buton aktif olacak, değilse pasif olacak
        if (kvkkConsent.checked) {
            loginButton.removeAttribute("disabled"); // Butonu etkinleştir
        } else {
            loginButton.setAttribute("disabled", true); // Butonu devre dışı bırak
        }

        // Debug logları ekleyerek kontrol edelim
        console.log('Checkbox checked on afterRender:', kvkkConsent.checked);
        console.log('Button disabled status:', loginButton.disabled);
    }
}
