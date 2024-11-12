
import { g_data } from "./api.js";

export function nav_label_change() {
    let name = "name";
    let path = "./static/images/userprofile.png";
    const navbar_main_span = document.querySelector('#navbar_main_span');
    if (navbar_main_span){
        console.log("var");
        navbar_main_span.style = "flex!important;";
        if (g_data) {
            let navbar_label_span = document.querySelector('#navbar_label_span');
            name = g_data.username;
            navbar_label_span.textContent = name;
            // path = g_data.avatar_path;
            
            // label settings
            let avatar =  document.getElementById("profilePreview");
            let span =  document.getElementById("nickname_span");
            let input =  document.getElementById("nickname_input");
        
            if (avatar)
            {
                console.log("avatar");
                avatar.src = g_data && g_data.avatar_path || "./static/images/userprofile.png";
            }
            else
                console.log("avatar yok");
        
            if (span)
                span.innerText = g_data && g_data.username || "user";
            if (input)
                input.placeholder = g_data && g_data.nickname || g_data.username || "nickname";
        }
    }
    else
        console.log("yok");



}





// export function createNavbarProfile(g_data) {
//     // <img> öğesi oluştur ve özelliklerini ayarla
//     const profileImg = document.createElement('img');
//     profileImg.id = 'profile_img_id';
//     profileImg.src = g_data.avatar_path || "./static/images/userprofile.png"; 
//     profileImg.classList.add('rounded', 'profile-small-img', 'mx-3');
//     profileImg.alt = 'Logo';

//     // <span> öğesi oluştur ve içeriğini ayarla
//     const intraNickname = document.createElement('span');
//     intraNickname.textContent = g_data.nickname || 'Nickname'; 

//     // Profil öğelerini navbar içinde hedeflenen bir alana ekleme
//     const navbarMainSpan = document.querySelector('.navbar_main_span');
//     if (navbarMainSpan) {
//         navbarMainSpan.appendChild(profileImg);
//         navbarMainSpan.appendChild(intraNickname);
//     } else {
//         console.error("Navbar alanı bulunamadı!");
//     }
// }



// if (g_data) 
//     createNavbarProfile(g_data);

// // // Sayfa yüklendiğinde profili oluştur
// // document.addEventListener("DOMContentLoaded", () => {
// //     // g_data nesnesi kullanıcı verisini içeriyor olmalı
// //     createNavbarProfile(g_data);
// // });







// // import { g_data } from "./settings/setting.js";



// // // <img> öğesi oluştur ve özelliklerini ayarla
// // const profileImg = document.createElement('img');
// // profileImg.id = 'profile_img_id';
// // profileImg.src = g_data.avatar_path || "./static/images/userprofile.png"; 
// // profileImg.classList.add('rounded', 'profile-small-img', 'mx-3');
// // profileImg.alt = 'Logo';

// // // <span> öğesi oluştur ve içeriğini ayarla
// // const intraNickname = document.createElement('span');
// // intraNickname.textContent = g_data.nickname || 'Nickname'; 

// // // Hepsini bir araya getirip navbar'a ekleyin
// // navbarBrand.appendChild(profileImg);
// // navbarBrand.appendChild(intraNickname);




// // document.addEventListener("DOMContentLoaded", () => {
// //     console.log("sfsdf");
// //     document.querySelector('.navbar_main_span').appendChild(profileImg);
// //     document.querySelector('.navbar_main_span').appendChild(intraNickname);
// // });




