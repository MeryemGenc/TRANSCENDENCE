import AbstractView from "./AbstractView.js";
import { loadLanguage, translate } from "./../LanguageManager.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings");
    }

    async getHtml() {
        return `   
    <div class="position-absolute top-50 start-50 translate-middle text-center text-white form-group">
        <div class="row mb-3">
            <label for="profileImageUpload" class="col-sm-2 col-form-label">Profil Fotoğrafı Yükle</label>
            <div class="col-sm-10">
                <input type="file" class="form-control-file" id="profileImageUpload" accept="image/*">
                <br>
                <div class="profile-pic mt-2">
                    <img id="profilePreview" src="#" alt="Profil Fotoğrafı" style="display:none;" />
                </div>
            </div>
        </div>
    
        <div class="row mb-3">
            <label for="inputNickname" class="col-sm-2 col-form-label">Nickname</label>
            <div class="col-sm-10">
                <input class="form-control" type="text" id="inputNickname" placeholder="ör: rcalik">
            </div>
        </div>
    
        <div class="row mb-3">
            <label for="languageSwitcher" class="col-sm-2 col-form-label">Dil Seçimi</label>
            <div class="col-sm-10">
                <select class="form-control" id="languageSwitcher">
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
        </div>
    </div>

        `;
    }
    
    async setupEventListeners() {
        // Profil fotoğrafı yükleme işlevi
        document.getElementById('profileImageUpload').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const previewImage = document.getElementById('profilePreview');
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

}







