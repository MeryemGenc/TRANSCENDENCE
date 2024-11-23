
import { g_data } from "./api.js";

export function nav_label_change() {
    // const navbar_main_span = document.querySelector('#navbar_main_span');
    // const navbar_label_span = document.querySelector('#navbar_label_span');
    const navbar = document.querySelector('#main_navbar');
    const login = document.querySelector('#login_button');

    
    
    try {
        // console.log("var");
        navbar.style = "display: flex!important;";
        navbar_label_span.textContent = (g_data && g_data.username) || 'name';
        profile_img_id.src = (g_data && g_data.medium_image) || "/static/images/userprofile.png";

    } catch (error) {
        console.log("navbar change err: ", error);
    }
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




