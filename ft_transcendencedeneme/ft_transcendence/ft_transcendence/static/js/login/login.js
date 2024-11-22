import { nav_label_change } from "../navbar.js";
// import { g_data } from "../api.js";

// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click", e => {
//         if (e.target.matches("#login_42_button")) {
//             let loginButton = document.getElementById("login_42_button");
//             let link = document.createElement("a");
//             loginButton.href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0a22e09e6c53ae440cbd9773d652675ccab942984d6338f8c98f6dd4e6e07540&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauthapp%2Fauth%2Fredirect%2F&response_type=code";
//             link.appendChild(loginButton);
//             document.body.appendChild(link);
 
//             // https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-0a22e09e6c53ae440cbd9773d652675ccab942984d6338f8c98f6dd4e6e07540&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauthapp%2Fauth%2Fredirect%2F&response_type=code";
//         }
//     });
// });



export function login_init() {
    // console.log("loginned");

    nav_label_change();
}


export function isAuthenticated() {
    return (document.cookie && document.cookie.split(';').some((item) => item.trim().startsWith('access_token=')));
}

export function login_events(){
    
    const kvkkCheckbox = document.getElementById('defaultCheck1');
    if (!kvkkCheckbox.checked) {
        alert('KVK metnini onaylamanız gerekiyor.');
    } else {
        // Onay verildiyse giriş işlemini gerçekleştirin veya yönlendirme yapın
        alert('Giriş işlemi başarılı!');
    }
}
    






