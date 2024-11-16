import { g_data, post_data } from "../api.js"

// export let profile_img_src;
// // export let g_data = null;

// export function SettingsEvents(inputElement){ // ???ne buuuu
// 		const file = inputElement.files[0];
// 		if (file) {
// 			const reader = new FileReader();
// 			reader.onload = function (e) {
// 				profile_img_src = e.target.result
// 				document.getElementById("profilePreview").src = e.target.result;
// 			};
// 			reader.readAsDataURL(file);
// 		}
// };





export function save_button_events(){
	// Yüklenen fotoğraf yolunu alıyoruz
	// let fileName;
	// // let profileImageUpload = document.getElementById("profileImageUpload");
	// let selectedFile = profileImageUpload.files[0]; // Eğer dosya seçilmişse
	// // const imagePath = selectedFile ? URL.createObjectURL(selectedFile) : g_data.avatar_path;
	// if (selectedFile) {
	// 	fileName = "/media/"+selectedFile.name;  // Fotoğrafın ismini alıyoruz
	// 	// console.log('Yüklenen fotoğrafın ismi:', fileName);
	// } 
	// else { fileName = g_data.avatar_path; }


	// Nickname'i alıyoruz
	const nickname = document.getElementById("inputNickname").value || g_data.nickname;

	// Dil tercihini alıyoruz
	const language = document.getElementById("language-switcher").value || g_data.language_settings;

	// Verileri konsola yazdırıyoruz (veya başka bir işlem yapabilirsiniz)
	// console.log("Selected Image Path:", fileName);
	// console.log("Nickname:", nickname);
	// console.log("Selected Language:", language);

	post_data(nickname, language);
}

 // Save butonuna tıklama olayını dinliyoruz
//  document.getElementById("save_button_id_profile").addEventListener("click", () => {
// 	// Yüklenen fotoğraf yolunu alıyoruz
// 	// const profileImageUpload = document.getElementById("profileImageUpload");
// 	// const selectedFile = profileImageUpload.files[0]; // Eğer dosya seçilmişse
// 	// const imagePath = selectedFile ? URL.createObjectURL(selectedFile) : g_data.avatar_path;

// 	// Nickname'i alıyoruz
// 	const nickname = document.getElementById("inputNickname").value;

// 	// Dil tercihini alıyoruz
// 	const language = document.getElementById("language-switcher").value;

// 	// Verileri konsola yazdırıyoruz (veya başka bir işlem yapabilirsiniz)
// 	// console.log("Selected Image Path:", imagePath);
// 	console.log("Nickname:", nickname);
// 	console.log("Selected Language:", language);

// 	// Burada veriyi backend'e gönderebilir veya başka bir işlem yapabilirsiniz
// });






