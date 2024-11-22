import { g_data, post_data } from "../api.js"

export function save_button_events(){
	// Nickname'i alıyoruz
	const nickname = document.getElementById("inputNickname").value || g_data.nickname;

	// Dil tercihini alıyoruz
	const language = document.getElementById("language-switcher").value || g_data.language_settings;

	post_data(nickname, language);
}





