import { g_data, post_data } from "../api.js"
import { translate } from "../LanguageManager.js";

export function save_button_events(){
	// Nickname'i alıyoruz
	const nickname = document.getElementById("inputNickname").value || g_data.nickname;

	// Dil tercihini alıyoruz
	const language = document.getElementById("language-switcher").value || g_data.language_settings;

	post_data(nickname, language);



	// TRANSLATE 



	// let btn_save = document.getElementById("save_button_id_profile")
	// let btn_delete = document.getElementById("deleteAccountBtn")
	// let btn_logout = document.getElementById("logoutBtn")
	
	// console.log(btn_save.innerText);

	document.getElementById("save_button_id_profile").innerText = translate("b_SAVE");
	document.getElementById("deleteAccountBtn").innerText = translate("b_DELETE_ACCOUNT");
	document.getElementById("logoutBtn").innerText = translate("b_LOGOUT");
	document.getElementById("h_user_settings").innerText = translate("h_USER_SETTINGS");

	


}









