export let profile_img_src;
// export let g_data = null;

export function SettingsEvents(inputElement){
		const file = inputElement.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				profile_img_src = e.target.result
				document.getElementById("profilePreview").src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
};











