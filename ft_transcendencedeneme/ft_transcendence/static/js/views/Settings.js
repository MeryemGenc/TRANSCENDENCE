
import AbstractView from "./AbstractView.js";
import { loadLanguage, translate } from "./../LanguageManager.js";
import { g_data } from "/static/js/api.js"; 
import { login_init } from "/static/js/login/login.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Settings");
    }

    async getHtml() {

        // HTML şablonunu oluşturuyoruz
        return `
            <div class="container vh-100 d-flex justify-content-center align-items-center bg_color text-light">
                <div class="row text-white">
                    <h2 class="text-center mb-4">User Settings</h2>
                    <div class="text-center mb-4">
                        <div class="profile-pic mx-auto">
                            <img id="profilePreview" src="./static/images/userprofile.png"}" >
                        </div>
                        <div>
                            <label for="profileImageUpload" class="btn btn-sm btn-secondary mt-3">Upload Photo</label>
                            <input type="file" id="profileImageUpload" accept="image/*" style="display: none;">
                        </div>
                        <div id="usernameDisplay" class="mt-3">
                            <span id="nickname_span" class="h5 d-block"></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="mb-3">
                            <label for="inputNickname">Nickname</label>
                            <input id="nickname_input" class="form-control" type="text" id="inputNickname">
                        </div>
                        <div class="mb-4">
                            <label for="languageSwitcher">Dil Seçimi</label>
                            <select class="form-control" id="language-switcher">
                                <option value="tr">Türkçe</option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="d-grid col-6 mx-auto">
                            <button id="save_button_id_profile" class="btn btn-success btn-sm" type="button">Save</button>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mt-2">
                        <button id="deleteAccountBtn" class="btn btn-danger btn-sm col-5">Delete Account</button>
                        <button id="logoutBtn" class="btn btn-primary btn-sm col-5">Logout</button>
                    </div>
                </div>
            </div>
        `;
    }

}


// import AbstractView from "./AbstractView.js";
// import { loadLanguage, translate } from "./../LanguageManager.js";
// import { g_data } from "/static/js/settings/setting.js"; 

// export default class extends AbstractView {
//     constructor() {
//         super();
//         this.setTitle("Settings");
//     }

//     async getHtml() {
//         return `
//                 <div class="container vh-100 d-flex justify-content-center align-items-center bg_color text-light">
//                     <div class="row text-white">
//                         <h2 class="text-center mb-4">User Settings</h2>
//                         <div class="text-center mb-4">
//                             <div class="profile-pic mx-auto">
//                                 <img id="profilePreview" src="./static/images/userprofile.png">
//                             </div>
//                             <div>
//                                 <label for="profileImageUpload" class="btn btn-sm btn-secondary mt-3">Upload Photo</label>
//                                 <input type="file" id="profileImageUpload" accept="image/*" style="display: none;">
//                             </div>
//                             <div id="usernameDisplay" class="mt-3">
//                                 <span id="nickname_span" class="h5 d-block">Nickname</span>
//                                 <small>Intra Nickname</small>
//                             </div>
//                         </div>

//                         <div class="form-group">
//                             <div class="mb-3">
//                                 <label for="inputNickname">Nickname</label>
//                                 <input class="form-control" type="text" id="inputNickname">
//                             </div>
//                             <div class="mb-4">
//                                 <label for="languageSwitcher">Dil Seçimi</label>
//                                 <select class="form-control" id="language-switcher">
//                                     <option value="tr">Türkçe</option>
//                                     <option value="en">English</option>
//                                     <option value="es">Spanish</option>
//                                 </select>
//                             </div>
//                         </div>

//                         <div class="row">
//                             <div class="d-grid col-6 mx-auto">
//                                 <button id="save_button_id_profile" class="btn btn-success btn-sm" type="button">Save</button>
//                             </div>
//                         </div>

//                         <div class="d-flex justify-content-between mt-2">
//                             <button id="deleteAccountBtn" class="btn btn-danger btn-sm col-5">Delete Account</button>
//                             <button id="logoutBtn" class="btn btn-primary btn-sm col-5">Logout</button>
//                         </div>
//                     </div>
//                 </div>
//         `;
//     }
    
// }





